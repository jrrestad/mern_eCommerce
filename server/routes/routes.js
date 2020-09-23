const userController = require('../controllers/controller');
const productController = require('../controllers/product.controller');
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
    app.post("/api/register", userController.register);
    app.post("/api/login", userController.login);
    app.post("/api/logout", userController.logout);
  
    // this route now has to be authenticated
    app.get("/api/users", authenticate, userController.getAll);
    app.get("/api/users/loggedin", authenticate, userController.getLoggedInUser);

    app.get("/api/products/:category", productController.getByCategory);
    app.get("/api/products/:username", productController.getByUser);
    app.post("/api/product", productController.addProduct);
    app.delete("/api/product/:id", productController.deleteProduct);
  };