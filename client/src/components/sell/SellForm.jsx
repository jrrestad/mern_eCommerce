import React, { useState } from 'react'
import axios from 'axios'
import './Sell.css'

const SellForm = ({allProducts, setAllProducts}) => {
    const API_URL = "http://localhost:8000"
    const [defaultImg, setDefaultImage] = useState('')
    const [state, setState] = useState({
        multerImage: '',
    })

    // const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [condition, setCondition] = useState('')
    const [product, setProduct] = useState('')
    const [location, setLocation] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [productImage, setProductImage] = useState('')
    
    const listProduct = {
        category: category,
        condition: condition,
        product: product,
        location: location,
        price: price,
        description: description,
        productImage: defaultImg.imageData,
        createdBy: 'Generic Company'
    }
    const [errors, setErrors] = useState('')

    // const changeHandler = (e) => {
    //     setListProduct({
    //         ...listProduct,
    //         productImage: state.multerImage,
    //         [e.target.name]: e.target.value
    //         // category: e.target['category'].value,
    //         // condition: e.target['condition'].value,
    //         // product: e.target['product'].value,
    //         // location: e.target['location'].value,
    //         // price: e.target['price'].value,
    //         // description: e.target['description'].value,
    //         // createdBy: "Generic Company",
    //     });
    // }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("Product Image")
        console.log(productImage)
        console.log(state.multerImage)
        axios.post(`http://localhost:8000/api/product`, listProduct)
        .then(res => {
            console.log(res)
            if(res.data.errors) {
                setErrors(res.data.errors)
            } else {
                setErrors('')
                console.log("SUCCESSFUL PRODUCT CREATION")
                setAllProducts(...allProducts, listProduct)
            }
        })
        .catch(err => console.log(err))
    }


    const uploadImage = (e) => {
        e.preventDefault()
          let imageFormObj = new FormData();
    
          imageFormObj.append("imageName", "multer-image-" + Date.now());
          imageFormObj.append("imageData", e.target.files[0]);
    
          // stores a readable instance of 
          // the image being uploaded using multer
          setState({
            multerImage: URL.createObjectURL(e.target.files[0])
          });
          
          axios.post(`${API_URL}/uploadmulter`, imageFormObj)
          .then((res) => {
            // console.log("target files")
            // console.log(e.target.files[0])
              console.log(res)
              console.log("above res, below imageFormObj")
              console.log(imageFormObj)
              if (res.data.success) {
                  console.log("The image res.data")
                  console.log(res.data)
                  console.log(res.data.document)
                  console.log(`This is the string ---> ${res.data.document.imageName}`)
                alert("Image has been successfully uploaded using multer");
                setDefaultImage(res.data.document)
              }
            })
            .catch((err) => {
              alert("Error while uploading image using multer");
              // setDefaultImage("multer");
            });
      }


    return (
        <>
        {/* <div className={showSellForm?"fadeOut col-3 border p-4 shadow":"fadeIn col-3 border p-4 shadow"}> */}
            <form className="FadeIn col-3 m-2 border p-4 shadow" encType="multipart/form-data" onSubmit={submitHandler}>
                <h3>Sell an item</h3>

                <div className="form-group row">
                    <label  className="col-4 col-form-label" htmlFor="category">Category:</label>
                    <select className="col-8 form-control" name="category" onChange={(e) => setCategory(e.target.value)}>
                        <option value=" "></option>
                        <option value="Electronics">Electronics</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Apparel">Apparel</option>
                    </select>
                </div>
                {/* {errors?<p className="text-danger">{errors.category.message}</p>: ''} */}

                <div className="form-group row">
                    <label  className="col-4 col-form-label" htmlFor="condition">Condition:</label>
                    <select className="col-8 form-control" name="condition" id="" onChange={(e) => setCondition(e.target.value)}>
                        <option value=" "></option>
                        <option value="Poor">Poor</option>
                        <option value="Fair">Fair</option>
                        <option value="Good">Good</option>
                        <option value="Excellent">Excellent</option>
                    </select>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label" htmlFor="product">Product:</label>
                    <input className="col-8 form-control" name="product" type="text" onChange={(e) => setProduct(e.target.value)}/>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label" htmlFor="location">Location:</label>
                    <input className="col-8 form-control" name="location" type="text" onChange={(e) => setLocation(e.target.value)}/>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label" htmlFor="price">Price:</label>
                    <input className="col-8 form-control" name="price" type="number" step=".01" onChange={(e) => setPrice(e.target.value)}/>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label" htmlFor="description">Description:</label>
                    <textarea className="col-8 form-control" name="description" id="" cols="30" rows="2" onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="form-group row">
                    <input type="file" className="col-8 form-control" onChange={uploadImage}/>
                    <img src={state.multerImage} alt="" width="50" className="" />
                </div>

                <div className="form-group row">
                <input className="form-control offset-4 mb-2 btn btn-primary" type="submit" value="List Item" />
                </div>

        </form>
        </>
    )
}

export default SellForm
