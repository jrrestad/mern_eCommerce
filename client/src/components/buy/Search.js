import React from 'react'

const Search = ({changeHandler, submitCustomSearch}) => {

    return (
    <>
        <div className="col-2 pt-0 bg-light">
            <form onSubmit={submitCustomSearch}>
                <p className="mb-0 mt-2">Distance</p>
                    <select className=" form-control" name="distance" onChange={changeHandler}>
                        <option value="9999">Any</option>
                        <option value="2">Within 2 miles</option>
                        <option value="5">Within 5 miles</option>
                        <option value="10">Within 10 miles</option>
                        <option value="20">Within 20 miles</option>
                        <option value="50">Within 50 miles</option>
                        <option value="100">Within 100 miles</option>
                    </select>
                <p className="mb-0 mt-2">Price</p>
                <div className="input-group">
                    <input type="number" name="min" defaultValue="0" className="form-control" onChange={changeHandler}/>
                    <input type="number" name="max" defaultValue="9999" className="form-control" onChange={changeHandler}/>
                </div>
                <p className="mb-0 mt-2">Category</p>
                <select className="form-control" name="category" onChange={changeHandler}>
                    <option value="">Any</option>
                    <option value="apparel">Apparel</option>
                    <option value="appliances">Appliances</option>
                    <option value="automotive">Automotive</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                    <option value="miscellaneous">Miscellaneous</option>
                    <option value="pets">Pets</option>
                </select>
                <button className="form-control btn btn-primary m-0 mt-4">Search</button>
            </form>
        </div>
    </>
    )
}

export default Search
