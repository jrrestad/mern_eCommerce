import React from 'react';
import { Link } from "@reach/router"
import axios from 'axios';

const Navbar = (props) => {
    const {
        loggedUser, setLoggedUser} = props;

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

    //   const handleProfile = () => {
    //     if (showProfile === true) {
    //         setShowProfile(false)
    //     } else {
    //         setShowProfile(true);
    //     }
    // }

    return (
        <>
        <div className="row d-flex justify-content-between border-bottom" style={{height: "120px"}}>
            <div className="col">
                <h1 className="mt-4 mb-0 ml-5">Swap Meet</h1>
                <p className="mt-0 ml-5 font-italic">The digital trading post</p>
            </div>

            <div className="col-6 float-right">
            {
                loggedUser ? 
                <div className="float-right">
                    <Link to={"/profile"}><button className="btn-link btn btn-primary text-white mt-2">Profile</button></Link>
                    <Link to={"/sell"}><button className="btn-link btn btn-primary text-white mt-2">Sell</button></Link>
                    <p><button className="btn-link btn float-right mt-2" onClick={logout}>Logout</button></p>
                </div>
                : 
                <div className="float-right">
                    <Link to={"/signin"}><button className="btn-link btn btn-primary text-white mt-2">Sign In</button></Link>
                    <p className="text-muted font-italic mt-2">(not logged in)</p>
                </div>
            }
            </div>
        </div>
        </>
    )
}

export default Navbar
