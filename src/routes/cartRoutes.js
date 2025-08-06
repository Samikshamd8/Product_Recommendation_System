const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartcontroll.js");

// Define cart routes
router.get("/:userId", cartController.getCart); // GET cart items by user ID
router.post("/", cartController.addToCart); // POST new cart item
router.put("/:userId/:productId", cartController.updateCart); // PUT to update quantity
router.delete("/:userId/:productId", cartController.removeFromCart); // DELETE item

module.exports = router;







// const express = require("express");
// const router = express.Router();
// const cartController = require("../controllers/cartcontroll.js");

// // GET all items in a user's cart
// router.get("/:userId", cartController.getCart);

// // POST a new item to the cart
// router.post("/", cartController.addToCart);

// // PUT to update quantity of an item
// router.put("/:userId/:productId", cartController.updateCart);

// // DELETE to remove item from cart
// router.delete("/:userId/:productId", cartController.removeFromCart);

// module.exports = router;
