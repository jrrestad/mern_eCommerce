import React, { useEffect, useState } from 'react'
import { Link, navigate } from "@reach/router"
import axios from 'axios'

const Update = (props) => {
    const { id, loggedUser, allProducts, setAllProducts} = props;

    const API_URL = "http://localhost:8000/"
    const [errors, setErrors] = useState('')

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
        axios.get(`http://localhost:8000/api/product/single/${id}/${loggedUser.username}`, {withCredentials: true})
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

    const deleteHandler = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:8000/api/product/${id}/${loggedUser.username}`, {withCredentials: true})
        .then(res => {
            console.log(res)
            navigate("/profile")
            const [...curData] = allProducts;
            for (let i = 0; i < curData.length; i++) {
                if (curData[i]._id === id) {
                    curData.splice(i, 1)
                    setAllProducts(curData)
                }
            }
        })
        .catch(err => console.log(err))
    }

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
        axios.patch(`http://localhost:8000/api/product/${id}`, listProduct, {withCredentials: true})
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
        <button className="modal-close-button" onClick={() => navigate('/')}>&#10006;</button>
        <form className="FadeIn max-height" encType="multipart/form-data" onSubmit={submitHandler}>

        <div className="overflow-auto container" style={{height: "15%"}}>
            <h3 className="mt-2 text-teal" >Edit your product</h3>
        </div>
        
        <div className="overflow-auto" style={{height: "70%"}} >

            <div className="mx-5">
                <label className="text-light-teal" htmlFor="product">Title <span className="text-danger font-italic">{errors?errors.product?.message:''}</span></label>
                <input className="form-control" value={product} name="product" type="text" onChange={(e) => setProduct(e.target.value)}/>

                <div className="d-flex">

                    <div className="col-6 pl-0">
                        <label  className="text-light-teal" htmlFor="category">Category <span className="text-danger font-italic">{errors?errors.category?.message:''}</span></label>
                        <select className="form-control" value={category} name="category" onChange={(e) => setCategory(e.target.value)}>
                            <option value="apparel">Apparel</option>
                            <option value="appliances">Appliances</option>
                            <option value="automotive">Automotive</option>
                            <option value="electronics">Electronics</option>
                            <option value="furniture">Furniture</option>
                            <option value="miscellaneous">Miscellaneous</option>
                            <option value="pets">Pets</option>
                        </select>
                    </div>

                    <div className="col-6 pr-0">
                        <label  className="text-light-teal" htmlFor="condition">Condition  <span className="text-danger font-italic">{errors?errors.condition?.message:''}</span></label>
                        <select className="form-control" value={condition} name="condition" id="" onChange={(e) => setCondition(e.target.value)}>
                            <option value="poor">Poor</option>
                            <option value="fair">Fair</option>
                            <option value="good">Good</option>
                            <option value="excellent">Excellent</option>
                            <option value="perfect">Perfect</option>
                        </select>
                    </div>
                </div>

            <div className="d-flex">

                <div className="col-6 pl-0">
                    <label className="text-light-teal" htmlFor="location">Zipcode <span className="text-danger font-italic">{errors?errors.location?.message:''}</span></label>
                    <input className="form-control" value={location} name="location" type="text" onChange={(e) => setLocation(e.target.value)}/>
                </div>

                <div className="col-6 pr-0">
                    <label className="text-light-teal" htmlFor="price">Price <span className="text-danger font-italic">{errors?errors.price?.message:''}</span></label>
                    <input className="form-control" value={price} name="price" type="number" step=".01" onChange={(e) => setPrice(e.target.value)}/>
                </div>
            </div>

                    <label className="text-light-teal" htmlFor="description">Description <span className="text-danger font-italic">{errors?errors.description?.message:''}</span></label>
                    <textarea className="form-control" value={description} name="description" rows="1" onChange={(e) => setDescription(e.target.value)}></textarea>
                    <label className="col-form-label text-light-teal" htmlFor="upload">Photo <span className="text-danger font-italic">{errors?errors.productImage?.message:''}</span></label>
                    <input type="file" className="d-block" name="upload" onChange={uploadImage}/>

                <div className="border form-control d-flex justify-content-center" style={{height: "100px"}}>
                    <img className="img-fluid mw-100 mh-100" src={API_URL + productImage} alt=""/>
                </div>
            </div>
        </div>
            <div className="px-5" style={{height: "15%"}}>
                <input className="form-control btn bg-teal text-white" type="submit" value="Update Item" />
                <div className="d-flex justify-content-center align-items-center">

                <Link className="text-center text-light-teal btn btn-link" to={"/profile"}>Cancel</Link>
                <p className="m-0 p-0">|</p>
                <p className="m-0 text-center text-danger btn btn-link" to={"/profile"} onClick={deleteHandler}>Remove</p>
                </div>
            </div>
            </form>
        </div>
    </>
    )
}

export default Update
