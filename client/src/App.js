import React, { useState, useEffect} from "react";
import axios from 'axios';
import Navbar from "./components/display/Navbar";
import Buy from "./components/buy/Buy"
import User from "./components/profile/User";
import SellForm from "./components/sell/SellForm";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp"
import Update from "./components/profile/Update"
import View from "./components/buy/View"
import Conversation from "./components/profile/Conversation"
import About from "./components/display/About"
import { Router, Link } from '@reach/router';
import './App.css'

function App() {
  const [allProducts, setAllProducts] = useState([])
  const [loggedUser, setLoggedUser] = useState('')
  const [myProducts, setMyProducts] = useState('')
  const [myConversations, setMyConversations] = useState('')

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
      .then((res) => {
          console.log("GETTING USER DATA")
          console.log(res.data)
          setLoggedUser(res.data);
      })
      .catch((err) => {
        console.log("not authorized");
      });
  }, [setLoggedUser]);

  return (

    <div className="m-auto col-xl-10 col-lg-11 col-md-12">
      <Navbar 
        loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
      <Buy 
        allProducts={allProducts} setAllProducts={setAllProducts}/>

      <Router>
        <View 
          allProducts={allProducts} setAllProducts={setAllProducts}
          loggedUser={loggedUser} setLoggedUser={setLoggedUser}
          path={'/view/:id'}/>
        <SignIn 
          loggedUser={loggedUser} setLoggedUser={setLoggedUser}
          path={"/signin"}/>
        <SignUp 
          loggedUser={loggedUser} setLoggedUser={setLoggedUser}
          path={"/signup"}/>
        <User 
          loggedUser={loggedUser} setLoggedUser={setLoggedUser}
          myProducts={myProducts} setMyProducts={setMyProducts}
          myConversations={myConversations} setMyConversations={setMyConversations}
          path={"/profile"}/>
        <SellForm
          loggedUser={loggedUser} setLoggedUser={setLoggedUser}
          allProducts={allProducts} setAllProducts={setAllProducts}
          path={"/sell"}/>
        <Update 
          loggedUser={loggedUser}
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          path={"/profile/update/:id"}/>
        <Conversation 
          loggedUser={loggedUser}
          myProducts={myProducts} setMyProducts={setMyProducts}
          myConversations={myConversations} setMyConversations={setMyConversations}
          path={"/profile/conversation/:id"}/>
        <About
          path={"/about"}/>
      </Router>
      <div className="col-12 bg-semi-teal bg-light-teal">
        <Link to={"/about"} className="d-flex justify-content-center text-light-teal font-weight-bold mb-0 p-2">
            About this project
        </Link>
        </div>
    </div>
  );
}

export default App;
