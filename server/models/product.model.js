const mongoose = require('mongoose')

const ProductSchema  = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "is required"]
    },
    condition: {
        type: String,
        required: [true, "is required"]
    },
    product: {
        type: String,
        required: [true, "is required"],
        minlength: [3, "must be at least 3 characters"]
    },
    location: {
        type: String,
        required: [true, "is required"],
        validate: {
            validator: function(v) {
              return /^[0-9]{5}(?:-[0-9]{4})?$/.test(v)
            },
            message: "must follow format 12345 or 12345-1234"
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
        required: [true, "is required"],
        min: 0
    },
    description: {
        type: String,
        required: [true, "is required"],
        minlength: [10, "must be at least 10 characters"]
    },
    productImage: {
        type: String,
        required: [true, "is required"]
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