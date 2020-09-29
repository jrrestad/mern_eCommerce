import React, { useState } from "react";
import axios from "axios";
// import jwt_decode from 'jwt-decode'

const SignIn = ({setUser, loggedUser, setLoggedUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const login = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8000/api/login", { email, password }, {withCredentials: true})
      .then((res) => {
        if (res.data.errors) {
          console.log('RES DATA')
          console.log(res.data)
          setErrors(res.data.errors)
        } else {
          console.log(res.data);
          console.log("SIGN IN SUCCESSFUL")
          // const usertoken = res.data.usertoken
          // const decoded = jwt_decode(usertoken)
          // decoded is the JWT_token object
          // console.log(decoded)
          // the user token will get set into local storage (avaiabile to all pages, but have to check still)
          // localStorage.setItem('myValue', usertoken)
          // setUser(localStorage.getItem('myValue') || '')
          // setLoggedUser(res.data.usertoken)
          axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
          .then((res) => {
            if (res.data != null) {
              console.log("SETTING LOGGED USER DATA")
              setLoggedUser(res.data);
              console.log(res.data)
            }
          })
          .catch((err) => {
            console.log("not authorized");
            console.log(loggedUser)
          });
        }
      })
      .catch((err) => {
        console.log(err);
        // setErrors(err.response.data.msg)
      });
  };

  return (
    <>
    <div style={{height: "300px"}} className="FadeIn col-3 my-3 ml-3 rounded border shadow bg-white">
      <form onSubmit={login}>
        <h3 className="py-3 mb-3 d-flex justify-content-center rounded bg-primary row text-white">Sign In</h3>
          
          <div className="form-group d-flex justify-content-between">
            <label className="col-form-label">Email:</label>
            <input className="col-8 form-control" type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
          </div>

          <div className="form-group d-flex justify-content-between">
            <label className="col-form-label">Password:</label>
            <input className="col-8 form-control" type="password" name="email" onChange={(e) => setPassword(e.target.value)} value={password}/>
          </div>
            <p className="text-danger text-right mb-2">{errors ? errors : ''}</p>
          
          <input className="form-control btn btn-primary" type="submit" value="Sign In" />
      </form>
    </div>
    </>
  );
};

export default SignIn;