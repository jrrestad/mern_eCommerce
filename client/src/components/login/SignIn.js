import React, { useState } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode'

const SignIn = ({setUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const login = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8000/api/login", { email, password }, {withCredentials: true})
      .then((res) => {
        console.log(res)
        if (res.data.errors) {
          setErrors(res.data.errors)
        } else {
          console.log(res.data);
          const usertoken = res.data.usertoken
          const decoded = jwt_decode(usertoken)
          // decoded is the JWT_token object
          console.log(decoded)
          // the user token will get set into local storage (avaiabile to all pages, but have to check still)
          localStorage.setItem('myValue', usertoken)
          setUser(localStorage.getItem('myValue') || '')
        }
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.msg)
      });
  };

  return (
    <>
    <div className="col-12">
      <h3 className="mt-1">Sign In</h3>
      <form onSubmit={login}>
        <div className="form-group row">
          <label className="col-4 col-form-label">Email:</label>
          <div className="col-8">
            <input className="form-control" type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            {/* <p className="text-danger text-right mb-0">{errors ? errors : ''}</p> */}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-4 col-form-label">Password:</label>
          <div className="col-8">
          <input className="form-control" type="password" name="email" onChange={(e) => setPassword(e.target.value)} value={password}/>
          <p className="text-danger text-right mb-0">{errors ? errors : ''}</p>
          </div>
        </div>
        <input className="offset-10  mb-2 btn btn-primary" type="submit" value="Sign In" />
      </form>
    </div>
    </>
  );
};

export default SignIn;