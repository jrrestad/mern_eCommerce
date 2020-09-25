import React, { useState } from 'react'
import axios from 'axios';
import { Link } from '@reach/router'
import Modal from './Modal';
// import useModal from './useModal';



const Buy = ({allProducts, setAllProducts}) => {
    let URL = "http://localhost:8000/"

    const [countModal, setCountModal] = useState([])


    // const { isShowing, toggle } = useModal();

    // const [allProducts, setAllProducts] = useState([])

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/products/Electronics`)
    //     .then(res => {
    //         console.log(res)
    //         setAllProducts(res.data)})
    //     .catch(err => console.log(err))
    // }, [])

    const categoryHandler = (e) => {
        e.preventDefault()
        const searchParam = e.target.value;
        axios.get(`${URL}api/products/category/${searchParam}`)
        .then(res => {
            console.log(res.data)
            setAllProducts(res.data)
            // console.log(res.data.length)
            let ren = [];
            for (let i = 0; i < res.data.length; i++) {
                ren.push(false)
            }
            setCountModal(ren)
            console.log(ren)

        })
        .catch(err => console.log(err))
    }

    // const checkSearchType = (e) => {
    //     const searchType = e.target.value;
    // }
    const [searchType, setSearchType ] = useState('')
    const checkSearchType = (e) => {
        let search = e.target.value
        setSearchType(search)
    }

    const [searchBySeller, setSearchBySeller] = useState('')
    const searchHandler = (e) => {
        let typedSearch = e.target.value;
        setSearchBySeller(typedSearch)
    }

    const submitSearchBySeller = (e) => {
        e.preventDefault()
        console.log(searchBySeller)
        axios.get(`${URL}api/products/username/${searchBySeller}`)
        .then(res => {
            console.log(res.data)
            setAllProducts(res.data)
        })
        .catch(err => console.log(err))
    }
    // const [ state, setState] = useState()
    
    
    // const toggle = () => {
    //     let { toggle } = state
    //     setState({toggle: !toggle})
    // }

    // const modalToggle = (i) => {
    //     let [...isShowing] = render;
    //     isShowing[i] = !isShowing[i];
    //     setRender(isShowing)
    // }
    // const { toggle } = useModal();

    const toggleCountModal = (i) => {
        // console.log(countModal)
        let [...newCount] = countModal;
        if (newCount[i] === true) {
            newCount[i] = false
        } else {
            newCount[i] = true
        }
        // newCount[i] = !newCount[i];
        console.log(newCount)
        setCountModal(newCount)
    }
    
    return (
        <div>
            <hr/>
            <h1 className="ml-4">See whats for sale</h1>
            <div className="d-flex rounded p-2 bg-primary">
                <h6 className="text-white mt-3">Search:</h6>
            
            <div className="col-2 mt-2">
                <select className="form-control mb-2" name="searchType" id="" onChange={checkSearchType}>
                    <option value="">Search by...</option>
                    <option value="category">Category</option>
                    <option value="seller">Seller</option>
                    <option value="product">Product</option>
                </select>
            </div>

            {
            searchType === 'category' ?
            <div className="col-2 mt-2">
                <select className=" form-control" name="category" onChange={categoryHandler}>
                    <option value="">Search by category...</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Apparel">Apparel</option>
                </select>
            </div>
            : searchType === 'seller' || searchType === 'product' ?
            <div className="col-2 mt-2">
                <form onSubmit={submitSearchBySeller}>
                    <div className="input-group row">
                        <input className="form-control" placeholder="Type your search..." type="text" onChange={searchHandler}/>
                        <button className="input-group-append btn btn-success">&#x2713;</button>
                    </div>
                </form>
            </div>
            : ''
            }

        </div>

            <hr/>
            <div className="d-flex flex-wrap bg-light container-fluid" style={{minHeight: "1000px"}}>

            {
                allProducts.map( (item, i) => 
                
                <div className="col-3" key={i}>
                        <div className="App" id={i}>
                        {/* <button className="btn btn-success" onClick={toggle}>Show Modal</button> */}
                        <button className="btn btn-success" onClick={ () => toggleCountModal(i)}>Show Modal</button>
                        {
                            countModal[i] ?
                            <Modal 
                            item={item}
                            toggleCountModal={toggleCountModal}
                            id={i}
                            isShowing={countModal[i]}
                            />
                         : ''   
                        }
                        </div>
                    
                    <div className="col mb-4 border shadow" style={{maxHeight: "500px", minHeight: "500px"}}>
                        <h5 className="py-3 mb-3 d-flex justify-content-center rounded bg-primary row text-white">
                            {/* <Link to={item._id}>
                                <span className="text-white">
                                {item.createdBy}
                                </span>
                            </Link> */}
                            {item.createdBy}
                        </h5>
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
                        {/* <p>- {item.description}</p> */}
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
