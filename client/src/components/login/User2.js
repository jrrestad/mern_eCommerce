import React, { useState, useEffect } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";


const User2 = ({loggedUser, setLoggedUser}) => {
  const [myProducts, setMyProducts] = useState('')
  const getUser = loggedUser.username
  let URL = "http://localhost:8000/"

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
      .then((res) => {
          console.log("GETTING USER DATA")
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
    <>
    <Link to={"/"}><div className="modal-overlay"></div></Link>
    <div className="modal-profile bg-white rounded">

      <div className="FadeIn">
          <h3 className="text-center py-1 bg-primary text-white">{loggedUser.username}</h3>

          <p><strong>Created On:</strong> {loggedUser.createdAt}</p>
          <p><strong>Email: </strong> {loggedUser.email}</p>
          <h5 className="mx-2">Your products {myProducts.length}</h5>
          <div className="d-flex flex-wrap overflow-auto border" style={{maxHeight: "400px"}} >
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
    </div>
    </>
  );
};

export default User2;