import React, { useState, useEffect } from 'react'
import { Link, navigate } from '@reach/router'
import axios from 'axios';

const Navbar = ({user, setUser}) => {
    const [thisUser, setThisUser] = useState('')

    const logout = () => {
        // need to send the cookie in request so server can clear it
        axios.post("http://localhost:8000/api/logout2", {withCredentials: true})
            .then((res) => {
              console.log(res);
              console.log("log me out!")
              localStorage.clear();
              setUser('')
            })
              .catch(err => console.log(err));
      };

      useEffect(() => {
        axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
          .then((res) => {
            console.log(res.data)
            setThisUser(res.data);
          })
          .catch((err) => {
            console.log("not authorized");
            navigate("/");
          });
      }, []);

    return (
        <>
        <nav className="row d-flex justify-content-between border-bottom">
            <h1><Link to={"/"}>
                Marketplace
            </Link></h1>
            <div className="border">
            {
                user ? 
                <>
                <div className="border p-3">
                <Link to={"/profile"}><h3 className="text-center mb-0">{thisUser.username}</h3></Link>
                <button className="btn-link btn" onClick={logout}>Logout</button>
                </div>
                </>
                : 
                <>
                <Link to={"/profile"}><h3 className="text-center mb-3">Sign In</h3></Link>
                <p className="text-muted font-italic">(not logged in)</p>
                </>
            }
            </div>
        </nav>
        </>
    )
}

export default Navbar
