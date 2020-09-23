import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "./components/display/Navbar";
import Sidebar from "./components/display/Sidebar";
import Buy from "./components/buy/Buy"

function App() {
  const [user, setUser] = useState(localStorage.getItem('myValue') || '')
  const [allProducts, setAllProducts] = useState([])

  useEffect( () => {
      localStorage.setItem('myValue', user)
  }, [user])

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/Electronics`)
    .then(res => {
        console.log(res)
        setAllProducts(res.data)
      })
    .catch(err => console.log(err))
  }, [allProducts])

  return (
    <>
    <div className="col">
        <Navbar user={user} setUser={setUser}/>
        <div className="wrapper row">
        <Sidebar 
        // allProducts={allProducts} setAllProducts={setAllProducts}
        user={user} setUser={setUser}/>
        {/* <Profile user={user} setUser={setUser}/> */}
          {/* <Router>
            <Profile user={user} setUser={setUser} path={"/profile"}/>
          </Router> */}
        </div>
        <Buy allProducts={allProducts} setAllProducts={setAllProducts}
        user={user} setUser={setUser}/>
    </div>
    </>
  );
}

export default App;
