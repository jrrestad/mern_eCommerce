import React, { useState } from 'react'

const AdvancedSearch = () => {

    const [checkBox, setCheckBox] = useState({
        category: false,
        seller: false,
        product: false,
        price: false,
    })

    return (
    <div className="d-flex flex-wrap">

                <input className="mx-1" type="checkbox" name="category" onChange={ () => !checkBox.category?setCheckBox({category: true}):setCheckBox({category: false})}/>
                <label className="m-0" htmlFor="checkCategory">Category</label>

                <input className="mx-1" type="checkbox" name="seller" onChange={ () => !checkBox.seller?setCheckBox({seller: true}):setCheckBox({seller: false})}/>
                <label className="m-0" htmlFor="checkSeller">Seller</label>

                <input className="mx-1" type="checkbox" name="product" onChange={ () => !checkBox.product?setCheckBox({product: true}):setCheckBox({product: false})}/>
                <label className="m-0" htmlFor="checkProduct">Product</label>

        <div className="col-2 m-2 bg-primary rounded">
            <div className="bg-white rounded m-1">
                <input className="mx-1" type="checkbox" name="price" onChange={ () => !checkBox.price?setCheckBox({price: true}):setCheckBox({price: false})}/>
                <label className="m-0" htmlFor="checkPrice">Price</label>
            </div>
        </div>

    </div>
    )
}

export default AdvancedSearch
