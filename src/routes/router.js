const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categorycontroll');

const userController = require('../controllers/usercontroll');

router.get("/", (req, res) => {
  res.render("index"); // looks for views/index.ejs
});

// router.post('/register', userController.register);
// router.post('/login', userController.login);

router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

// Handle form submissions
router.post('/register', userController.register);
router.post('/login', userController.login);

router.post('/addcategory', categoryController.AddCategory);

router.get('/delcategory', categoryController.DeleteCategory);

router.post("/updatecategory", categoryController.CategoryFinalUpdate);

//product rouster

const productController = require("../controllers/productcontroll");

// If you're using multer for image upload
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post('/addproduct', upload.single('image'), productController.AddProduct);
router.get('/delproduct', productController.DeleteProduct);
router.post("/updateproduct", productController.ProductFinalUpdate);
router.get('/searchproduct', productController.SearchbyName);


// const cartController = require("../controllers/cartcontroll.js");

// // No authentication middleware used

// router.get("/:userId", cartController.getCart);
// router.post("/", cartController.addToCart);
// router.put("/:userId/:productId", cartController.updateCart);
// router.delete("/:userId/:productId", cartController.removeFromCart);


module.exports = router;
