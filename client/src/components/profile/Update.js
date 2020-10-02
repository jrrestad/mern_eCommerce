import React, { useEffect, useState } from 'react'
import { Link, navigate } from "@reach/router"
import axios from 'axios'

const Update = (props) => {
    const { id, loggedUser} = props;

    const [singleProduct, setSingleProduct] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/single/${id}/${loggedUser.username}`)
        .then(res => {
            if (res.data[0] === undefined) {
                navigate('/')
            } else {
                setSingleProduct(res.data[0])
                console.log(res.data[0])
                console.log(res.data.product)
            }
        // .catch(err => console.log(err))
        })
    }, [])

    return (
    <>
    <Link to={"/"}><div className="modal-overlay"></div></Link>
        <div className="modal-update bg-white rounded">
        <div className="FadeIn max-height bg-white">
            <h3 className="text-center py-1 m-0 bg-primary text-white" style={{height: "10%"}}>Update this product</h3>
            <p>test: {singleProduct.category}</p>
        </div>
    </div>
    </>
    )
}

export default Update
