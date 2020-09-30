import React, { useState } from 'react';
import { Link } from "@reach/router"
import axios from 'axios';

const Navbar = (props) => {
    const {
        loggedUser, setLoggedUser,
        showProfile, setShowProfile} = props;

    const logout = () => {
        axios.post("http://localhost:8000/api/logout", {}, {withCredentials: true})
            .then((res) => {
              console.log(res);
              console.log("log me out!")
              localStorage.clear();
              setLoggedUser('')
            })
            .catch(err => console.log(err));
        };

      const handleProfile = () => {
        if (showProfile === true) {
            setShowProfile(false)
        } else {
            setShowProfile(true);
        }
    }
    // const [formModal, setFormModal] = useState(false)
    // const handleFormModal = () => {
    //     if (formModal === true) {
    //         setFormModal(false)
    //     } else {
    //         setFormModal(true);
    //     }
    // }

    return (
        <>
        <div className="row d-flex justify-content-between border-bottom" style={{height: "120px"}}>
            <div className="col">
                <h1 className="mt-4 mb-0 ml-5">The Swap Meet</h1>
                <p className="mt-0 ml-5">A digital trading post</p>
            </div>
            
            {/* <div>
                {
                loggedUser ?
                <div>
                    <Link to={"/profile"}><button className="btn-link btn btn-lg btn-primary text-white">Profile ({loggedUser.username})</button></Link>
                    <Link to={"/sell"}><button className="btn-link btn btn-lg btn-primary text-white">Sell</button></Link>
                </div>
                :
                    <Link to={"/signin"}><button className="btn-link btn btn-lg btn-primary text-white">Sign In</button></Link>
                }
            </div> */}

            <div className="col-6 float-right">
            {
                loggedUser ? 
                <div className="float-right">
                    <Link to={"/profile"}><button className="btn-link btn btn-lg btn-primary text-white mt-2">Profile ({loggedUser.username})</button></Link>
                    <Link to={"/sell"}><button className="btn-link btn btn-lg btn-primary text-white mt-2">Sell</button></Link>
                    <p><button className="btn-link btn btn-lg float-right mt-2" onClick={logout}>Logout</button></p>
                </div>
                : 
                <div className="float-right">
                    <Link to={"/signin"}><button className="btn-link btn btn-lg btn-primary text-white mt-2">Sign In</button></Link>
                    <p className="text-muted font-italic mt-2">(not logged in)</p>
                </div>
            }
            </div>
            {/* <div className="col-6 float-right">
            {
                loggedUser ? 
                <div className="float-right">
                    <p className="my-3"><button className="btn btn-primary float-right btn-lg" onClick={handleProfile}>{loggedUser.username}</button></p>
                    <p><button className="btn-link btn btn-lg float-right mt-2" onClick={logout}>Logout</button></p>
                </div>
                : 
                <div className="float-right">
                    <button className="btn btn-primary btn-lg float-right my-3" onClick={handleProfile}>Sign In</button>
                    <p className="text-muted font-italic mt-2">(not logged in)</p>
                </div>
            }
            </div> */}
        </div>
        </>
    )
}

export default Navbar
