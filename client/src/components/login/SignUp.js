import React, { useState } from "react";
import { Link, navigate } from '@reach/router'
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const register = (event) => {
    event.preventDefault();
    const newUser = { username, email, password, confirmPassword };

    axios.post("http://localhost:8000/api/register", newUser, {withCredentials: true})
      .then((res) => {
        if (res.data.errors) {
          console.log(res)
          setErrors(res.data.errors)
        } else {
          console.log(res);
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          // create a congratulations for signing up link
          // and explain benefits of signing in, from there
          // can redirect to sign in pages
          navigate('/signin')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <Link to={"/"}><div className="modal-overlay"></div></Link>
    <div className="modal-signup bg-white rounded">
      <button className="modal-close-button" onClick={() => navigate('/')}>&#10006;</button>
      <form onSubmit={register} className="FadeIn max-height">
        <div className="overflow-auto" style={{height: "15%"}}>
          <div className="container mt-2">
            <h3>Sign Up</h3>
            <p className="text-muted">Only takes a second and completely free.</p>
          </div>
        </div>
        <div className="overflow-auto" style={{height: "70%"}}>
          <div className="mx-5" style={{position: "relative", top: "50%", transform: "translateY(-50%"}}>
            <label className="text-muted">Username <span className="text-danger font-italic">{errors?errors.username?.message:''}</span></label>
            <input className="form-control" type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} />
            <label className="text-muted">Email <span className="text-danger font-italic">{errors?errors.email?.message:''}</span></label>
            <input className="form-control" type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <label className="text-muted">Password <span className="text-danger  font-italic">{errors?errors.password?.message:''}</span></label>
            <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <label className="text-muted">Confirm password <span className="text-danger font-italic">{errors?errors.confirmPassword?.message:''}</span></label>
            <input className="form-control" type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
          </div>
        </div>
        <div className="overflow-auto" style={{height: "15%"}}>
          <div className="px-5">
            <input className="form-control btn btn-primary" type="submit" value="Sign Up"/>
            <Link className="d-block text-center" to={"/signin"}><button className="btn-link btn">Already registered? Sign in</button></Link>
          </div>
        </div>
      </form>
    </div>
    </>
  );
};

export default SignUp;

// ?. for errors is called optional chaining, lets you safely try to access keys that might not exist and avoid errors
