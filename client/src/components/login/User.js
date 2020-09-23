import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import axios from "axios";


const User = () => {
  const [users, setUsers] = useState([]);

  // const getLoggedInUser = () => {
  //   console.log(users)
  //   axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
  //     .then((res) => {
  //       setUsers(res.data)})
  //     .catch(console.log);
  // };

  // changed from api/users so you can't see all users
  useEffect(() => {
    axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
      .then((res) => {
        console.log(res.data)
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("not authorized");
        navigate("/");
      });
  }, []);

  return (
    <div className="container">
      {/* <h3>All Users:</h3>
      <button onClick={getLoggedInUser}>Get Logged In User</button>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Created On</th>
          </tr>
            <tr >
              <td>{users.username}</td>
              <td>{users.email}</td>
              <td>{users.createdAt}</td>
            </tr>
        </tbody>
      </table> */}
      <h1>Name: {users.username}</h1>
      <h2>Email: {users.email}</h2>
      <h2>Created: {users.createdAt}</h2>
    </div>
  );
};

export default User;