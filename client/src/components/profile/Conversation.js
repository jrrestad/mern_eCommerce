import React from 'react'
import { Link, navigate } from '@reach/router'

const Conversation = ({id, myConversations,myProducts}) => {
    let URL = "http://localhost:8000/"

    const conversation = myConversations.filter(i => i._id === id)[0]
    const item = myProducts.filter(i => i._id === conversation.product)[0]
    return (
    <>
        <Link to={"/"}><div className="modal-overlay"></div></Link>
        <div className="modal-sell bg-white rounded">

            <div className="max-height">

                <div className="overflow-auto p-2" style={{height: "30%"}}>
                    <button className="modal-close-button" onClick={() => navigate('/profile')}>&#10006;</button>
                    <p>From {conversation.fromId}</p>
                    <p>{conversation.message}</p>
                </div>
                <div style={{height: "70%"}}>
                    {
                    !item? 
                    <p>Item was marked as sold</p>
                    :
                    <>
                        <div className="overflow-hidden d-flex justify-content-center" style={{height: "75%"}}>
                            <img className="img-fluid mw-100 mh-100" src={URL + item.productImage} alt="img"/>
                        </div>
                    
                        <div className="p-2 border bg-light" style={{height: "25%"}}>
                            <h6 className="overflow-hidden">{item.product}</h6>
                            <p className="m-0">Condition: <span>
                            {
                                (item.condition === 'Poor') ?
                                <span className="text-danger">{item.condition}</span>
                                : (item.condition === 'Fair') ?
                                <span className="text-warning">{item.condition}</span>
                                : (item.condition === 'Good') ?
                                <span className="text-info">{item.condition}</span>
                                :
                                <span className="text-primary">{item.condition}</span>
                            }
                            </span>
                            </p>
                            <p className="m-0">Zip Code: {item.location}</p>
                            <p className="m-0">Price: ${item.price}</p>
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
    </>
    )
}

export default Conversation
