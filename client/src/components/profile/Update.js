import React, { useEffect, useState } from 'react'
import { Link, navigate } from "@reach/router"
import axios from 'axios'

const Update = (props) => {
    const { id, loggedUser} = props;

    const [errors, setErrors] = useState('')

    const API_URL = "http://localhost:8000/"

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
        productImage: productImage,
        createdBy: loggedUser.username,
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/single/${id}/${loggedUser.username}`)
        .then(res => {
            if (res.data[0] === undefined) {
                navigate('/')
            } else {
                setCategory(res.data[0].category)
                setCondition(res.data[0].condition)
                setProduct(res.data[0].product)
                setLocation(res.data[0].location)
                setPrice(res.data[0].price)
                setDescription(res.data[0].description)
                setProductImage(res.data[0].productImage)
                console.log(res.data[0])
            }
        })
        .catch(err => console.log(err))
    }, [id,loggedUser.username])

    const uploadImage = (e) => {
        e.preventDefault()
          let imageFormObj = new FormData();
          imageFormObj.append("imageName", "multer-image-" + Date.now());
          imageFormObj.append("imageData", e.target.files[0]);          
          axios.post(`${API_URL}uploadmulter`, imageFormObj)
          .then((res) => {
              if (res.data.success) {
                  console.log(res.data)
                setProductImage(res.data.document.imageData)
              }
            })
            .catch((err) => {
              alert("Error while uploading image using multer");
            });
      }

    const submitHandler = (e) => {
        e.preventDefault()  
        axios.patch(`http://localhost:8000/api/product/${id}`, listProduct)
        .then(res => {
            if(res.data.errors) {
                setErrors(res.data.errors)
            } else {
                navigate('/profile')
            }
        })
        .catch((err) => console.log(err))
    }

    return (
    <>
    <Link to={"/"}><div className="modal-overlay"></div></Link>
    <div className="modal-update bg-white rounded">
        <div className="FadeIn max-height bg-white">
            
            <form className="FadeIn max-height" encType="multipart/form-data" onSubmit={submitHandler}>

            <h3 className="py-2 m-0 d-flex justify-content-center align-items-center bg-primary text-white" style={{height: "10%"}}>Edit this product</h3>
            <div className="overflow-auto pl-2 border" style={{height: "65%"}} >
                <div className="form-group pt-2 d-flex justify-content-between">
                    <label  className="col-form-label" htmlFor="category">Category:</label>
                    <select className="col-8 form-control" value={category} name="category" onChange={(e) => setCategory(e.target.value)}>
                        <option value="Electronics">Electronics</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Apparel">Apparel</option>
                    </select>
                </div>
                {errors.category?<p className="text-danger">{errors.category.message}</p>: ''}

                <div className="form-group d-flex justify-content-between">
                    <label  className="col-form-label" htmlFor="condition">Condition:</label>
                    <select className="col-8 form-control" value={condition} name="condition" id="" onChange={(e) => setCondition(e.target.value)}>
                        <option value="Poor">Poor</option>
                        <option value="Fair">Fair</option>
                        <option value="Good">Good</option>
                        <option value="Excellent">Excellent</option>
                    </select>
                </div>
                {errors.condition?<p className="text-danger">{errors.condition.message}</p>: ''}

                <div className="form-group d-flex justify-content-between">
                    <label className="col-form-label" htmlFor="product">Product:</label>
                    <input className="col-8 form-control" value={product} name="product" type="text" onChange={(e) => setProduct(e.target.value)}/>
                </div>
                {errors.product?<p className="text-danger">{errors.product.message}</p>: ''}

                <div className="form-group d-flex justify-content-between">
                    <label className="col-form-label" htmlFor="location">Location:</label>
                    <input className="col-8 form-control" value={location} name="location" type="text" onChange={(e) => setLocation(e.target.value)}/>
                </div>
                {errors.location?<p className="text-danger">{errors.location.message}</p>: ''}

                <div className="form-group d-flex justify-content-between">
                    <label className="col-form-label" htmlFor="price">Price:</label>
                    <input className="col-8 form-control" value={price} name="price" type="number" step=".01" onChange={(e) => setPrice(e.target.value)}/>
                </div>
                {errors.price?<p className="text-danger">{errors.price.message}</p>: ''}

                <div className="form-group d-flex justify-content-between">
                    <label className="col-form-label" htmlFor="description">Description:</label>
                    <textarea className="col-8" value={description} name="description" rows="3" onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                {errors.description?<p className="text-danger">{errors.description.message}</p>: ''}

                <div className="form-group d-flex justify-content-between">
                    <label className="col-form-label" htmlFor="upload">Upload:</label>
                    <input type="file" className="col-8 form-control btn-primary" name="upload" onChange={uploadImage}/>
                </div>
                {errors.productImage?<p className="text-danger">{errors.productImage.message}</p>: ''}

                <div className=" border col-8 offset-4 d-flex justify-content-center row mb-2" style={{height: "100px"}}>
                    <img className="img-fluid mw-100 mh-100" src={API_URL + productImage} alt=""/>
                </div>
            </div>

            <div className="form-group d-flex flex-column mx-2 justify-content-center align-items-bottom" style={{height: "25%"}}>
                <input className="form-control mb-2 btn btn-primary" type="submit" value="Update Item" />
                <Link to={"/profile"} className="form-control btn btn-danger">Cancel</Link>
            </div>
            </form>
        </div>
    </div>
    </>
    )
}

export default Update
