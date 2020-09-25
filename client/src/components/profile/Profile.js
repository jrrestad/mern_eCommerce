import React, { useState } from "react";
import SignIn from "../login/SignIn";
import SignUp from "../registration/SignUp";
import User from "../login/User";
import './Profile.css'

const Profile = ({user, setUser, thisUser, setThisUser, loggedUser, setLoggedUser}) => {

  const [signUp, setSignUp] = useState(false)

  return (
    <>
    {/* <div style={{height: "300px"}} className="FadeIn col-3 my-3 ml-3 rounded border shadow bg-white"> */}
        {
          user.length >= 0 && user ?
          <User
            loggedUser={loggedUser} setLoggedUser={setLoggedUser}
            thisUser={thisUser} setThisUser={setThisUser}/>
          :
          <>
            <SignUp 
              signUp={signUp} setSignUp={setSignUp}
              user={user} setUser={setUser}/>
            <SignIn
              signUp={signUp} setSignUp={setSignUp}
              user={user} setUser={setUser}/>
          </>
        }
      {/* </div> */}
    </>
  );
}

export default Profile;
