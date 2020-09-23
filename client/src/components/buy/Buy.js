import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Buy = ({allProducts, setAllProducts}) => {

    // const [allProducts, setAllProducts] = useState([])

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/products/Electronics`)
    //     .then(res => {
    //         console.log(res)
    //         setAllProducts(res.data)})
    //     .catch(err => console.log(err))
    // }, [])

    return (
        <div>
            <hr/>
            <h1>See whats for sale</h1>
            <hr/>
            <div className="d-flex flex-wrap">
            {
                allProducts.map( (item, i) => 
                <div className="col-3">
                    <div className="col mb-4 border" key={i}>
                        <h5 className="bg-primary p-2 rounded text-white row">{item.createdBy}</h5>
                        <div className="p-4">

                        <h5>{item.product} <span className="text-muted font-italic">({item.category})</span></h5>
                            <h5>Condition: <span>
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
                            </h5>
                        <h5>Zip Code: {item.location}</h5>
                        <h5>Price: ${item.price}</h5>
                        <p>- {item.description}</p>
                        </div>
                    </div>
                </div>
                )
            }
            </div>
        </div>
    )
}

export default Buy
