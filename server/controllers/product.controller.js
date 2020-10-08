const { Product } = require('../models/product.model');
// const { Image } = require('../models/image.model')

// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname);
//     }
//   });


// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         // rejects storing a file
//         cb(null, false);
//     }
//   }

//   const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
//   });

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
    // multiPart: (req, res) => {
    //     Product.create(req.body)
    //     .then(data => {
    //         console.log(req.file)
    //         console.log(req.body)
    //         res.json(data)})
    //     .catch(err => res.json(err))
    // }
}