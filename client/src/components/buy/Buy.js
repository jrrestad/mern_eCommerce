import React, { useState, useEffect } from 'react'
import Search from "./Search"
import ProductDisplay from './ProductDisplay';
import Geocode from 'react-geocode'
import axios from 'axios'

const Buy = ({allProducts, setAllProducts, lat, lng, setLat, setLng}) => {
    const API_KEY = `${process.env.REACT_APP_API_KEY}`;
    const API_KEY_2 = `${process.env.REACT_APP_API_KEY_2}`;
    const [city, setCity] = useState('');
    const [clientLocation, setClientLocation] = useState('')
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

    // Allow clients to change their zipcode (lat, long) search parameters
    const submitZipcode = (e) => {
        e.preventDefault()
        Geocode.setApiKey(API_KEY)
        Geocode.fromAddress(zipcode)
        .then(res => {
            setLat(res.results[0].geometry.location.lat)
            setLng(res.results[0].geometry.location.lng)
            setCity(res.results[0].formatted_address)
        })
        .catch(err => console.log(err)) 
    }

    const submitCustomSearch = (e) => {
        e.preventDefault()
        if (!lat && !lng) {
            console.log("zip empty")
        } else {
        let meters = searchParams.distance * 1609.34
        if (customSearch && searchParams.category) {
            axios.get(`http://localhost:8000/api/products/category/custom/${lng}/${lat}/${meters}/${searchParams.min}/${searchParams.max}/${searchParams.category}/${customSearch}`)
            .then(res => {
                setAllProducts(res.data)
            })
        .catch(err => console.log(err))
        } else if (searchParams.category) {
            axios.get(`http://localhost:8000/api/products/category/${lng}/${lat}/${meters}/${searchParams.min}/${searchParams.max}/${searchParams.category}`)
            .then(res => {
                    setAllProducts(res.data)
            })
            .catch(err => console.log(err))
        } else if (customSearch && !searchParams.category) {
            axios.get(`http://localhost:8000/api/products/custom/${lng}/${lat}/${meters}/${searchParams.min}/${searchParams.max}/${customSearch}`)
            .then(res => {
                    setAllProducts(res.data)
            })
            .catch(err => console.log(err))
        } else {
            axios.get(`http://localhost:8000/api/products/price/${lng}/${lat}/${meters}/${searchParams.min}/${searchParams.max}`)
            .then(res => {
                    setAllProducts(res.data)
            })
            .catch(err => console.log(err))
            }
        }
    }

    // Retrieve client location by IP address upon visiting component
    useEffect( () => {
        axios.get(`https://geolocation-db.com/json/${API_KEY_2}`)
        .then(res => {
            setClientLocation(res.data)
            setLat(res.data.latitude)
            setLng(res.data.longitude)
        })
        .catch(err => console.log(err))
    }, [API_KEY_2, setLat, setLng])

    useEffect( () => {
        axios.get(`http://localhost:8000/api/products/search/${lng}/${lat}`)
        .then(res => {
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
                {
                    city ?
                    <p className="text-muted font-italic">{city}</p>
                    :
                    <p className="text-muted font-italic">{clientLocation.city}, {clientLocation.postal}</p>

                }
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
                submitCustomSearch={submitCustomSearch}
            />
            <ProductDisplay
                allProducts={allProducts} setAllProducts={setAllProducts}
                lat={lat} lng={lng}
            />
        </div>
        </>
    )
}

export default Buy
