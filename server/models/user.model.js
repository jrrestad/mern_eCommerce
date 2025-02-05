const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [2, "must be at least 2 characters"],
        required: [true, "is required"],
    },
    email: {
        type: String,
        required: [true, "is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "address is invalid"
        }
    },
    password: {
        type: String,
        required: [true, "is required"],
        minlength: [8, "must be at least 8 characters"],
        select: false,
    }
}, {timestamps: true})

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'must match password')
    }
    next();
})

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema);
module.exports = {
    User
};