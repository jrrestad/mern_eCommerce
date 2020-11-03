import React from 'react'
import { Link, navigate } from '@reach/router'

const About = () => {
    return (
        <>
        <Link to={"/"}><div className="FadeIn modal-overlay"></div></Link>
        <div className="FadeIn modal-overlay-about rounded bg-white">
        <button className="modal-close-button" onClick={() => navigate('/')}>&#10006;</button>
            <div className="max-height mx-5 pt-3 overflow-auto">
                <p className="text-light-teal text-center font-weight-bold">About this project</p>
                <hr/>
                <p className="text-orange">This project was created utilizing React, Express.js, MongoDB, and Node.js
                making RESTful API calls to perform full CRUD operations.</p>
                <p className="text-light-teal font-weight-bold">Technologies used:
                <ul  className="text-orange font-weight-normal">
                    <li>JSON Web Tokens and Bcrypt for authorization</li>
                    <li>Google API with Geolocate</li>
                    <li>Custom Mongoose DB queries</li>
                    <li>Several NPM's including google-map-react, react-geocode, multer, @reach/router </li>
                    <li>Bootstrap and custom CSS for styling</li>
                </ul>
                </p>
                <p className="text-light-teal font-weight-bold">In progess:
                    <ul className="text-orange font-weight-normal">
                        <li>Allow multiple file uploads</li>
                        <li>Allow clients to edit/update profile</li>
                        <li>Improve messaging functionality</li>
                        <li>Allow posting items without an account</li>
                        <li>Implement a review system of sellers/buyers</li>
                        <li>Various cosmetic and user experience tweaks</li>
                        <li>Better website responsiveness</li>
                    </ul>
                </p>
                <p className="text-light-teal text-center font-weight-bold m-0">Contact Information</p>
                <hr/>
                <p className="text-light-teal font-weight-bold">Jonas Restad
                    <ul  className="text-orange font-weight-normal">
                        <li>Email: jrrestad@gmail.com</li>
                        <li>Github: <a href={"https://github.com/jrrestad"}>github.com/jrrestad</a></li>
                        <li>LinkedIn: <a href={"https://www.linkedin.com/in/jonas-restad-a830441b0/"}>linkedIn.com/jrrestad</a></li>
                    </ul>
                </p>
            </div>
         </div>
         </>
    )
}

export default About
