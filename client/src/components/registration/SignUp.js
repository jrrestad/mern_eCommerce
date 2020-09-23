import React, { useState } from "react";
import axios from "axios";
import './SignUp.css'

const SignUp = (props) => {
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <div className="col-12">
      <h3 className="mt-1">Sign Up</h3>
      <form onSubmit={register}>

        <div className="form-group row">
          <label className="col-4 col-form-label">Username:</label>
          <div className="col-8">
            <input className="form-control" type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} />
            {/* ?. is called optional chaining, lets you safely try to access keys that might not exist and avoid errors */}
            {errors?.username && (<p className="text-danger text-right mb-0">{errors.username?.properties?.message}</p>)}
          </div>
        </div>

        <div className="form-group row">
          <label className="col-4 col-form-label">Email:</label>
          <div className="col-8">
            <input className="form-control" type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            {errors?.email && (<p className="text-danger text-right mb-0">{errors.email?.properties?.message}</p>)}
          </div>
        </div>

        <div className="form-group row">
          <label className="col-4 col-form-label">Password:</label>
          <div className="col-8">
            <input className="form-control" type="password" name="email" onChange={(e) => setPassword(e.target.value)} value={password} />
            {errors?.password && (<p className="text-danger text-right mb-0">{errors.password?.properties?.message}</p>)}
          </div>
        </div>

        <div className="form-group row">
          <label className="col-4 col-form-label">Confirm Password:</label>
          <div className="col-8">
            <input className="form-control" type="password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
            {errors?.confirmPassword && (<p className="text-danger text-right mb-0">{errors.confirmPassword?.properties?.message}</p>)}
          </div>
        </div>

        <input className="offset-10 btn btn-primary mb-3" type="submit" value="Sign Up"  />
      </form>
    </div>
    </>
  );
};

export default SignUp;