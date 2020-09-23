import React, { useState } from 'react'
import axios from 'axios'
import './Sell.css'

const SellForm = ({user, showSellForm, allProducts, setAllProducts}) => {

    const [listProduct, setListProduct] = useState({
        category: '',
        condition: '',
        product: '',
        location: '',
        price: '',
        description: '',
        createdBy: 'Generic Company'
    })
    const [errors, setErrors] = useState('')

    const changeHandler = (e) => {
        setListProduct({
            ...listProduct,
            [e.target.name]: e.target.value
            // category: e.target['category'].value,
            // condition: e.target['condition'].value,
            // product: e.target['product'].value,
            // location: e.target['location'].value,
            // price: e.target['price'].value,
            // description: e.target['description'].value,
            // createdBy: "Generic Company",
        });
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/product`, listProduct)
        .then(res => {
            console.log(res)
            if(res.data.errors) {
                setErrors(res.data.errors)
            } else {
                setErrors('')
                console.log("It Worked")
                setAllProducts(...allProducts, listProduct)
            }
        })
        .catch(err => console.log(err))
    }


    return (
        <>
        {/* <div className={showSellForm?"fadeOut col-3 border p-4 shadow":"fadeIn col-3 border p-4 shadow"}> */}
            <form className="FadeIn col-3 m-2 border p-4 shadow" onSubmit={submitHandler}>
                <h3>Sell an item</h3>

                <div className="form-group row">
                    <label  className="col-4 col-form-label" htmlFor="category">Category:</label>
                    <select className="col-8 form-control" name="category" onChange={changeHandler}>
                        <option value=" "></option>
                        <option value="Electronics">Electronics</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Apparel">Apparel</option>
                    </select>
                </div>
                {errors?<p className="text-danger">{errors.category.message}</p>: ''}

                <div className="form-group row">
                    <label  className="col-4 col-form-label" htmlFor="condition">Condition:</label>
                    <select className="col-8 form-control" name="condition" id="" onChange={changeHandler}>
                        <option value=" "></option>
                        <option value="Poor">Poor</option>
                        <option value="Fair">Fair</option>
                        <option value="Good">Good</option>
                        <option value="Excellent">Excellent</option>
                    </select>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label" htmlFor="product">Product:</label>
                    <input className="col-8 form-control" name="product" type="text" onChange={changeHandler}/>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label" htmlFor="location">Location:</label>
                    <input className="col-8 form-control" name="location" type="text" onChange={changeHandler}/>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label" htmlFor="price">Price:</label>
                    <input className="col-8 form-control" name="price" type="number" step=".01" onChange={changeHandler}/>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label" htmlFor="description">Description:</label>
                    <textarea className="col-8 form-control" name="description" id="" cols="30" rows="2" onChange={changeHandler}></textarea>
                </div>

                <div className="form-group row">
                <input className="form-control offset-4 mb-2 btn btn-primary" type="submit" value="List Item" />
                </div>

        </form>
        </>
    )
}

export default SellForm
