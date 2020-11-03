import React, { useState, useEffect } from 'react'
import Search from "./Search"
import ProductDisplay from './ProductDisplay';
import Geocode from 'react-geocode'
import axios from 'axios'


const Buy = ({allProducts, setAllProducts}) => {
    let API_URL = "http://localhost:8000/"
    const API_KEY = `${process.env.REACT_APP_API_KEY}`;
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
        Geocode.setApiKey(API_KEY)
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
            axios.get(`${API_URL}api/products/category/custom/${lng}/${lat}/${meters}/${searchParams.min}/${searchParams.max}/${searchParams.category}/${customSearch}`)
            .then(res => {
                console.log(res)
                setAllProducts(res.data)
            })
        .catch(err => console.log(err))
        } else if (searchParams.category) {
            axios.get(`${API_URL}api/products/category/${lng}/${lat}/${meters}/${searchParams.min}/${searchParams.max}/${searchParams.category}`)
            .then(res => {
                    console.log(res)
                    setAllProducts(res.data)
            })
            .catch(err => console.log(err))
        } else if (customSearch && !searchParams.category) {
            axios.get(`${API_URL}api/products/custom/${lng}/${lat}/${meters}/${searchParams.min}/${searchParams.max}/${customSearch}`)
            .then(res => {
                    console.log(res)
                    setAllProducts(res.data)
            })
            .catch(err => console.log(err))
        } else {
            axios.get(`${API_URL}api/products/price/${lng}/${lat}/${meters}/${searchParams.min}/${searchParams.max}`)
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
        <div className="bg-semi-teal d-flex pt-4">
            <form onSubmit={submitZipcode} className="col-lg-2 col-md-3 col-4 pt-2">
                <div className="input-group">
                    <input className="form-control text-orange" placeholder="Zipcode..." name="location" type="text" onChange={zipcodeHandler}/>
                    <button className="input-group-append btn bg-teal text-white" >&#x2713;</button>
                </div>
                {/* <p className="text-muted font-italic m-0">(Feature disabled for display)</p>
                <p className="text-muted font-italic">Seattle, WA 98198, USA</p> */}
                {errors ? <p className="text-danger font-italic mb-0">Please enter a zipcode</p>: <p className="text-muted font-italic">{city}</p>}
            </form>
            <form onSubmit={submitCustomSearch} className="col-lg-10 col-md-9 col-8 pl-2 pt-2">
                <div className="input-group">
                    <input className="form-control text-orange" placeholder={`Search in ${searchParams.category}...`} type="text" onChange={ (e) => setCustomSearch(e.target.value) }/>
                    <button className="input-group-append btn bg-teal text-white">&#x2713;</button>
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
        </>
    )
}

export default Buy
