import React from 'react'
import { Link, navigate } from '@reach/router'

const Profile = ({loggedUser, myConversations}) => {

    return (
        <>
        <h3 className="mt-2" >{loggedUser.username} profile</h3>

        <div className="container">
          <p className=""><strong>Member since:</strong> {new Date(loggedUser.createdAt).toDateString()}</p>
          <p className=""><strong>Current email:</strong> {loggedUser.email}</p>
          <Link to={"/sell"}><button className="btn-link btn btn-primary text-white ml-0">List something for sale</button></Link>
        </div>
        <hr/>
        <div className="max-height overflow-auto">
          <p className="m-0 text-muted font-italic">Messages ({myConversations.length})</p>
            {
              myConversations ? myConversations.map( (msg, j) => 
              <div key={j}>
                <input className="mr-1" type="checkbox"/>
                <Link to={`/profile/conversation/${msg._id}`}>
                    <li className="d-inline btn btn-link m-0 p-0" onClick={ () => navigate(`profile/${msg._id}`)}>New message from {msg.fromId}</li>
                </Link>
                </div>
              ) : ''
            }
        </div>
        </>
    )
}

export default Profile
