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
          
          <h3 className="text-center py-1 m-0 bg-primary text-white" style={{height: "10%"}}>{loggedUser.username}</h3>
          
          <div className="container mt-0" style={{height: "30%"}}>
            <p><strong>Member since:</strong> {new Date(loggedUser.createdAt).toDateString()}</p>
            <p><strong>Current email:</strong> {loggedUser.email}</p>
            <p><strong>Your products:</strong> {myProducts.length}</p>

          </div>

          <div className="d-flex flex-wrap border-top overflow-auto" style={{height: "60%"}} >

            {
              myProducts ? myProducts.map( (item, i) =>
              <div className="col-4 border p-0" key={i}>
                <Link to={`/profile/update/${item._id}`}>
                        <div className="overflow-hidden" style={{height: "200px"}}>
                            <img className="img-fluid" src={URL + item.productImage} alt="img"/>
                        </div>
                        <div className="p-2 border-top">
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