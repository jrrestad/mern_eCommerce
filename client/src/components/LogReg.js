import React from "react";

import SignIn from "../components/login/SignIn";
import SignUp from "../components/registration/SignUp";

const LogReg = ({ loggedIn, setLoggedIn }) => {
  return (
    <div className="">
      <SignIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <h1 className="text-center">or</h1>
      <SignUp />
    </div>
  );
};

export default LogReg;