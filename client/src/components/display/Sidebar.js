import React, { useState } from 'react'
import { Link } from '@reach/router'
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import SellForm from '../sell/SellForm'
import Profile from '../profile/Profile'
import './Display.css'

const Sidebar = ({user, setUser, allProducts, setAllProducts}) => {

    // const authenticate = () => {
    //     axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
    //     .then(res => {
    //         console.log('res')
    //         console.log(res)
    //         const usertoken = localStorage.getItem('myValue')
    //         console.log(usertoken)
    //         const decoded = jwt_decode(usertoken)
    //         if (decoded.id === res.data._id) {
    //             console.log(res.data)
    //             navigate('/sell')
    //         } else {
    //             window.alert("You need to be logged in to sell items.")
    //             navigate('/')
    //         }
    //     })
    //     .catch(err => console.log(err))
    // }
    const [showSellForm, setShowSellForm] = useState(false)
    const [showProfile, setShowProfile] = useState(false)

    const handleSellForm = () => {
        if (showSellForm === true) {
            setShowSellForm(false)
        } else {
            setShowSellForm(true);
        }
    }

    const handleProfile = () => {
        if (showProfile === true) {
            setShowProfile(false)
        } else {
            setShowProfile(true);
        }
    }

    return (
        <>
        <div className="col-2 border">
            <p className="btn btn-primary my-3 form-control">
            <Link to={"/"}>
                <span className="text-white">Marketplace</span>
            </Link>
            </p>
            <div className="form-group">

                <input className={showSellForm ?"btn btn-danger form-control mb-3":"btn btn-primary form-control mb-3"} type="button" onClick={handleSellForm} value={showSellForm?"Close Salesbox":  "Open Salesbox"}/>
                {
                    user ?
                    <input className={showProfile ?"btn btn-danger form-control mb-3":"btn btn-primary form-control mb-3"} type="button" onClick={handleProfile} value={showProfile ? "Close Profile": "Open Profile"}/>
                    :
                    <input className={showProfile ?"btn btn-danger form-control mb-3":"btn btn-primary form-control mb-3"} type="button" onClick={handleProfile} value={showProfile ? "Close Login": "Open Login"}/>
                }
            </div>
        </div>
            {showSellForm ? <SellForm user={user} showSellForm={showSellForm} allProducts={allProducts} setAllProducts={setAllProducts}
            /> : ''}
            {showProfile ? <Profile user={user} setUser={setUser} showProfile={showProfile}/> : ''}
        </>
    )
}

export default Sidebar
