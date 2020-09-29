import React, { useState } from "react";
import SignIn from "../login/SignIn";
import SignUp from "../registration/SignUp";
import User from "../login/User";
import './Profile.css'

const Profile = (props) => {
  const {user, setUser, thisUser, setThisUser, loggedUser, setLoggedUser} = props;

  const [signUp, setSignUp] = useState(false)

  return (
    <>
        {
          loggedUser ?
          <User
            loggedUser={loggedUser} setLoggedUser={setLoggedUser}
            thisUser={thisUser} setThisUser={setThisUser}/>
          :
          <>
            <SignUp 
              signUp={signUp} setSignUp={setSignUp}
              user={user} setUser={setUser}
              loggedUser={loggedUser} setLoggedUser={setLoggedUser}
              />
            <SignIn
              signUp={signUp} setSignUp={setSignUp}
              user={user} setUser={setUser}
              loggedUser={loggedUser} setLoggedUser={setLoggedUser}
              />
          </>
        }
    </>
  );
}

export default Profile;
