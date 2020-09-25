import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import axios from "axios";


const User = ({thisUser, loggedUser, setLoggedUser}) => {
  const [myProducts, setMyProducts] = useState('')
  const getUser = loggedUser.username
  let URL = "http://localhost:8000/"

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
      .then((res) => {
        console.log(res.data)
        setLoggedUser(res.data);
      })
      .catch((err) => {
        console.log("not authorized");
        navigate("/");
      });
  }, [setLoggedUser]);

  useEffect( () => {
    axios.get(`http://localhost:8000/api/products/username/${getUser}`)
    .then(res => {
      console.log(res)
      setMyProducts(res.data)
    })
    .catch(err => console.log(err))
  }, [getUser])

  return (
    <div style={{height: "450px"}} className="FadeIn col-3 my-3 ml-3 rounded border shadow bg-white">
        <h3 className="py-3 mb-3 d-flex justify-content-center rounded bg-primary row text-white">{loggedUser.username}</h3>

        <p><strong>Created On:</strong> {loggedUser.createdAt}</p>
        <p><strong>Email: </strong> {loggedUser.email}</p>
        <p className="d-flex">You have listed <h5 className="mx-2">{myProducts.length}</h5> products</p>
        <div className="d-flex flex-wrap overflow-auto border" style={{maxHeight: "200px"}} >
          {
            myProducts ? myProducts.map( (item, i) =>
            <div className="col-4 p-0 border" key={i}>
              <p className="container bg-primary position-absolute overflow-hidden text-white" style={{maxHeight: "25px"}}>{item.product}</p>
              <img className="mw-25 mh-25 img-fluid" src={URL + item.productImage} alt=""/>
                  
              </div>
          ):''
        }
      </div>
    </div>
  );
};

export default User;