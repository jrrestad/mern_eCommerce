const { Product } = require('../models/product.model');

module.exports = {
    getByCategory: (req, res) => {
        Product.find({ category: req.params.category })
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    getByUser: (req, res) => {
        Product.find({ createdBy: req.params.createdBy })
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    addProduct: (req, res) => {
        Product.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    deleteProduct: (req, res) => {
        Product.findOneAndDelete({ _id: req.params.id })
        .then(data => res.json(data))
        .catch(err => res.json(err))
    }
}