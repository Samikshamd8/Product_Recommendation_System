const db = require('../../db.js');

const CartItem = {
  getByUser(userId) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM cart_items WHERE user_id = ?',
        [userId],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  addOrUpdate(userId, productId, quantity) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?',
        [userId, productId],
        (err, results) => {
          if (err) return reject(err);

          if (results.length > 0) {
            // Update quantity
            db.query(
              'UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
              [quantity, userId, productId],
              (err) => {
                if (err) return reject(err);
                resolve("Quantity updated");
              }
            );
          } else {
            // Insert new
            db.query(
              'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
              [userId, productId, quantity],
              (err) => {
                if (err) return reject(err);
                resolve("Item added");
              }
            );
          }
        }
      );
    });
  },

  updateQuantity(userId, productId, quantity) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?',
        [quantity, userId, productId],
        (err) => {
          if (err) return reject(err);
          resolve("Quantity updated");
        }
      );
    });
  },

  remove(userId, productId) {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM cart_items WHERE user_id = ? AND product_id = ?',
        [userId, productId],
        (err) => {
          if (err) return reject(err);
          resolve("Item removed");
        }
      );
    });
  }
};

module.exports = CartItem;



// const db = require('../../db.js');

// const CartItem = {
//   // Get all items in user's cart
//   async getByUser(userId) {
//     const [rows] = await db.promise().query(
//       `SELECT ci.*, p.name, p.price, p.image_url 
//        FROM cart_items ci
//        JOIN product p ON ci.product_id = p.id
//        WHERE ci.user_id = ?`,
//       [userId]
//     );
//     return rows;
//   },

//   // Add or update cart item
  // async addOrUpdate(userId, productId, quantity) {
//     const [existing] = await db.promise().query(
//       `SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?`,
//       [userId, productId]
//     );

//     if (existing.length > 0) {
//       return db.promise().query(
//         `UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?`,
//         [quantity, userId, productId]
//       );
//     } else {
//       return db.promise().query(
//         `INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)`,
//         [userId, productId, quantity]
//       );
//     }
//   },

//   // Update quantity
//   async updateQuantity(userId, productId, quantity) {
//     return db.promise().query(
//       `UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?`,
//       [quantity, userId, productId]
//     );
//   },

//   // Remove item
//   async remove(userId, productId) {
//     return db.promise().query(
//       `DELETE FROM cart_items WHERE user_id = ? AND product_id = ?`,
//       [userId, productId]
//     );
//   }
// };

// module.exports = CartItem;


// // const db = require('../../db.js');

// // const CartItem = {
// //   async addItem(userId, productId, quantity) {
// //     await db.promise().query(
// //       'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
// //       [userId, productId, quantity]
// //     );
// //   },

// //   // existing method
// //   async getCartCount(id) {
// //     const [rows] = await db.promise().query(
// //       'SELECT SUM(quantity) AS count FROM cart_items WHERE user_id = ?',
// //       [id]
// //     );
// //     return rows[0].count || 0;
// //   }
// // };

// // module.exports = CartItem;





// // // const db = require('../../db.js'); // or correct path to db.js

// // // const CartItem = {
// // //   getCartCount(id) {
// // //     return db.query(
// // //       'SELECT SUM(quantity) AS count FROM cart_items WHERE user_id = ?',
// // //       [id]
// // //     ).then(([rows]) => rows[0].count || 0);
// // //   }
// // // };


// // // module.exports = CartItem;
