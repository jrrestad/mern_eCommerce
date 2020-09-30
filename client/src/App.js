import React, { useState, useEffect} from "react";
import axios from 'axios';
import Navbar from "./components/display/Navbar";
import Buy from "./components/buy/Buy"
import User2 from "./components/login/User2";
import SellForm2 from "./components/sell/SellForm2";
import SignIn2 from "./components/login/SignIn2";
import SignUp2 from "./components/registration/SignUp2"
import { Router } from '@reach/router';
import './App.css'

function App() {
  const [allProducts, setAllProducts] = useState([])
  const [loggedUser, setLoggedUser] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/category/Electronics`)
    .then(res => {
        console.log(res)
        setAllProducts(res.data)
      })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="col">
      <Navbar 
      loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
      <Buy 
      allProducts={allProducts} setAllProducts={setAllProducts}/>
      <Router>
        <SignIn2 
        loggedUser={loggedUser} setLoggedUser={setLoggedUser}
        path={"/signin"}/>
        <SignUp2 
        loggedUser={loggedUser} setLoggedUser={setLoggedUser}
        path={"/signup"}/>
        <User2 
        loggedUser={loggedUser} setLoggedUser={setLoggedUser}
        path={"/profile"}/>
        <SellForm2
        loggedUser={loggedUser} setLoggedUser={setLoggedUser}
        allProducts={allProducts} setAllProducts={setAllProducts}
        path={"/sell"}/>
      </Router>
    </div>
  );
}

export default App;
