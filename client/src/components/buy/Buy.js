import React, { useState } from 'react'
import axios from 'axios';
import Modal from './Modal';

const Buy = ({allProducts, setAllProducts}) => {
    let URL = "http://localhost:8000/"

    const [countModal, setCountModal] = useState([])

    const categoryHandler = (e) => {
        e.preventDefault()
        const searchParam = e.target.value;
        axios.get(`${URL}api/products/category/${searchParam}`)
        .then(res => {
            console.log(res.data)
            setAllProducts(res.data)
            let ren = [];
            for (let i = 0; i < res.data.length; i++) {
                ren.push(false)
            }
            setCountModal(ren)
            console.log(ren)

        })
        .catch(err => console.log(err))
    }

    const [searchType, setSearchType ] = useState('')
    const checkSearchType = (e) => {
        let search = e.target.value
        setSearchType(search)
    }

    const [searchBySeller, setSearchBySeller] = useState('')
    const searchHandler = (e) => {
        let typedSearch = e.target.value;
        setSearchBySeller(typedSearch)
    }

    const submitSearchBySeller = (e) => {
        e.preventDefault()
        console.log(searchBySeller)
        axios.get(`${URL}api/products/username/${searchBySeller}`)
        .then(res => {
            console.log(res.data)
            setAllProducts(res.data)
        })
        .catch(err => console.log(err))
    }

    const toggleCountModal = (i) => {
        let [...newCount] = countModal;
        if (newCount[i] === true) {
            newCount[i] = false
        } else {
            newCount[i] = true
        }
        console.log(newCount)
        setCountModal(newCount)
    }
    
    return (
        <div>
            {/* <hr/> */}
            {/* <h1 className="ml-4">See whats for sale</h1> */}
            <br/>
            <div className="d-flex rounded p-2 bg-primary">
                <h6 className="text-white mt-3">Search:</h6>
            
            <div className="col-2 mt-2">
                <select className="form-control mb-2" name="searchType" id="" onChange={checkSearchType}>
                    <option value="">Search by...</option>
                    <option value="category">Category</option>
                    <option value="seller">Seller</option>
                    <option value="product">Product</option>
                </select>
            </div>

            {
            searchType === 'category' ?
            <div className="col-2 mt-2">
                <select className=" form-control" name="category" onChange={categoryHandler}>
                    <option value="">Search by category...</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Apparel">Apparel</option>
                </select>
            </div>
            : searchType === 'seller' || searchType === 'product' ?
            <div className="col-2 mt-2">
                <form onSubmit={submitSearchBySeller}>
                    <div className="input-group row">
                        <input className="form-control" placeholder="Type your search..." type="text" onChange={searchHandler}/>
                        <button className="input-group-append btn btn-success">&#x2713;</button>
                    </div>
                </form>
            </div>
            : ''
            }

        </div>

            <hr/>
            <div className="d-flex flex-wrap bg-light container-fluid" style={{minHeight: "1000px"}}>

            {
                allProducts.map( (item, i) => 
                
                <div className="col-3" key={i}>
                        {
                            countModal[i] ?
                            <Modal 
                                item={item}
                                toggleCountModal={toggleCountModal}
                                id={i}
                                isShowing={countModal[i]}
                            />
                         : ''   
                        }
                    <div className="col mb-4 border shadow" style={{maxHeight: "500px", minHeight: "500px"}} onClick={ () => toggleCountModal(i)}>
                        <h5 className="py-2 mb-3 d-flex justify-content-center rounded bg-primary row text-white">{item.createdBy}</h5>
                        <div className="p-4">

                        <h5>{item.product} <span className="text-muted font-italic">({item.category})</span></h5>
                            <h5>Condition: <span>
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
                            </h5>
                        <h5>Zip Code: {item.location}</h5>
                        <h5>Price: ${item.price}</h5>
                        <img src={URL + item.productImage} width="200" alt=""/>
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
