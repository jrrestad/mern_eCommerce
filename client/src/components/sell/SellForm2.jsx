import React, { useState } from 'react'
import { Link, navigate } from '@reach/router'
import Geocode from 'react-geocode'
import axios from 'axios';
import './Sell.css'

const SellForm2 = ({loggedUser, allProducts, setAllProducts}) => {

    if (!loggedUser) {
        navigate('/')
    }


    const API_URL = "http://localhost:8000"
    const [previewImage, setPreviewImage] = useState('')
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

    const submitHandler = (e) => {
        console.log("Start submit handler")
        e.preventDefault()
        if (e.target['location'].value.length < 5) {
            window.alert('Please enter a valid zip code. Keep in mind that only U.S. postal codes are valid.')
        } else {
        Geocode.setApiKey("AIzaSyD59vfWYpyItYDuIPp1mi3yAyYR1Vxcfjw")
        Geocode.fromAddress(location)
        .then(response => {
                console.log("Geocode location")
                console.log(response.results[0].geometry.location)
                let coords = response.results[0].geometry.location
                // let lngChord = response.results[0].geometry.location.lng
                console.log(`Lat chord ${coords.lat} Lng chord ${coords.lng}`)

                const listProduct = {
                    category: category, condition: condition,
                    product: product, location: location,
                    coords: {type: "Point", coordinates: [coords.lng, coords.lat]},
                    price: price, description: description,
                    productImage: previewImage.imageData,
                    createdBy: loggedUser.username,
                }

                axios.post(`http://localhost:8000/api/product`, listProduct)
                .then(res => {
                    if(res.data.errors) {
                        setErrors(res.data.errors) 
                        console.log(res.data)
                    } else {
                        console.log("Axios data");
                        console.log(res.data);
                        setErrors('');
                        setAllProducts([listProduct, ...allProducts]);
                        setCategory(''); setCondition('');
                        setProduct(''); setLocation('');
                        setPrice(''); setDescription('');
                        navigate('/profile')
                    }
                })
                .catch((err) => console.log(err))
            },
            error => {
                window.alert("No location could be found with that postal code, please try again.")
                console.error(error);})
            
        }
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
                  console.log("Multer")
                  console.log(res.data)
                  setPreviewImage(res.data.document)
                  console.log("End Multer")
              }
            })
            .catch((err) => {
              alert("Error while uploading image using multer");
            });
      }

    return (
        <>
    <Link to={"/"}><div className="modal-overlay"></div></Link>
    <div className="modal-sell bg-white rounded">

            <form className="FadeIn max-height" encType="multipart/form-data" onSubmit={submitHandler}>

                <h3 className="py-2 m-0 d-flex justify-content-center align-items-center bg-primary text-center text-white" style={{height: "10%"}}>List an item for sale</h3>
                <div className="overflow-auto pl-2 border" style={{height: "65%"}} >
                    <div className="form-group pt-2 d-flex justify-content-between">
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
                        <img className="img-fluid mw-100 mh-100" src={state.multerImage} alt=""/>
                    </div>
                </div>

                <div className="form-group d-flex flex-column mx-2 justify-content-center" style={{height: "25%"}}>
                    <input className="form-control mb-2 btn btn-primary" type="submit" value="List Item" />
                    <Link to={"/profile"} className="form-control btn btn-danger">Cancel</Link>
                </div>
            </form>
        </div>
        </>
    )
}

export default SellForm2