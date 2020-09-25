import React, { useState, useEffect} from "react";
import axios from 'axios';
import Navbar from "./components/display/Navbar";
import Sidebar from "./components/display/Sidebar";
import Buy from "./components/buy/Buy"
import { Router } from '@reach/router';
// import Modal from './components/buy/Modal';
// import useModal from './components/buy/useModal';
import './App.css'

function App() {
  const [user, setUser] = useState(localStorage.getItem('myValue') || '')
  const [allProducts, setAllProducts] = useState([])
  const [thisUser, setThisUser] = useState('')
  const [loggedUser, setLoggedUser] = useState([])
  const [showProfile, setShowProfile] = useState(false)

  useEffect( () => {
      localStorage.setItem('myValue', user)
  }, [user])

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
      .then((res) => {
        if (res.data != null) {
          console.log(res.data)
          setThisUser(res.data);
        }
      })
      .catch((err) => {
        console.log("not authorized");
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/category/Electronics`)
    .then(res => {
        console.log(res)
        setAllProducts(res.data)
      })
    .catch(err => console.log(err))
  }, [])
  // context as alternative to passing state in
  // google use Context

  // const [toggleMarket, setToggleMarket] = useState(false)
 
  // const { isShowing, toggle} = useModal();

  return (
    <div className="col">
      <Navbar 
      showProfile={showProfile} setShowProfile={setShowProfile}
      loggedUser={loggedUser} setLoggedUser={setLoggedUser}
      thisUser={thisUser} setThisUser={setThisUser}
      user={user} setUser={setUser}/>
    {/* <div className="App">
    <button className="button-default" onClick={toggle}>Show Modal</button>
    <Modal isShowing={isShowing} hide={toggle}/>
    </div> */}
      <div className="wrapper row bg-light border-bottom" style={{minHeight: "700px"}}>
        <Sidebar 
        showProfile={showProfile} setShowProfile={setShowProfile}
        loggedUser={loggedUser} setLoggedUser={setLoggedUser}
        allProducts={allProducts} setAllProducts={setAllProducts}
        thisUser={thisUser} setThisUser={setThisUser}
        user={user} setUser={setUser}/>
      </div>

      <Router>
        <Buy path={"/buy"} 
        allProducts={allProducts} setAllProducts={setAllProducts}
        user={user} setUser={setUser}/>
      </Router>
    </div>
  );
}

export default App;
