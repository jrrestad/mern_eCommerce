import React, { useState} from 'react'
import axios from 'axios';
import './Buy.css'
import { navigate } from '@reach/router';

const Buy = ({allProducts, setAllProducts}) => {
    let URL = "http://localhost:8000/"

    const categoryHandler = (e) => {
        e.preventDefault()
        const searchParam = e.target.value;
        axios.get(`${URL}api/products/category/${searchParam}`)
        .then(res => {
            console.log(res.data)
            setAllProducts(res.data)
        })
        .catch(err => console.log(err))
    }

    // const checkSearchType = (e) => {
        //     let search = e.target.value
        //     setSearchType(search)
        // }
        
    const [searchParam1, setSearchParam1] = useState('')
    const searchHandler1 = (e) => {
        let searchValue = e.target.value;
        setSearchParam1(searchValue)
    }
    const [searchParam2, setSearchParam2] = useState('')
    const searchHandler2 = (e) => {
        let searchValue = e.target.value;
        setSearchParam2(searchValue)
    }
    const [searchParam3, setSearchParam3] = useState('')
    const searchHandler3 = (e) => {
        let searchValue = e.target.value;
        setSearchParam3(searchValue)
    }
    const submitSearch = (e) => {
        e.preventDefault()
        if (searchParam1 === 'seller') {
            axios.get(`${URL}api/products/username/${searchParam2}`)
            .then(res => {
                console.log(res.data)
                setAllProducts(res.data)
            })
            .catch(err => console.log(err))
        } else if (searchParam1 === 'product') {
            axios.get(`${URL}api/products/product/${searchParam2}`)
            .then(res => {
                console.log(res.data)
                setAllProducts(res.data)
            })
            .catch(err => console.log(err))
        } else if (searchParam1 === 'price') {
            axios.get(`${URL}api/products/price/${searchParam2}/${searchParam3}`)
            .then(res => {
                console.log(res.data)
                setAllProducts(res.data)
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <div className="d-flex rounded bg-primary">
                <h6 className="text-white ml-1 mt-3">Search:</h6>
            
            <div className="col-2 mt-2">
                <select className="form-control pl-0 mb-2" name="searchType" id="" onChange={searchHandler1}>
                    <option value="">Search by...</option>
                    <option value="category">Category</option>
                    <option value="seller">Seller</option>
                    <option value="product">Product</option>
                    <option value="price">Price</option>
                </select>
            </div>

            {

            searchParam1 === 'category' ?

            <div className="col-2 mt-2">
                <select className=" form-control" name="category" onChange={categoryHandler}>
                    <option value="">Search by category...</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Apparel">Apparel</option>
                </select>
            </div>

            : searchParam1 === 'seller' || searchParam1 === 'product' ?
            
            <div className="col-2 mt-2">
                <form onSubmit={submitSearch}>
                    <div className="input-group row">
                        <input className="form-control" placeholder="Type your search..." type="text" onChange={searchHandler2}/>
                        <button className="input-group-append btn btn-success">&#x2713;</button>
                    </div>
                </form>
            </div>
            : searchParam1 === 'price' ?
            <div className="col-3 mt-2">
                <form onSubmit={submitSearch}>
                    <div className="input-group row">
                        <input type="number" name="minPrice" className="form-control" onChange={searchHandler2}/>
                        <input type="number" name="maxPrice" className="form-control" onChange={searchHandler3}/>
                        <button className="input-group-append btn btn-success">&#x2713;</button>
                    </div>
                </form>
            </div>
            : ''
            }

        </div>
            {
                searchParam1 ?
                <p className="text-muted m-0">There were ( {allProducts.length} ) results...</p>
                : ''
            }

            <hr/>
            <div className="d-flex flex-wrap bg-light">

            {
                allProducts.map( (item, i) => 
                <div className="m-2 bg-white shadow translucent pointer" style={{width: "14rem"}} key={i}>
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
            </div>
        </div>
    )
}

export default Buy
