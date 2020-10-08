import React from 'react'
import Map from '../Map'
import { Link, navigate } from '@reach/router'

const View = ({id, allProducts}) => { 

    const item = allProducts.filter(i => i._id === id)[0]
    
    if (item === undefined) {
        navigate('/')
        return null;
    } else {

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
                <div className="col-4 border-left max-height p-3 overflow-auto">
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
                    <p>{item.createdBy}</p>
                    <p>{item.description}</p>
                </div>
                <button className="modal-close-button" onClick={() => navigate('/')}>
                    <span aria-hidden="true">&#10006;</span>
                </button>
            </div>
         </div>
         </>
    )
}}

export default View