import React, { useEffect } from "react";
import { Link, navigate } from "@reach/router";
import Profile from './Profile'
import axios from "axios";

const User = ({loggedUser, setLoggedUser, myProducts, setMyProducts, myConversations, setMyConversations}) => {
  useEffect(() => {
    axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
      .then((res) => {
          setLoggedUser(res.data);
      })
      .catch((err) => {
        navigate("/");
      });
  }, [setLoggedUser]);

  useEffect( () => {
    axios.get(`http://localhost:8000/api/products/username/${loggedUser.username}`)
    .then(res => {
      setMyProducts(res.data)
    })
    .catch(err => console.log(err))
  }, [loggedUser.username, setMyProducts])

  useEffect( () => {
    axios.get(`http://localhost:8000/api/conversation/${loggedUser.username}`)
    .then(res => {
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
          <h5 className="pt-2 text-teal">Your listed products</h5>
          <p className="mt-0 text-light-teal">Total listed <strong className="text-orange">{myProducts ? 0 : myProducts.length}</strong></p>
          <Link to={"/sell"}><button className="btn-link btn bg-teal text-white ml-0">List something for sale</button></Link>

        </div>
        <div className="container" style={{height: "5%"}}>
          <p className="m-0 text-light-teal text-center border-bottom ">Select an item to edit</p>
        </div>

        <div className="d-flex flex-wrap overflow-auto p-2" style={{height: "75%"}}>
        {
          myProducts.length > 0 ? myProducts.map( (item, i) =>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12 p-0 RaiseUp border" style={{height: "50%"}} key={i}>
            <Link to={`/profile/update/${item._id}`}>
              <div className="overflow-hidden bg-white" style={{height: "65%"}}>
                  <img className="img-fluid" src={item.productImage} alt="img"/>
              </div>
              <div className="p-2" style={{backgroundColor: "#fdf7f6", height: "35%"}}>

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