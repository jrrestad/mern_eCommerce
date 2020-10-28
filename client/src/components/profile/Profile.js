import React from 'react'
import { Link, navigate } from '@reach/router'

const Profile = ({loggedUser, myConversations}) => {

    return (
        <>
        <h3 className="mt-2 text-teal" >{loggedUser.username} profile</h3>

        <div className="container">
          <p className="text-light-teal"><strong>Member since:</strong> {new Date(loggedUser.createdAt).toDateString()}</p>
          <p className="text-light-teal"><strong>Current email:</strong> {loggedUser.email}</p>
        </div>
        <div className="max-height overflow-auto">
          <p className="m-0 text-muted font-italic">Messages ({myConversations.length})</p>
            {
              myConversations ? myConversations.map( (msg, j) => 
              <div key={j}>
                <input className='' type="checkbox"/>
                <Link to={`/profile/conversation/${msg._id}`}>
                    <li className="d-inline btn text-orange btn-link" onClick={ () => navigate(`profile/${msg._id}`)}>Message from {msg.fromId}</li>
                </Link>
                </div>
              ) : ''
            }
        </div>
        </>
    )
}

export default Profile
