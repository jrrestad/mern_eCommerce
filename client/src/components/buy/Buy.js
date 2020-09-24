import React from 'react'


const Buy = ({allProducts}) => {
    let URL = "http://localhost:8000/"
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
                <div className="col-3" key={i}>
                    <div className="col mb-4 border" >
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
                        <img src={URL + item.productImage} width="200" alt=""/>
                        {/* <img src="http://localhost:8000/uploads\\1600934786593KODAGOTCHI-SLEEP.png" width="200" alt=""/>
                        <img src="http://localhost:3000/5aec199a-2f90-45e5-b3a8-83443287d042" width="200" alt=""/> */}
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
