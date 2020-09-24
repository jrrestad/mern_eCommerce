import React, { useState } from 'react';
import axios from 'axios';

const ImageTest = () => {
    const API_URL = "http://localhost:8000"
    //*** */
    // const [image, setImage] = useState('')

    // const submitImage = (e) => {
    //   e.preventDefault()
    //   axios.post(`${API_URL}/uploadmulter`, image)
    //   .then(data => {
    //     console.log(data)
    //     if (data.data.success) {
    //       alert("success")
    //     } else {
    //       alert("fail")
    //     }
    //   })
    //   .catch(err => console.log(err))
    // }

    //***** */
    const [defaultImg, setDefaultImage] = useState('')
    const [state, setState] = useState({
        multerImage: defaultImg,
    })

    const uploadImage = (e) => {
      e.preventDefault()
        let imageFormObj = new FormData();
  
        imageFormObj.append("imageName", "multer-image-" + Date.now());
        imageFormObj.append("imageData", e.target.addImage.files[0]);
  
        // stores a readable instance of 
        // the image being uploaded using multer
        setState({
          multerImage: URL.createObjectURL(e.target.addImage.files[0])
        });
  
        axios.post(`${API_URL}/uploadmulter`, imageFormObj)
          .then((data) => {
            console.log(data)
            if (data.data.success) {
              alert("Image has been successfully uploaded using multer");
              setDefaultImage("multer");
            }
          })
          .catch((err) => {
            alert("Error while uploading image using multer");
            // setDefaultImage("multer");
          });
    }

          return (
            <div className="main-container mb-5">
              <h3 className="main-heading">Image Upload</h3>
              <div className="image-container">
                <div className="process">
                  <form onSubmit={uploadImage}>

                  <input type="file"  name="addImage" className="btn btn-primary"  />
                  {/* onChange={(e) => uploadImage(e)} */}
                  <img src={state.multerImage} alt=""  className="" />
                  <button >Add image</button>
                  </form>
                </div>
              </div>
            </div>
            // <div>
            //   <form onSubmit={submitImage}>
            //     <h3>Submit Photo</h3>
            //     <input type="file"/>
            //     <img src={image} alt=""/>
            //     <button type="submit">Add</button>
            //   </form>
            // </div>
          );
}

export default ImageTest;
