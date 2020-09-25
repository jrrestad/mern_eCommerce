import React from 'react'
import ReactDOM from 'react-dom';

const Modal = ({isShowing, toggleCountModal, id, item}) => isShowing ? ReactDOM.createPortal(
   <React.Fragment>
        <div className="modal-overlay">
        <div className="container rounded bg-white" 
            aria-modal 
            aria-hidden 
            tabIndex={-1} 
            role="dialog">
            <div className="modal-header mt-5">
                <div className="">
                <h1>{item.product}</h1>
                <h1>Price: ${item.price}</h1>
                <h1>Condition: {item.condition}</h1>
                <img src={`http://localhost:8000/${item.productImage}`} width="500" alt=""/>
                <h3 className=" p-3"><li>{item.description}</li></h3>
                </div>
                <button 
                    className="modal-close-button btn btn-primary btn-lg" 
                    data-dismiss="modal" 
                    aria-label="close" 
                    onClick={() => toggleCountModal(id)}
                    >
                        <span aria-hidden="true">CLOSE THIS</span>
                </button>
            </div>
         </div>
        </div>
    </React.Fragment>, document.body
    ) : null;

export default Modal;


