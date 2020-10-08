import React, { useState } from 'react'
import axios from 'axios';
import './Sell.css'

const SellForm = ({loggedUser, allProducts, setAllProducts}) => {
    const API_URL = "http://localhost:8000"
    const [defaultImg, setDefaultImage] = useState('')
    const [state, setState] = useState({
        multerImage: '',
    })
    const [errors, setErrors] = useState('')

    const [category, setCategory] = useState('')
    const [condition, setCondition] = useState('')
    const [product, setProduct] = useState('')
    const [location, setLocation] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    
    const listProduct = {
        category: category,
        condition: condition,
        product: product,
        location: location,
        price: price,
        description: description,
        productImage: defaultImg.imageData,
        createdBy: loggedUser.username,
    }

    const submitHandler = (e) => {
        e.preventDefault()  
        axios.post(`http://localhost:8000/api/product`, listProduct)
        .then(res => {
            if(res.data.errors) {
                setErrors(res.data.errors)
            } else {
                setErrors('')
                setAllProducts([...allProducts, listProduct])
                setCategory('')
                setCondition('')
                setProduct('')
                setLocation('')
                setPrice('')
                setDescription('')
            }
        })
        .catch((err) => console.log(err))
    }

    const uploadImage = (e) => {
        e.preventDefault()
          let imageFormObj = new FormData();
          imageFormObj.append("imageName", "multer-image-" + Date.now());
          imageFormObj.append("imageData", e.target.files[0]);
          // stores a readable instance of the image being uploaded using multer
          setState({
            multerImage: URL.createObjectURL(e.target.files[0])
          });
          
          axios.post(`${API_URL}/uploadmulter`, imageFormObj)
          .then((res) => {
              if (res.data.success) {
                  console.log("Shouldnt be coming from here")
                  console.log(res.data)
                setDefaultImage(res.data.document)
              }
            })
            .catch((err) => {
              alert("Error while uploading image using multer");
            });
      }


    return (
        <>
            <form className="FadeIn col-3 my-3 ml-3 rounded border shadow bg-white" encType="multipart/form-data" onSubmit={submitHandler}>
                <h3 className="py-3 mb-3 d-flex justify-content-center rounded bg-primary row text-white">Sell an item</h3>

                <div className="form-group d-flex justify-content-between">
                    <label  className="col-form-label" htmlFor="category">Category:</label>
                    <select className="col-8 form-control" value={category} name="category" onChange={(e) => setCategory(e.target.value)}>
                        <option value=" "></option>
                        <option value="Electronics">Electronics</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Apparel">Apparel</option>
                    </select>
                </div>
                {errors.category?<p className="text-danger">{errors.category.message}</p>: ''}

                <div className="form-group d-flex justify-content-between">
                    <label  className="col-form-label" htmlFor="condition">Condition:</label>
                    <select className="col-8 form-control" value={condition} name="condition" id="" onChange={(e) => setCondition(e.target.value)}>
                        <option value=" "></option>
                        <option value="Poor">Poor</option>
                        <option value="Fair">Fair</option>
                        <option value="Good">Good</option>
                        <option value="Excellent">Excellent</option>
                    </select>
                </div>

                <div className="form-group d-flex justify-content-between">
                    <label className="col-form-label" htmlFor="product">Product:</label>
                    <input className="col-8 form-control" value={product} name="product" type="text" onChange={(e) => setProduct(e.target.value)}/>
                </div>

                <div className="form-group d-flex justify-content-between">
                    <label className="col-form-label" htmlFor="location">Location:</label>
                    <input className="col-8 form-control" value={location} name="location" type="text" onChange={(e) => setLocation(e.target.value)}/>
                </div>

                <div className="form-group d-flex justify-content-between">
                    <label className="col-form-label" htmlFor="price">Price:</label>
                    <input className="col-8 form-control" value={price} name="price" type="number" step=".01" onChange={(e) => setPrice(e.target.value)}/>
                </div>

                <div className="form-group d-flex justify-content-between">
                    <label className="col-form-label" htmlFor="description">Description:</label>
                    <textarea className="col-8 form-control" value={description} name="description" rows="2" onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="form-group d-flex justify-content-between">
                    <label className="col-form-label" htmlFor="upload">Upload:</label>
                    <input type="file" className="col-8 form-control btn-primary" name="upload" onChange={uploadImage}/>
                </div>
                <div className=" border col-8 offset-4 d-flex justify-content-center row mb-2" style={{height: "100px"}}>
                    <img className="img-fluid mw-100 mh-100" src={state.multerImage} alt=""/>
                </div>

                <div className="form-group">
                <input className="form-control btn btn-primary float-bottom" type="submit" value="List Item" />
                </div>

        </form>
        </>
    )
}

export default SellForm