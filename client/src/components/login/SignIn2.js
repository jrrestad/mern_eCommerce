import React, { useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const SignIn2 = ({loggedUser, setLoggedUser}) => {
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
          navigate('/profile')
          // axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
          // .then((res) => {
          //   if (res.data != null) {
          //     console.log("SETTING LOGGED USER DATA")
          //     setLoggedUser(res.data);
          //     console.log(res.data)
          //     navigate('/profile')
          //     console.log("worked?")
          //   }
          // })
          // .catch((err) => {
          //   console.log("not authorized");
          //   console.log(loggedUser)
          // });
        }
      })
      .catch((err) => {
        console.log(err);
        // setErrors(err.response.data.msg)
      });
  };

  return (
    <>
    <Link to={"/"}><div className="modal-overlay"></div></Link>
    <div className="modal-signin bg-white rounded">
      <div  className="FadeIn col-12">
        <form onSubmit={login}>
          <h3 className="py-3 mb-3 d-flex justify-content-center rounded bg-primary row text-white">Sign In 2</h3>
            
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
        <div className="d-flex justify-content-center"><Link to={"/signup"}><button className="btn-link bg-white">Not registered? Sign up</button></Link></div>
      </div>
    </div>
    </>
  );
};

export default SignIn2;