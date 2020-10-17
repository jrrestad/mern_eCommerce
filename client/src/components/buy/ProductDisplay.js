import React from 'react'
import { navigate } from '@reach/router'

const ProductDisplay = ({allProducts}) => {
    let URL = "http://localhost:8000/"

    return (
    <div className="d-flex flex-wrap bg-light pt-2">
        {
        allProducts.map( (item, i) => 
        <div className="m-2 bg-white translucent RaiseUp" style={{width: "15rem"}} key={i}>
            <div className="border" onClick={ () => navigate(`view/${item._id}`)}>
                <div className="overflow-hidden" style={{height: "200px"}}>
                    <img className="img-fluid" src={URL + item.productImage} alt="img"/>
                </div>
                <div className="p-2 border-top">
                    <h6 className="font-card">{item.product}</h6>
                    <p className="font-card">Condition: <span>
                    {
                        (item.condition === 'poor') ?
                        <span className="text-danger">{item.condition[0].toUpperCase() + item.condition.slice(1)}</span>
                        : (item.condition === 'fair') ?
                        <span className="text-warning">{item.condition[0].toUpperCase() + item.condition.slice(1)}</span>
                        : (item.condition === 'good') ?
                        <span className="text-info">{item.condition[0].toUpperCase() + item.condition.slice(1)}</span>
                        : (item.condition === 'excellent') ?
                        <span className="text-primary">{item.condition[0].toUpperCase() + item.condition.slice(1)}</span>
                        :
                        <span className="text-success">{item.condition[0].toUpperCase() + item.condition.slice(1)}</span>

                    }
                    </span>
                    </p>
                    <p className="font-card">Zip Code: {item.location}</p>
                    <p className="font-card">Price: ${item.price}</p>
                </div>
            </div>
        </div>
        )
        }
    </div>
    )
}

export default ProductDisplay
