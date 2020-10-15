import React, { useState } from 'react'
import axios from 'axios';
import Geocode from 'react-geocode'


const Search = ({setAllProducts, lat, setLat, setLng, lng}) => {
    let URL = "http://localhost:8000/"

    // const categoryHandler = (e) => {
    //     e.preventDefault()
    //     const searchParam = e.target.value;
    //     axios.get(`${URL}api/products/category/${searchParam}`)
    //     .then(res => {
    //         console.log(res.data)
    //         setAllProducts(res.data)
    //     })
    //     .catch(err => console.log(err))
    // }
        
    // const [searchParam1, setSearchParam1] = useState('')
    // const searchHandler1 = (e) => {
    //     let searchValue = e.target.value;
    //     setSearchParam1(searchValue)
    // }
    // const [searchParam2, setSearchParam2] = useState('')
    // const searchHandler2 = (e) => {
    //     let searchValue = e.target.value;
    //     setSearchParam2(searchValue)
    // }
    // const [searchParam3, setSearchParam3] = useState('')
    // const searchHandler3 = (e) => {
    //     let searchValue = e.target.value;
    //     setSearchParam3(searchValue)
    // }
    // const submitSearch = (e) => {
    //     e.preventDefault()
    //     if (searchParam1 === 'seller') {
    //         axios.get(`${URL}api/products/username/${searchParam2}`)
    //         .then(res => {
    //             console.log(res.data)
    //             setAllProducts(res.data)
    //         })
    //         .catch(err => console.log(err))
    //     } else if (searchParam1 === 'product') {
    //         axios.get(`${URL}api/products/product/${searchParam2}`)
    //         .then(res => {
    //             console.log(res.data)
    //             setAllProducts(res.data)
    //         })
    //         .catch(err => console.log(err))
    //     } else if (searchParam1 === 'price') {
    //         axios.get(`${URL}api/products/price/${searchParam2}/${searchParam3}`)
    //         .then(res => {
    //             console.log(res.data)
    //             setAllProducts(res.data)
    //         })
    //         .catch(err => console.log(err))
    //     } else if (searchParam1 === 'zipcode') {
    //         // need to store lat/lng in state so don't have to make continual calls
    //         // Distance search should always be a pre-req for all searches
    //         // Also, distance is fixed on back-end, need to add variable feature
    //         Geocode.setApiKey("AIzaSyD59vfWYpyItYDuIPp1mi3yAyYR1Vxcfjw")
    //         Geocode.fromAddress(searchParam2)
    //         .then(res => {
    //             console.log("Geocode Location")
    //             console.log(res.results[0].geometry.location)
    //             let lat = res.results[0].geometry.location.lat
    //             let lng = res.results[0].geometry.location.lng
    //             axios.get(`${URL}api/products/${lng}/${lat}`)
    //             .then(res => {
    //                 console.log(res.data)
    //                 setAllProducts(res.data)
    //             })
    //             .catch(err => console.log(err))
    //         })
    //         .catch(err => console.log(err))
    //     }
    // }

    const [searchParams, setSearchParams] = useState({
        distance: 20,
        min: 1, 
        max: 10000,
        category: 'Electronics',
    })

    const changeHandler = (e) => {
        e.preventDefault()
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value,
        })
    }

    const [zipcode, setZipcode] = useState('')
    const searchHandler1 = (e) => {
        let searchValue = e.target.value;
        setZipcode(searchValue)
    }
    const zipcodeHandler = (e) => {
        e.preventDefault()
        Geocode.setApiKey("AIzaSyD59vfWYpyItYDuIPp1mi3yAyYR1Vxcfjw")
        Geocode.fromAddress(zipcode)
        .then(res => {
            console.log("Geocode Location")
            console.log(res.results[0].geometry.location)
            setLat(res.results[0].geometry.location.lat)
            setLng(res.results[0].geometry.location.lng)
        })
        .catch(err => console.log(err)) 
    }

    const searchHandler = (e) => {
        e.preventDefault()
        let meters = searchParams.distance * 1609.34
        axios.get(
            `${URL}api/products/${lng}/${lat}/${meters}/${searchParams.min}/${searchParams.max}/${searchParams.category}`
            )
            .then(res => {
                console.log(res)
                setAllProducts(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="col-2 pt-0 bg-light">
            <p className="text-muted font-italic m-0">Start by entering a zip code</p>
            <div className="">
                <form onSubmit={zipcodeHandler}>
                    <div className="input-group">
                        <input className="form-control" placeholder="Zipcode..." name="location" type="text"
                        onChange={searchHandler1}/>
                        <button className="input-group-append btn btn-primary">&#x2713;</button>
                    </div>
                </form>
            </div>

            { 
            !lat ?
            <>

            <form onSubmit={searchHandler} className="">

                <div className="mt-1">
                    <p className="m-0 ">Distance</p>
                    <div className="input-group">
                        <select className=" form-control" name="distance" onChange={changeHandler}>
                            <option value="2">Within 2 miles</option>
                            <option value="5">Within 5 miles</option>
                            <option value="10">Within 10 miles</option>
                            <option value="20">Within 20 miles</option>
                            <option value="50">Within 50 miles</option>
                            <option value="100">Within 100 miles</option>
                        </select>
                    </div>
                </div>

                <div className="mt-1">
                    <p className="m-0">Price</p>
                    <div className="input-group">
                        <input type="number" name="min" placeholder="min" className="form-control" onChange={changeHandler}/>
                        <input type="number" name="max" placeholder="max" className="form-control" onChange={changeHandler}/>
                    </div>
                </div>

                <div className="mt-1">
                    <p className="m-0">Category</p>
                    <select className="form-control" name="category" onChange={changeHandler}>
                        <option value="Electronics">Electronics</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Apparel">Apparel</option>
                    </select>
                    <button className="form-control btn btn-primary m-0 mt-4">Search</button>
                </div>
            </form>
            </>
            : ''
            }
        </div>
    )
}

export default Search
