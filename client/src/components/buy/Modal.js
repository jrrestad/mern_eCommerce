import React from 'react'
import ReactDOM from 'react-dom';

const Modal = ({isShowing, toggleCountModal, id, item}) => isShowing ? ReactDOM.createPortal(
   <React.Fragment>
        <div className="modal-overlay" onClick={ () => toggleCountModal(id)}></div>
        <div className="modal-overlay-2 rounded bg-white">
            <div className="d-flex max-height">
                <div className="col-8 p-0 v-align">
                    <img className="img-fluid" src={`http://localhost:8000/${item.productImage}`} alt=""/>
                </div>
                <div className="col-4 border-left max-height p-3">
                    <p className="text-muted font-italics">{item.category}</p>
                    <hr/>
                    <h6>{item.product}</h6>
                    <h4>${item.price}</h4>
                    <hr/>
                    <p>{item.location} &#8226; {item.createdAt}</p>
                    <hr/>
                    <p>{item.createdBy}</p>
                </div>
                <button className="modal-close-button" onClick={() => toggleCountModal(id)}>
                    <span aria-hidden="true">&#10006;</span>
                </button>
            </div>
         </div>

    </React.Fragment>, document.body
    ) : null;

export default Modal;