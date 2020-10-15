import React, { useState} from 'react'
import Search from "./Search"
import { navigate } from '@reach/router';

const Buy = ({allProducts, setAllProducts}) => {
    let URL = "http://localhost:8000/"

    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')

    const [searchParam2, setSearchParam2] = useState('')
    const searchHandler2 = (e) => {
        let searchValue = e.target.value;
        setSearchParam2(searchValue)
    }

    return (
        <>
        <div className="d-flex">

            <Search
                allProducts={allProducts} setAllProducts={setAllProducts}
                lat={lat} setLat={setLat} lng={lng} setLng={setLng}
            />
            <div>
            {
             !lat ?
                <div className="col-12 pt-4 pb-2 px-2 bg-light rounded position-relative">
                    <form className="">
                        <div className="input-group">
                            <input className="form-control" placeholder="Custom search..." type="text" onChange={searchHandler2}/>
                            <button className="input-group-append btn btn-primary">&#x2713;</button>
                        </div>
                    </form>
                </div>
                :''
            }
                <div className="d-flex flex-wrap bg-light pt-2">

            {
                allProducts.map( (item, i) => 
                <div className="m-2 bg-white translucent pointer" style={{width: "15rem"}} key={i}>
                    <div className="border" onClick={ () => navigate(`view/${item._id}`)}>
                        <div className="overflow-hidden" style={{height: "200px"}}>
                            <img className="img-fluid" src={URL + item.productImage} alt="img"/>
                        </div>
                        <div className="p-2 border-top">
                        <h6 className="font-card">{item.product}</h6>
                            <p className="font-card">Condition: <span>
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
                        <p className="font-card">Zip Code: {item.location}</p>
                        <p className="font-card">Price: ${item.price}</p>
                        </div>
                    </div>
                </div>
                )
            }
            </div>
        </div>
        </div>

        </>
    )
}

export default Buy
