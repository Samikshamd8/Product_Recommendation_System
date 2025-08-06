const CartItem = require("../models/cart_items.js");

const cartController = {
  getCart(req, res) {
    const userId = req.params.userId;

    CartItem.getByUser(userId)
      .then(items => res.json({ status: "success", data: items }))
      .catch(err => {
        console.error(err);
        res.status(500).json({ status: "error", msg: "Could not fetch cart" });
      });
  },

  addToCart(req, res) {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ status: "error", msg: "Missing fields" });
    }

    CartItem.addOrUpdate(userId, productId, quantity)
      .then(msg => res.json({ status: "success", msg }))
      .catch(err => {
        console.error(err);
        res.status(500).json({ status: "error", msg: "Failed to add to cart" });
      });
  },

  updateCart(req, res) {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    CartItem.updateQuantity(userId, productId, quantity)
      .then(msg => res.json({ status: "success", msg }))
      .catch(err => {
        console.error(err);
        res.status(500).json({ status: "error", msg: "Failed to update quantity" });
      });
  },

  removeFromCart(req, res) {
    const { userId, productId } = req.params;

    CartItem.remove(userId, productId)
      .then(msg => res.json({ status: "success", msg }))
      .catch(err => {
        console.error(err);
        res.status(500).json({ status: "error", msg: "Failed to remove item" });
      });
  }
};

module.exports = cartController;



// const CartItem = require("../models/cart_items.js");

// const CartControll = {
//   // GET /api/cart/:userId
//   async getCart(req, res) {
//     const userId = req.params.userId;
//     try {
//       const items = await CartItem.getByUser(userId);
//       res.json({ status: "success", data: items });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ status: "error", msg: "Could not fetch cart" });
//     }
//   },

//   // POST /api/cart
//   async addToCart(req, res) {
//     const { userId, productId, quantity } = req.body;
//     if (!userId || !productId || !quantity) {
//       return res.status(400).json({ status: "error", msg: "Missing fields" });
//     }
//     try {
//       await CartItem.addOrUpdate(userId, productId, quantity);
//       res.json({ status: "success", msg: "Item added/updated" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ status: "error", msg: "Failed to add to cart" });
//     }
//   },

//   // PUT /api/cart/:userId/:productId
//   async updateCart(req, res) {
//     const { userId, productId } = req.params;
//     const { quantity } = req.body;
//     try {
//       await CartItem.updateQuantity(userId, productId, quantity);
//       res.json({ status: "success", msg: "Quantity updated" });
//     } catch (err) {
//       res.status(500).json({ status: "error", msg: "Failed to update quantity" });
//     }
//   },

//   // DELETE /api/cart/:userId/:productId
//   async removeFromCart(req, res) {
//     const { userId, productId } = req.params;
//     try {
//       await CartItem.remove(userId, productId);
//       res.json({ status: "success", msg: "Item removed" });
//     } catch (err) {
//       res.status(500).json({ status: "error", msg: "Failed to remove item" });
//     }
//   }
// };

// module.exports = cartcontroll;











// // const CartItem = require('../models/cart_items.js');

// // const cartcontroll = {
// //   getCartItemCount(req, res) {
// //     const userId = req.params.id; // from the URL /cart_items/:id/count

// //     CartItem.getCartCount(userId)
// //       .then(count => {
// //         res.status(200).json({ count });
// //       })
// //       .catch(err => {
// //         console.error('Error getting cart count:', err);
// //         res.status(500).json({ error: 'Failed to get cart count' });
// //       });
// //   }
// // };

// // module.exports = cartcontroll;
