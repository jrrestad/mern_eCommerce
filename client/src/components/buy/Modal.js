import React from 'react'
import Map from "../Map"
import ReactDOM from 'react-dom';

// const location = {
//     address: '1600 Amphitheatre Parkway, Mountain View, california.',
//     lat: 37.42216,
//     lng: -122.08427,
//     }

const Modal = ({isShowing, toggleCountModal, id, item}) => isShowing ? ReactDOM.createPortal(
   <React.Fragment>
        <div className="modal-overlay" onClick={ () => toggleCountModal(id)}></div>
        <div className="modal-overlay-2 rounded bg-white">
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
                    <p className="my-0">{item.location}</p>
                    {/* <Map location={location} zoomLevel={12}/> */}
                    <p className="mb-0">{new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}</p>
                    <p>
                    {
                        Math.floor( Math.abs( (new Date().getTime()) - (new Date(item.createdAt).getTime()) ) / (1000 * 60) ) < 60 ?
                        <span className="text-muted font-italic"> ({Math.floor( Math.abs( (new Date().getTime()) - (new Date(item.createdAt).getTime()) ) / (1000 * 60) )} mins ago)</span>
                        : 
                        Math.floor( Math.abs( (new Date().getTime()) - (new Date(item.createdAt).getTime()) ) / (1000 * 60 * 60) ) < 24 ?
                        <span className="text-muted font-italic"> ({Math.floor( Math.abs( (new Date().getTime()) - (new Date(item.createdAt).getTime()) ) / (1000 * 60 * 60) )} hours ago)</span>
                        : 
                        <span className="text-muted font-italic"> ({Math.floor( Math.abs( (new Date().getTime()) - (new Date(item.createdAt).getTime()) ) / (1000 * 60 * 60 * 24) )} days ago)</span>
                    }
                    </p>
                    <hr/>
                    <p>{item.createdBy}</p>
                    <p>{item.description}</p>
                </div>
                <button className="modal-close-button" onClick={() => toggleCountModal(id)}>
                    <span aria-hidden="true">&#10006;</span>
                </button>
            </div>
         </div>

    </React.Fragment>, document.body
    ) : null;

export default Modal;