import React, { useState, useEffect } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";

const User2 = ({loggedUser, setLoggedUser}) => {
  const [myProducts, setMyProducts] = useState('')
  const getUser = loggedUser.username
  let URL = "http://localhost:8000/"


  // can make api call for every page to verify logged in, or can check state?
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

  //   var formatDate = new Intl.DateTimeFormat('en-US', {
  //   month: 'long', 
  //   weekday: 'short',
  //   year: 'numeric', 
  //   day: '2-digit',
  //   hour: 'numeric', 
  //   minute: 'numeric', 
  //   second: 'numeric',
  // });

  // var apiDate = new Date(loggedUser.createdAt)
  // var date = apiDate.toDateString()
  // var time = apiDate.toLocaleTimeString()

  // var date = new Date(loggedUser.createdAt)
  // var nowDate = new Date().getTime()
  // var diff = Math.abs(nowDate - date );
  // var minDiff = Math.floor(diff / (1000 * 60))
  // var hourDiff = Math.floor(diff / (1000 * 60 * 60))
  // var daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24))

  return (
  <>
  <Link to={"/"}><div className="modal-overlay"></div></Link>
  <div className="modal-profile bg-white rounded">

    <div className="FadeIn max-height bg-white">

      <h3 className="bg-primary text-white d-flex justify-content-center m-0 align-items-center" style={{height: "10%"}}>{loggedUser.username}'s profile</h3>

      <div className="container mt-0 p-2 d-flex justify-content-between" style={{height: "25%"}}>
        <div className="">
          <p className="m-0"><strong>Member since:</strong> {new Date(loggedUser.createdAt).toDateString()}</p>
          <p className="m-0"><strong>Current email:</strong> {loggedUser.email}</p>
          <p className="m-0"><strong>Your products:</strong> {myProducts.length}</p>
        </div>
        <Link to={"/sell"}><button className="btn-link btn btn-primary text-white mt-2">List something for sale</button></Link>
      </div>

        <h6 className="text-center text-white py-1 m-0 bg-primary d-flex align-items-center justify-content-center " style={{height: "5%"}}>Select an item to edit</h6>

        <div className="d-flex flex-wrap border-top overflow-auto" style={{height: "60%"}} >

        {
        myProducts ? myProducts.map( (item, i) =>
          <div className="col-4 p-0" key={i}>
            <Link to={`/profile/update/${item._id}`}>
              <div className="overflow-hidden" style={{height: "200px"}}>
                  <img className="img-fluid" src={URL + item.productImage} alt="img"/>
              </div>
              <div className="p-2 border bg-light">
                <h6 className="font-card">{item.product}</h6>
                <p className="font-card">Condition: <span>
                {
                  (item.condition === 'Poor') ?
                  <span className="text-danger">{item.condition}</span>
                  : (item.condition === 'Fair') ?
                  <span className="text-warning">{item.condition}</span>
                  : (item.condition === 'Good') ?
                  <span className="text-info">{item.condition}</span>
                  :
                  <span className="text-primary">{item.condition}</span>
                }
                </span>
                </p>
                <p className="font-card">Zip Code: {item.location}</p>
                <p className="font-card">Price: ${item.price}</p>
              </div>
            </Link>
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