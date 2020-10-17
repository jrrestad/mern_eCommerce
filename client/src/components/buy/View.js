import React, { useState } from 'react'
import Map from '../display/Map'
import axios from 'axios'
import { Link, navigate } from '@reach/router'

const View = ({id, allProducts, loggedUser}) => { 

    const item = allProducts.filter(i => i._id === id)[0]
    const [errors, setErrors] = useState('')

    // if (item === undefined) {
    //     navigate('/')
    //     return null;
    // } else {

        const [message, setMessage] = useState({
            fromId: loggedUser.username,
            forId: item.createdBy,
            message: '',
            product: item._id,
            isRead: false,
        })

        const messageHandler = (e) => {
                setMessage({
                    ...message,
                    [e.target.name]: e.target.value
                });
        }

        const submitHandler = (e) => {
            e.preventDefault()
            axios.post(`http://localhost:8000/api/conversation`, message)
            .then(res => {
                if (res.data.errors) {
                    console.log(res.data)
                setErrors(res.data.errors)
                } else {
                    window.alert(`Your message was sent to ${item.createdBy}`)
                    navigate('/')
                }
            })
            .catch(err => console.log(err))
        }

            const time = new Date(item.createdAt)
            const now = new Date().getTime()
            const diff = Math.abs(now - time);
            const minDiff = Math.floor(diff / (1000 * 60))
            const hourDiff = Math.floor(diff / (1000 * 60 * 60))
            const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24))

    return (
        <>
        <Link to={"/"}><div className="modal-overlay"></div></Link>
        <div className="FadeIn modal-overlay-2 rounded bg-white">
            <div className="d-flex max-height">
                <div className="col-8 p-0 v-align d-flex justify-content-center">
                    <img className="img-fluid" style={{maxHeight: "100%"}} src={`http://localhost:8000/${item.productImage}`} alt=""/>
                </div>
                <div className="col-4 m-0 border-left p-0 max-height">

                    <div className="border-bottom overflow-auto" style={{height: "75%"}}>
                        <p className="text-muted font-italics">{item.category}</p>
                        <hr/>
                        <h6>{item.product}</h6>
                        <h4>${item.price}</h4>
                        <hr/>
                        <p className="text-muted font-italic m-0">Locations</p>
                        <Map coords={item.coords.coordinates}/>
                        <p className="mb-0">{time.toLocaleDateString()} at {time.toLocaleTimeString()}</p>
                            {
                                diff / (1000 * 60) < 60 ?
                                <p className="font-italic text-muted">({minDiff} mins ago)</p>
                                : diff / (1000 * 60 * 60) < 24 ?
                                <p className="font-italic text-muted">({hourDiff} hours ago)</p>
                                :
                                <p className="font-italic text-muted">({dayDiff} days ago)</p>
                            }
                        <hr/>
                        <p className="text-muted font-italic m-0">Seller</p>
                        <h6>{item.createdBy}</h6>
                        <p>{item.description}</p>
                    </div>
                    <div className="" style={{height: "25%"}}>
                        <form onSubmit={submitHandler} className="m-3">
                            {
                                loggedUser ? 
                                
                                <p className="form-control mb-2">{loggedUser.username}</p>
                                :<input className="form-control mb-2" type="text" id="fromId" name="fromId" placeholder={errors?"Name is required":"Name..."} onChange={messageHandler} />
                            }
                            <input className="form-control mb-2" type="text" id="message" name="message" placeholder={errors?"Message is required":"Message..."} onChange={messageHandler} />
                            <button className="m-0 btn-primary form-control">Send</button>
                        </form>
                    </div>
                </div>
                <button className="modal-close-button" onClick={() => navigate('/')}>
                    <span aria-hidden="true">&#10006;</span>
                </button>
            </div>
         </div>
         </>
    )
}
// }

export default View