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
        if (res.data.errors) {
          setErrors(res.data.errors)
        } else {
          navigate('/profile')
        }
      })
      .catch((err) => {
        setErrors(err.response.data.msg)
      });
  };

  return (
    <>
    <Link to={"/"}><div className="modal-overlay"></div></Link>
    <div className="FadeIn modal-signup bg-white rounded">
        <button className="modal-close-button" onClick={() => navigate('/')}>&#10006;</button>
        <form onSubmit={login} className="FadeIn max-height">
          <div className="overflow-auto" style={{height: "15%"}}>
            <div className="container mt-2">
              <h3 className="text-teal">Sign In</h3>
              <p className="text-light-teal">Sign in to list items and leave reviews.</p>
            </div>
          </div>
          <div className="overflow-auto" style={{height: "70%"}}>
            <div className="mx-5" style={{position: "relative", top: "50%", transform: "translateY(-50%"}}>
              <label className="text-light-teal">Email</label>
              <input className="form-control" type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
              <label className="text-light-teal">Password</label>
              <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
              <p><span className="text-danger font-italic">{''} {errors?errors:''}</span></p>
            </div>
          </div>
          <div className="overflow-auto" style={{height: "15%"}}>
            <div className="px-5">
              <input className="form-control btn bg-teal text-white" type="submit" value="Sign In"/>
              <Link className="d-block text-center" to={"/signup"}><button className="btn-link text-orange btn">Not registered? Sign up</button></Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;