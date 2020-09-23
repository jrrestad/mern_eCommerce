import React from "react";
import SignIn from "../login/SignIn";
import SignUp from "../registration/SignUp";
import User from "../login/User";
import './Profile.css'

const Profile = ({user, setUser}) => {

  return (
    <>
    <div className="FadeIn col-4 p-4 m-2 border shadow">
        {
          user ?
          <User/>
          :
          <div>
            <SignIn user={user} setUser={setUser}/>
            <SignUp user={user} setUser={setUser}/>
          </div>
        }
      </div>
    </>
  );
}

export default Profile;
