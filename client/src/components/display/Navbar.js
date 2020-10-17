import React from 'react';
import { Link } from "@reach/router"
import axios from 'axios';

const Navbar = ({loggedUser, setLoggedUser}) => {

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

    return (
        <>
        <div className="row d-flex justify-content-between border-bottom" style={{height: "90px"}}>
            <div className="col">
                <h1 className=" mb-0 ml-5">Swap Meet</h1>
                <p className="mt-0 ml-5 font-italic">The digital sales platform</p>
            </div>

            <div className="col-6 float-right">
                {
                loggedUser ? 
                <div className="float-right">
                    <Link to={"/profile"}><button className="btn-link btn btn-primary text-white mt-2 float-right">Profile</button></Link>
                    <p><button className="btn-link btn p-0 mt-1 float-right" onClick={logout}>Logout</button></p>
                </div>
                : 
                <div className="float-right">
                    <Link to={"/signin"}><button className="btn-link btn btn-primary text-white mt-2 float-right">Sign In</button></Link>
                </div>
                }
            </div>
        </div>
        </>
    )
}

export default Navbar
