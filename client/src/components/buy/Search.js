import React from 'react'

const Search = ({changeHandler, submitCustomSearch}) => {

    return (
    <>
        <div className="col-lg-2 col-md-3 col-4 pt-2 pt-0 bg-semi-teal bg-light-teal">
            <form onSubmit={submitCustomSearch}>
                <p className="mb-0 mt-2 text-light-teal font-weight-bold">Distance</p>
                    <select className="form-control text-orange" name="distance" onChange={changeHandler}>
                        <option value="9999">Any</option>
                        <option value="2">Within 2 miles</option>
                        <option value="5">Within 5 miles</option>
                        <option value="10">Within 10 miles</option>
                        <option value="20">Within 20 miles</option>
                        <option value="50">Within 50 miles</option>
                        <option value="100">Within 100 miles</option>
                    </select>
                <p className="mb-0 mt-2 text-light-teal font-weight-bold">Price</p>
                <div className="input-group">
                    <input type="number" name="min" defaultValue="0" className="form-control text-orange" onChange={changeHandler}/>
                    <input type="number" name="max" defaultValue="9999" className="form-control text-oranger" onChange={changeHandler}/>
                </div>
                <p className="mb-0 mt-2 text-light-teal font-weight-bold">Category</p>
                <select className="form-control text-orange" name="category" onChange={changeHandler}>
                    <option value="">Any</option>
                    <option value="apparel">Apparel</option>
                    <option value="appliances">Appliances</option>
                    <option value="automotive">Automotive</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                    <option value="miscellaneous">Miscellaneous</option>
                    <option value="pets">Pets</option>
                </select>
                <button className="form-control btn bg-teal text-white m-0 mt-4">Search</button>
            </form>
        </div>
    </>
    )
}

export default Search
