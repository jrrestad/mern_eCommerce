const userController = require('../controllers/controller');
const productController = require('../controllers/product.controller');
const { authenticate } = require("../config/jwt.config");
// const imageController = require('../controllers/image.controller');
const { Image } = require('../models/image.model')



const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
  });


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
  }

  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

module.exports = app => {
    app.post("/api/register", userController.register);
    app.post("/api/login", userController.login);
    app.post("/api/logout", userController.logout);
    app.post("/api/logout2", userController.logout2);
  
    // this route now has to be authenticated
    app.get("/api/users", authenticate, userController.getAll);
    app.get("/api/users/loggedin", authenticate, userController.getLoggedInUser);

    app.get("/api/products/category/:category", productController.getByCategory);
    app.get("/api/products/username/:createdBy", productController.getByUser);
    // app.get("/api/products/:userID", productController.getUserProducts);
    app.post("/api/product", productController.addProduct);
    // app.post("/api/product/image", upload.single("imageData"), productController.multiPart);
    app.delete("/api/product/:id", productController.deleteProduct);

    // app.post("/uploadmulter", upload.uploadOne);
    app.post("/uploadmulter", upload.single('imageData'), (req, res, next) => {
      console.log(req.body);
      const newImage = new Image({
          imageName: req.body.imageName,
          imageData: req.file.path
      })
      newImage.save()
          .then((result) => {
              console.log(result);
              res.status(200).json({
                  success: true,
                  document: result
              });
          })
          .catch((err) => next(err));
  });
//     app.post("/uploadmulter", upload.single('imageData'), (req, res, next) => {
//       console.log(req.body);
//       const newImage = new Image({
//           imageName: req.body.imageName,
//           imageData: req.file.path
//       })
//       newImage.save()
//           .then((result) => {
//               console.log(result);
//               res.status(200).json({
//                   success: true,
//                   document: result
//               });
//           })
//           .catch((err) => next(err));
//   });
  };

