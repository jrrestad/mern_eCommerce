import React, { useState, useEffect } from 'react'
import { Link } from '@reach/router'
import SellForm from '../sell/SellForm'
import Profile from '../profile/Profile'
// import './Display.css'

const Sidebar = (props) => {

    const {showProfile, setShowProfile,
           allProducts, setAllProducts,
           loggedUser, setLoggedUser,
           } = props;

        const [showSellForm, setShowSellForm] = useState(false)
        const [toggleMarket, setToggleMarket] = useState(false)

    const handleMarket = () => {
        if (toggleMarket === true) {
            setToggleMarket(false) 
        } else {
            setToggleMarket(true);
        }
    }
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

    useEffect(() => {
        console.log(window.location.pathname)
        if (window.location.pathname === "/buy") {
            setToggleMarket(true)
        } else {
            setToggleMarket(false)
        }
    }, [])

    return (
        <>
        <div className="col-2 border form-group bg-white">
            {
                toggleMarket ? 
                <Link to={"/"}><input className="btn btn-danger my-3 form-control" type="button" value="Marketplace" onClick={handleMarket}/></Link>
                :
                <Link to={"/buy"}><input className="btn btn-primary my-3 form-control" type="button" value="Marketplace" onClick={handleMarket}/></Link>
            }
            <input className={showSellForm ?"btn btn-danger form-control mb-3":"btn btn-primary form-control mb-3"} type="button" onClick={handleSellForm} value={showSellForm?"Close Salesbox":  "Open Salesbox"}/>
            {
                loggedUser ?
                <input className={showProfile ?"btn btn-danger form-control mb-3":"btn btn-primary form-control mb-3"} type="button" onClick={handleProfile} value={showProfile ? "Close Profile": "Open Profile"}/>
                :
                <input className={showProfile ?"btn btn-danger form-control mb-3":"btn btn-primary form-control mb-3"} type="button" onClick={handleProfile} value={showProfile ? "Close Login": "Open Login"}/>
            }        
        </div>
            {
                showSellForm ? 
                <SellForm 
                loggedUser={loggedUser} setLoggedUser={setLoggedUser}
                allProducts={allProducts} setAllProducts={setAllProducts}
                /> : ''
            }
            {
                showProfile ? 
                <Profile 
                loggedUser={loggedUser} setLoggedUser={setLoggedUser}
                /> : ''
            }
        </>
    )
}

export default Sidebar
