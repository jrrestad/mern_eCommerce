import React, { useState, useEffect } from 'react'
import Search from "./Search"
import ProductDisplay from './ProductDisplay';
import Geocode from 'react-geocode'
import axios from 'axios'


const Buy = ({allProducts, setAllProducts}) => {
    let URL = "http://localhost:8000/"
    const [lat, setLat] = useState(47.39648829999999)
    const [lng, setLng] = useState(-122.3107873)
    const [errors, setErrors] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('')

    const [customSearch, setCustomSearch] = useState('')

    const [searchParams, setSearchParams] = useState({
        distance: 100,
        min: 0, 
        max: 99999,
        category: '',
    })

    const changeHandler = (e) => {
        e.preventDefault()
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value,
        })
    }

    const zipcodeHandler = (e) => {
        let searchValue = e.target.value;
        setZipcode(searchValue)
    }

    const submitZipcode = (e) => {
        e.preventDefault()
        Geocode.setApiKey("AIzaSyD59vfWYpyItYDuIPp1mi3yAyYR1Vxcfjw")
        Geocode.fromAddress(zipcode)
        .then(res => {
            console.log("Geocode Location")
            console.log(res)
            console.log(res.results[0].geometry.location)
            setLat(res.results[0].geometry.location.lat)
            setLng(res.results[0].geometry.location.lng)
            setCity(res.results[0].formatted_address)
            setErrors('')
        })
        .catch(err => console.log(err)) 
    }

    const submitCustomSearch = (e) => {
        e.preventDefault()
        if (!lat && !lng) {
            setErrors("Please enter a zipcode")
            console.log("zip empty")
        } else {
        let meters = searchParams.distance * 1609.34
        if (customSearch && searchParams.category) {
            axios.get(`${URL}api/products/category/custom/${lng}/${lat}/${meters}/${searchParams.min}/${searchParams.max}/${searchParams.category}/${customSearch}`)
            .then(res => {
                console.log(res)
                setAllProducts(res.data)
            })
        .catch(err => console.log(err))
        } else if (searchParams.category) {
            axios.get(`${URL}api/products/category/${lng}/${lat}/${meters}/${searchParams.min}/${searchParams.max}/${searchParams.category}`)
            .then(res => {
                    console.log(res)
                    setAllProducts(res.data)
            })
            .catch(err => console.log(err))
        } else if (customSearch && !searchParams.category) {
            axios.get(`${URL}api/products/custom/${lng}/${lat}/${meters}/${searchParams.min}/${searchParams.max}/${customSearch}`)
            .then(res => {
                    console.log(res)
                    setAllProducts(res.data)
            })
            .catch(err => console.log(err))
        } else {
            axios.get(`${URL}api/products/price/${lng}/${lat}/${meters}/${searchParams.min}/${searchParams.max}`)
            .then(res => {
                    console.log(res)
                    setAllProducts(res.data)
            })
            .catch(err => console.log(err))
        }
        }
    }

    useEffect( () => {
        axios.get(`http://localhost:8000/api/products/search/${lng}/${lat}`)
        .then(res => {
            console.log("first load")
            console.log(res)
            setAllProducts(res.data)
        })
        .catch(err => console.log(err))
    }, [lat, lng, setAllProducts])

    return (
        <>
        <div className="bg-light rounded d-flex pt-4">
            <form onSubmit={submitZipcode} className="col-2 pt-2">
                <div className="input-group">
                    <input className="form-control" placeholder="Zipcode..." name="location" type="text" onChange={zipcodeHandler}/>
                    <button className="input-group-append btn btn-primary">&#x2713;</button>
                </div>
                {errors ? <p className="text-danger font-italic mb-0">Please enter a zipcode</p>: <p className="text-muted font-italic">{city}</p>}
            </form>
            <form onSubmit={submitCustomSearch} className="col-10 pl-2 pt-2">
                <div className="input-group">
                    <input className="form-control" placeholder={`Search in ${searchParams.category}...`} type="text" onChange={ (e) => setCustomSearch(e.target.value) }/>
                    <button className="input-group-append btn btn-primary">&#x2713;</button>
                </div>
                <p className="text-muted font-italic mb-0">Results ({allProducts.length})</p>
            </form>
        </div>

        <div className="d-flex">
            <Search
                changeHandler={changeHandler}
                setErrors={setErrors}
                submitCustomSearch={submitCustomSearch}
            />
            <ProductDisplay
                allProducts={allProducts} 
            />
        </div>

            {/* <div className="d-flex flex-wrap bg-light pt-2">
                {
                allProducts.map( (item, i) => 
                <div className="m-2 bg-white translucent pointer" style={{width: "15rem"}} key={i}>
                    <div className="border" onClick={ () => navigate(`view/${item._id}`)}>
                        <div className="overflow-hidden" style={{height: "200px"}}>
                            <img className="img-fluid" src={URL + item.productImage} alt="img"/>
                        </div>
                        <div className="p-2 border-top">
                        <h6 className="font-card">{item.product}</h6>
                            <p className="font-card">Condition: <span>
                            {
                                (item.condition === 'Poor') ?
                                <span className="text-danger">{item.condition}</span>
                                : (item.condition === 'Fair') ?
                                <span className="text-warning">{item.condition}</span>
                                : (item.condition === 'Good') ?
                                <span className="text-info">{item.condition}</span>
                                :
                                <span className="text-primary">{item.condition}</span>
                            }
                            </span>
                            </p>
                        <p className="font-card">Zip Code: {item.location}</p>
                        <p className="font-card">Price: ${item.price}</p>
                        </div>
                    </div>
                </div>
                )
            }
            </div> */}
        </>
    )
}

export default Buy
