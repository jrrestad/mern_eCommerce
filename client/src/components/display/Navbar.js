import React from 'react'
import axios from 'axios';

const Navbar = (props) => {
    const {
        user, setUser, 
        loggedUser, 
        showProfile, setShowProfile} = props;

    const logout = () => {
        axios.post("http://localhost:8000/api/logout", {withCredentials: true})
            .then((res) => {
              console.log(res);
              console.log("log me out!")
              localStorage.clear();
              setUser('')
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

    return (
        <>
        <div className="row d-flex justify-content-between border-bottom" style={{height: "120px"}}>
            <div className="col">

            <h1 className="mt-4 mb-0 ml-5">The Swap Meet</h1>
            <p className="mt-0 ml-5">A digital trading post</p>
            <hr/>
            </div>
            <div className="col-6 float-right">
            {
                user ? 
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
            </div>
        </div>
        </>
    )
}

export default Navbar
