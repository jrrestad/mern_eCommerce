import React, { useState } from 'react'
import { Link, navigate } from '@reach/router'
import Geocode from 'react-geocode'
import axios from 'axios';

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
        <button className="modal-close-button" onClick={() => navigate('/')}>&#10006;</button>
        <form className="FadeIn max-height" encType="multipart/form-data" onSubmit={submitHandler}>
            <div className="overflow-auto container" style={{height: "15%"}}>
                <h3 className="mt-2">List an item for sale</h3>
            </div>
            <div className="overflow-auto" style={{height: "70%"}} >
                <div className="mx-5">
                <label className="text-muted" htmlFor="product">Title <span className="text-danger font-italic">{errors?errors.product?.message:''}</span></label>
                    <input className="form-control" value={product} name="product" type="text" onChange={(e) => setProduct(e.target.value)}/>
                <div className="d-flex">
                    <div className="col-6 pl-0">
                        <label  className="text-muted" htmlFor="category">Category <span className="text-danger font-italic">{errors?errors.category?.message:''}</span></label>
                        <select className="form-control" value={category} name="category" onChange={(e) => setCategory(e.target.value)}>
                            <option value=" "></option>
                            <option value="Electronics">Electronics</option>
                            <option value="Automotive">Automotive</option>
                            <option value="Apparel">Apparel</option>
                        </select>
                    </div>
                    <div className="col-6 pr-0">
                        <label  className="text-muted" htmlFor="condition">Condition <span className="text-danger font-italic">{errors?errors.condition?.message:''}</span></label>
                        <select className="form-control" value={condition} name="condition" id="" onChange={(e) => setCondition(e.target.value)}>
                            <option value=" "></option>
                            <option value="Poor">Poor</option>
                            <option value="Fair">Fair</option>
                            <option value="Good">Good</option>
                            <option value="Excellent">Excellent</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="col-6 pl-0">
                        <label className="text-muted" htmlFor="location">Zipcode <span className="text-danger font-italic">{errors?errors.location?.message:''}</span></label>
                        <input className="form-control" value={location} name="location" type="text" onChange={(e) => setLocation(e.target.value)}/>
                    </div>
                    <div className="col-6 pr-0">
                        <label className="text-muted" htmlFor="price">Price <span className="text-danger font-italic">{errors?errors.price?.message:''}</span></label>
                        <input className="form-control" value={price} name="price" type="number" step=".01" onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                </div>
                    <label className="text-muted" htmlFor="description">Description <span className="text-danger font-italic">{errors?errors.description?.message:''}</span></label>
                    <textarea className="form-control" value={description} name="description" rows="1" onChange={(e) => setDescription(e.target.value)}></textarea>
                    <label className="text-muted" htmlFor="upload">Photo <span className="text-danger font-italic">{errors?errors.productImage?.message:''}</span></label>
                    <input type="file" className="d-block" name="upload" onChange={uploadImage}/>
                    <div className="border form-control d-flex justify-content-center" style={{height: "100px"}}>
                        <img className="img-fluid mw-100 mh-100" src={state.multerImage} alt=""/>   
                    </div>
                </div>
            </div>
            <div className="overflow-auto" style={{height: "15%"}}>
                <div className="px-5">
                    <input className="form-control btn btn-primary" type="submit" value="List Item" />
                    <Link className="d-block text-center btn btn-link" to={"/profile"}>Cancel</Link>
                </div>
            </div>
        </form>
    </div>
    </>
    )
}

export default SellForm2