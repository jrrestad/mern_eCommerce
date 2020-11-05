const userController = require('../controllers/controller');
const productController = require('../controllers/product.controller');
const conversationController = require('../controllers/conversation.controller')
const { authenticate } = require("../config/jwt.config");
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
  
    // USER ROUTES
    app.get("/api/users", authenticate, userController.getAll);
    app.get("/api/users/loggedin", authenticate, userController.getLoggedInUser);

    // CONVERSATION ROUTES
    app.get("/api/conversation/:forId", conversationController.getAllReceived);
    app.post("/api/conversation", conversationController.createConversation);
    app.patch("/api/conversation/reply/:cId", conversationController.createReply);

    // PRODUCT ROUTES
    app.get("/api/products/username/:createdBy", productController.getByUser);
    app.get("/api/product/single/:id/:createdBy", productController.getOne)
    app.post("/api/product", productController.addProduct);
    app.patch("/api/product/:id", authenticate, productController.updateProduct);
    app.delete("/api/product/:id/:createdBy", authenticate, productController.deleteProduct);

    // PRODUCT SEARCH ROUTES
    app.get("/api/products/search/:lng/:lat", productController.getFirstPopulate)
    app.get("/api/products/price/:lng/:lat/:distance/:min/:max", productController.getByPrice)
    app.get("/api/products/category/:lng/:lat/:distance/:min/:max/:category", productController.getByCategory)
    app.get("/api/products/category/custom/:lng/:lat/:distance/:min/:max/:category/:custom", productController.getByCategoryAndCustom)
    app.get("/api/products/custom/:lng/:lat/:distance/:min/:max/:custom", productController.getByCustom)

    app.post("/api/uploadmulter", upload.single('imageData'), (req, res, next) => {
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
  };

