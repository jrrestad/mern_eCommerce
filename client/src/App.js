import React, { useState, useEffect} from "react";
import axios from 'axios';
import Navbar from "./components/display/Navbar";
import Sidebar from "./components/display/Sidebar";
import Buy from "./components/buy/Buy"
import { Router } from '@reach/router';
import './App.css'

function App() {
  const [allProducts, setAllProducts] = useState([])
  const [loggedUser, setLoggedUser] = useState({})
  const [showProfile, setShowProfile] = useState(false)

  // useEffect( () => {
  //     localStorage.setItem('myValue', user)
  // }, [user])

  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
  //     .then((res) => {
  //       if (res.data != null) {
  //         console.log(res.data)
  //         setLoggedUser(res.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("not authorized");
  //       console.log(loggedUser)
  //     });
  // }, []);

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
      showProfile={showProfile} setShowProfile={setShowProfile}
      loggedUser={loggedUser} setLoggedUser={setLoggedUser}
      />

      <div className="wrapper row bg-light border-bottom" style={{minHeight: "700px"}}>
        <Sidebar 
        showProfile={showProfile} setShowProfile={setShowProfile}
        loggedUser={loggedUser} setLoggedUser={setLoggedUser}
        allProducts={allProducts} setAllProducts={setAllProducts}
        />
      </div>

      <Router>
        <Buy path={"/buy"} 
        allProducts={allProducts} setAllProducts={setAllProducts}
        />
      </Router>
    </div>
  );
}

export default App;
