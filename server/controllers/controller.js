const { User } = require('../models/user.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register: (req, res) => {
        User.create(req.body)
        .then(user => {
            const usertoken = jwt.sign({id: user._id}, process.env.JWT_SECRET); 
            res.cookie("usertoken", usertoken, secret, { httpOnly: true })
            .json({msg: "Success!", user: user})
        })
        .catch(err => res.json(err))
    },
    // register: (req, res) => {
    //     User.create(req.body)
    //       .then(user => {
    //           res.json({ msg: "success!", user: user });
    //       })
    //       .catch(err => res.json(err));
    //   },

    login: (req, res) => {
        User.findOne({ email: req.body.email })
          .then((user) => {
            if (user === null) {
              res.status(400).json({ msg: "Invalid login attempt" });
            } else {
              bcrypt.compare(req.body.password, user.password)
                .then((passwordIsValid) => {
                  if (passwordIsValid) {

                    const usertoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                    res.cookie("usertoken", usertoken, { httponly: true  });
                    res.json({ usertoken })

                    // res.cookie("usertoken", jwt.sign({ _id: user._id }, process.env.JWT_SECRET), {
                    //       httpOnly: true,})
                    //   .json({ msg: "success!" });
                  } else {
                    res.status(400).json({ msg: "Invalid login attempt" });
                  }
                })
                .catch((err) => res.status(400).json(err));
            }
        })
        .catch((err) => res.json(err));
    },
    login2: async(req, res) => {
        const user = await User.findOne({ email: req.body.email })
        if (user === null) {
            return res.sendStatus(400);
        } 
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        
        if (!correctPassword) {
            return res.sendStatus(400);
        }
        
        // res.cookie("usertoken", jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
        // {
            //     httpOnly: true
            // })
            // res.json({msg:"success!"})
            
            const usertoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            
            res.cookie("usertoken", usertoken, { httponly: true  });
            
            res.json({ usertoken })
        },

    logout: (req, res) => {
    res.cookie("usertoken", jwt.sign({ _id: "" }, process.env.JWT_SECRET), {
        httpOnly: true,
        maxAge: 0,
        })
        .json({ msg: "ok" });
    },

    logout2: (req, res) => {
    res.clearCookie("usertoken");
    res.json({ msg: "usertoken cookie cleared" });
    },

    getLoggedInUser: (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        // from payload._id to payload.id
    User.findById(decodedJWT.payload.id)
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    },

    getAll: (req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
    },

    getOne: (req, res) => {
    User.findOne({ _id: req.params.id })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    },
};