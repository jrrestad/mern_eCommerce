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
        <div className="row d-flex justify-content-between border-bottom" style={{height: "120px"}}>
            <div className="col-6">
                
                <div className="" style={{width: "15em"}}>
                    <img className="img-fluid" src={require("../Images/Bazar_Logo-04.png")} alt="logo"/>
                    <p className="text-center text-light-teal">a virtual marketplace</p>
                </div>
                {/* <h1 className=" mb-0 ml-5">Swap Meet</h1> */}
            </div>

            <div className="col-6 float-right">
                {
                loggedUser ? 
                <div className="float-right">
                    <div className="d-flex mt-2">
                    <Link to={"/sell"}><button className="btn-link btn bg-teal text-white media-size">List something for sale</button></Link>
                    <Link to={"/profile"}><button className="btn-link btn bg-teal text-white float-right">Profile</button></Link>
                    </div>
                    <p><button className="btn-link btn text-orange p-0 mt-1 float-right" onClick={logout}>Logout</button></p>
                </div>
                : 
                <div className="float-right">
                    <Link to={"/signin"}><button className="btn-link btn bg-teal text-white mt-2 float-right">Sign In</button></Link>
                </div>
                }
            </div>
        </div>
        </>
    )
}

export default Navbar
