const { Product } = require('../models/product.model');

module.exports = {
    getByCategory: (req, res) => {
        Product.find({ category: req.params.category }).sort({ createdAt: -1})
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    getByUser: (req, res) => {
        Product.find({ createdBy: { $regex: req.params.createdBy, $options: 'i'}}).sort({ createdAt: -1})
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    getByProduct: (req, res) => {
        Product.find({ product: { $regex: req.params.product, $options: 'i'}}).sort({ createdAt: -1})
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    getByPrice: (req, res) => {
        Product.find({ price: { $lte: req.params.maxPrice, $gte: req.params.minPrice }}).sort({ price: 1})
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    getOne: (req, res) => {
        Product.find({ _id: req.params.id, createdBy: req.params.createdBy})
        .then(data => res.json(data))
        .catch(err => res.json(err))
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
        Product.findOneAndDelete({ _id: req.params.id })
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
}