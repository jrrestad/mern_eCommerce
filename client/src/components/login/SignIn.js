import React, { useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const login = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8000/api/login", { email, password }, {withCredentials: true})
      .then((res) => {
        console.log(res)
        if (res.data.errors) {
          console.log('RES DATA')
          console.log(res.data)
          setErrors(res.data.errors)
        } else {
          console.log(res.data);
          console.log("SIGN IN SUCCESSFUL")
          navigate('/profile')
        }
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.msg)
      });
  };

  return (
    <>
    <Link to={"/"}><div className="modal-overlay"></div></Link>
    <div className="modal-signup bg-white rounded">
        <button className="modal-close-button" onClick={() => navigate('/')}>&#10006;</button>
        <form onSubmit={login} className="FadeIn max-height">
          <div className="overflow-auto" style={{height: "15%"}}>
            <div className="container mt-2">
              <h3>Sign In</h3>
              <p className="text-muted">Sign in to list items and leave reviews.</p>
            </div>
          </div>
          <div className="overflow-auto" style={{height: "70%"}}>
            <div className="mx-5" style={{position: "relative", top: "50%", transform: "translateY(-50%"}}>
              <label className="text-muted">Email</label>
              <input className="form-control" type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
              <label className="text-muted">Password</label>
              <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
              <p><span className="text-danger font-italic">{''} {errors?errors:''}</span></p>
            </div>
          </div>
          <div className="overflow-auto" style={{height: "15%"}}>
            <div className="px-5">
              <input className="form-control btn btn-primary" type="submit" value="Sign In"/>
              <Link className="d-block text-center" to={"/signup"}><button className="btn-link btn">Not registered? Sign up</button></Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;