const { Product } = require('../models/product.model');

module.exports = {
    getByUser: (req, res) => {
        Product.find({ createdBy: { $regex: req.params.createdBy, $options: 'i'}}).sort({ createdAt: -1})
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    getOne: (req, res) => {
        Product.find({ _id: req.params.id, createdBy: req.params.createdBy})
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    getFirstPopulate: (req, res) => {
        console.log(req.body)
        Product.aggregate([
            {
                $geoNear: {near: {type: 'Point', coordinates: [ parseFloat(req.params.lng), parseFloat(req.params.lat) ]},
                    distanceField: "dist.calculated",
                    maxDistance: 160934,
                    spherical: true
                }
            }
        ])
        .then(data => {res.json(data)})
        .catch(err => {res.json(err)})
    },
    getByPrice: (req, res) => {
        console.log(req.body)
        Product.aggregate([
            {
                $geoNear: {near: {type: 'Point', coordinates: [ parseFloat(req.params.lng), parseFloat(req.params.lat) ]},
                    distanceField: "dist.calculated",
                    maxDistance: parseFloat(req.params.distance),
                    spherical: true,
                    query: { price: { $lte: parseFloat(req.params.max), $gte: parseFloat(req.params.min)}}
                }
            }
        ])
        .then(data => {res.json(data)})
        .catch(err => {res.json(err)})
    },
    getByCategory: (req, res) => {
        console.log(req.body)
        Product.aggregate([
            {
                $geoNear: {near: {type: 'Point', coordinates: [ parseFloat(req.params.lng), parseFloat(req.params.lat) ]},
                    distanceField: "dist.calculated",
                    maxDistance: parseFloat(req.params.distance),
                    spherical: true,
                    query: { price: { $lte: parseFloat(req.params.max), $gte: parseFloat(req.params.min)}, 
                            category: req.params.category}
                }
            }
        ])
        .then(data => {res.json(data)})
        .catch(err => {res.json(err)})
    },
    getByCategoryAndCustom: (req, res) => {
        console.log(req.body)
        Product.aggregate([
            {
                $geoNear: {near: {type: 'Point', coordinates: [ parseFloat(req.params.lng), parseFloat(req.params.lat) ]},
                    distanceField: "dist.calculated",
                    maxDistance: parseFloat(req.params.distance),
                    spherical: true,
                    query: { price: { $lte: parseFloat(req.params.max), $gte: parseFloat(req.params.min)}, 
                            category: req.params.category, 
                            $or: [
                                { product: {$regex: req.params.custom, $options: 'i'}},
                                { condition: {$regex: req.params.custom, $options: 'i'}},
                                { description: {$regex: req.params.custom, $options: 'i'}},
                                { createdBy: {$regex: req.params.custom, $options: 'i'}},
                        ]}
                }
            }
        ])
        .then(data => {res.json(data)})
        .catch(err => {res.json(err)})
    },
    getByCustom: (req, res) => {
        console.log(req.body)
        Product.aggregate([
            {
                $geoNear: {near: {type: 'Point', coordinates: [ parseFloat(req.params.lng), parseFloat(req.params.lat) ]},
                    distanceField: "dist.calculated",
                    maxDistance: parseFloat(req.params.distance),
                    spherical: true,
                    query: { price: { $lte: parseFloat(req.params.max), $gte: parseFloat(req.params.min)}, 
                            $or: [
                                { product: {$regex: req.params.custom, $options: 'i'}},
                                { condition: {$regex: req.params.custom, $options: 'i'}},
                                { description: {$regex: req.params.custom, $options: 'i'}},
                                { createdBy: {$regex: req.params.custom, $options: 'i'}},
                ]}
                }
            }
        ])
        .then(data => {res.json(data)})
        .catch(err => {res.json(err)})
    },
    addProduct: (req, res) => {
        console.log(req.body)
        Product.create(req.body)
        .then(data => {
            console.log(data)
            res.json(data)})
        .catch(err => res.json(err))
    },
    updateProduct: (req, res) => {
        Product.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true, runValidators: true, useFindAndModify: false})
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    deleteProduct: (req, res) => {
        Product.findOneAndDelete({ _id: req.params.id, createdBy: req.params.createdBy })
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
}