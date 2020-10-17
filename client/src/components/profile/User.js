import React, { useEffect } from "react";
import { Link, navigate } from "@reach/router";
import Profile from './Profile'
import axios from "axios";

const User = ({loggedUser, setLoggedUser, myProducts, setMyProducts, myConversations, setMyConversations}) => {
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
    axios.get(`http://localhost:8000/api/products/username/${loggedUser.username}`)
    .then(res => {
      console.log(res)
      setMyProducts(res.data)
    })
    .catch(err => console.log(err))
  }, [loggedUser.username, setMyProducts])

  useEffect( () => {
    axios.get(`http://localhost:8000/api/conversation/${loggedUser.username}`)
    .then(res => {
      console.log("messages!!")
      console.log(res.data)
      setMyConversations(res.data)
    })
    .catch(err => console.log(err))
  }, [loggedUser.username, setMyConversations])

  return (
  <>
  <Link to={"/"}><div className="modal-overlay"></div></Link>
  <div className="modal-profile bg-white rounded">
  <button className="modal-close-button" onClick={() => navigate('/')}>&#10006;</button>

    <div className="FadeIn max-height bg-transparent d-flex justify-content-between">

      <div className="col-6 border-right" style={{height: "100%"}}>
        <Profile
          loggedUser={loggedUser}
          myConversations={myConversations}
        />
      </div>

      <div style={{height: "100%", width: "100%"}}>

        <div className="container" style={{height: "20%"}}>
          <h5 className="pt-2">Your listed products</h5>
          <p className="m-0 text-muted">Total listed ({myProducts.length})</p>
        </div>
        <div className="container" style={{height: "5%"}}>
          <p className="m-0">Select an item to edit</p>
        </div>

        <div className="d-flex flex-wrap border-top overflow-auto" style={{height: "75%"}}>
        {
          myProducts.length > 0 ? myProducts.map( (item, i) =>
          <div className="col-4 p-0" key={i}>
            <Link to={`/profile/update/${item._id}`}>
              <div className="overflow-hidden" style={{height: "200px"}}>
                  <img className="img-fluid" src={URL + item.productImage} alt="img"/>
              </div>
              <div className="p-2 border bg-light">

                <h6 className="font-card overflow-hidden" style={{height: "15px"}}>{item.product}</h6>
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
  </div>
  </>
  );
};

export default User;