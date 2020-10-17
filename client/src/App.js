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
import { Router } from '@reach/router';
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

  // useEffect(() => {
  //   axios.get(`http://localhost:8000/api/products/${lng}/${lat}/${meters}/${searchParams.min}/${searchParams.max}/${searchParams.category}/${customSearch}`)
  //   .then(res => {
  //       console.log(res)
  //       setAllProducts(res.data)
  //     })
  //   .catch(err => console.log(err))
  // }, [])

  return (

    <div className="margin-center">
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
      </Router>
    </div>
  );
}

export default App;
