import React, { useState } from "react";
import { Link, navigate } from '@reach/router'
import axios from "axios";
import './SignUp.css'

const SignUp2 = (props) => {
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

      <form onSubmit={register} className="FadeIn max-height">

      <h3 className="m-0 d-flex justify-content-center bg-primary text-white" style={{height: "10%"}}>Sign Up</h3>

      <div className="overflow-auto pl-2 border" style={{height: "70%"}}>

        <div className="form-group d-flex pt-2 justify-content-between">
          <label className="col-form-label">Username:</label>
          <div className="col-8">
            <input className="col-12 form-control" type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} />
            {/* ?. is called optional chaining, lets you safely try to access keys that might not exist and avoid errors */}
            {errors?.username && (<p className="text-danger text-center mb-0">{errors.username?.message}</p>)}
          </div>
        </div>

        <div className="form-group d-flex justify-content-between">
          <label className="col-form-label">Email:</label>
          <div className="col-8">
            <input className="col-12 form-control" type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            {errors?.email && (<p className="text-danger text-center mb-0">{errors.email?.message}</p>)}
          </div>
        </div>

        <div className="form-group d-flex justify-content-between">
          <label className="col-form-label">Password:</label>
          <div className="col-8">
            <input className="col-12 form-control" type="password" name="email" onChange={(e) => setPassword(e.target.value)} value={password} />
            {errors?.password && (<p className="text-danger text-center mb-0">{errors.password?.properties?.message}</p>)}
          </div>
        </div>

        <div className="form-group d-flex justify-content-between">
          <label className="col-form-label">Confirm Password:</label>
          <div className="col-8">
            <input className="col-12 form-control" type="password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
            {errors?.confirmPassword && (<p className="text-danger text-center mb-0">{errors.confirmPassword?.properties?.message}</p>)}
          </div>
        </div>

      </div>
            <div className="form-group d-flex justify-content-center flex-wrap" style={{height: "20%"}}>
              <input className="form-control mx-2 mt-2 btn btn-primary" type="submit" value="Sign Up"/>
              <Link to={"/signin"}><button className="btn-link btn p-0">Already registered? Sign in</button></Link>
            </div>
        </form>
      </div>
    </>
  );
};

export default SignUp2;