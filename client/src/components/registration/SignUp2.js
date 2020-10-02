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

    <div className="FadeIn col-12">
      <form onSubmit={register}>
      <h3 className="py-3 mb-3 d-flex justify-content-center rounded bg-primary row text-white">Sign Up</h3>

        <div className="form-group d-flex justify-content-between">
          <label className="col-form-label">Username:</label>
            <input className="col-8 form-control" type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} />
            {/* ?. is called optional chaining, lets you safely try to access keys that might not exist and avoid errors */}
        </div>
            {errors?.username && (<p className="text-danger text-right mb-0">{errors.username?.message}</p>)}

        <div className="form-group d-flex justify-content-between">
          <label className="col-form-label">Email:</label>
            <input className="col-8 form-control" type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
            {errors?.email && (<p className="text-danger text-right mb-0">{errors.email?.message}</p>)}

        <div className="form-group d-flex justify-content-between">
          <label className="col-form-label">Password:</label>
            <input className="col-8 form-control" type="password" name="email" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
            {errors?.password && (<p className="text-danger text-right mb-0">{errors.password?.properties?.message}</p>)}

        <div className="form-group d-flex justify-content-between">
          <label className="col-form-label">Confirm Password:</label>
            <input className="col-8 form-control" type="password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
        </div>
            {errors?.confirmPassword && (<p className="text-danger text-right mb-0">{errors.confirmPassword?.properties?.message}</p>)}

        <input className="form-control btn btn-primary" type="submit" value="Sign Up"/>
      </form>
      <div className="d-flex justify-content-center"><Link to={"/signin"}><button className="btn-link bg-white">Already registered? Sign in</button></Link></div>
      </div>
    </div>
    </>
  );
};

export default SignUp2;