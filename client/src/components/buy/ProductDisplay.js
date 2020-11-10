import React from 'react'
import { navigate } from '@reach/router'

const ProductDisplay = ({allProducts}) => {
    return (
    <div className="overflow-auto flex-wrap d-flex col-lg-10 col-md-9 col-sm-8 p-lg-3 p-2" style={{height: "70vh"}}>
        {
        allProducts.map( (item, i) => 
        <div className="bg-white col-lg-3 col-md-4 col-sm-6 col-12 p-0 translucent RaiseUp" style={{width: "25%", height: "50%"}} key={i}>
            <div className="border" style={{height: "100%"}} onClick={ () => navigate(`view/${item._id}`)}>
                <div className="overflow-hidden" style={{height: "70%"}}>
                    <img className=" img-fluid" src={item.productImage} alt="img"/>
                </div>
                <div className="p-2 bg-semi-orange" style={{height: "30%"}}>
                    <h6 className="font-card text-orange">{item.product}</h6>
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
