const mongoose = require('mongoose')

const ProductSchema  = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please select a category"]
    },
    condition: {
        type: String,
        required: [true, "Please select a condition"]
    },
    product: {
        type: String,
        required: [true, "Please give your product a title"]
    },
    location: {
        type: String,
        required: [true, "Please enter a zip code"],
        validate: {
            validator: function(v) {
              return /^[0-9]{5}(?:-[0-9]{4})?$/.test(v)
            },
            message: "Please follow format 12345 or 12345-1234"
        },
    },
    coords: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: {
        type: Number,
        required: [true, "Please set a listing price"],
        min: 0
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        minlength: [10, "The description must be at least 10 characters"]
    },
    productImage: {
        type: String,
        required: [true, "Must contain an image"]
    },
    createdBy: {
        type: String,
        required: [true, "Must have a created by name"]
    },
}, {timestamps: true})

ProductSchema.index({coords: '2dsphere'});

const Product = mongoose.model("Product", ProductSchema);

module.exports = {
    Product
};