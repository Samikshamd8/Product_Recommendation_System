const db = require("../../db.js");

exports.AddProduct = (id, name, description, price, category_id, rating, image_url) => {
  return new Promise((resolve, reject) => {
    const created_at = new Date();
    const updated_at = new Date();

    // Build SQL and values based on whether ID is provided
    let sql, values;

    if (id) {
      sql = `
        INSERT INTO product
        (id, name, description, price, category_id, rating, created_at, updated_at, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      values = [id, name, description, price, category_id, rating, created_at, updated_at, image_url];
    } else {
      sql = `
        INSERT INTO product
        (name, description, price, category_id, rating, created_at, updated_at, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      values = [name, description, price, category_id, rating, created_at, updated_at, image_url];
    }

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("AddProduct DB Error:", err);
        reject(err.sqlMessage || err.message || "Product not saved");
      } else {
        resolve("Product saved successfully");
      }
    });
  });
};



exports.DeleteProduct=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("delete from product where id=?",[id],(err,result)=>{
            if(err)
            {
                reject("Error");
            }
            else
            {
                resolve("Product deleted Successfully");
            }
        });
    });
}

exports.updateProduct = (id, name, description, price, category_id, rating, created_at, updated_at, image_url) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE product 
      SET name = ?, description = ?, price = ?, category_id = ?, rating = ?, created_at = ?, updated_at = ?, image_url = ?
      WHERE id = ?
    `;

    const values = [name, description, price, category_id, rating, created_at, updated_at, image_url, id];

    db.query(sql, values, (err, result) => {
      if (err) {
        reject("Database error");
      } else if (result.affectedRows === 0) {
        reject("No product found with that ID");
      } else {
        resolve("Product updated successfully");
      }
    });
  });
};

exports.searchbyname = (name, category) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT p.*, c.name AS category_name
      FROM product p
      JOIN category c ON p.category_id = c.id
      WHERE 1 = 1
    `;
    const values = [];

    if (name) {
      sql += " AND p.name LIKE ?";
      values.push(`%${name}%`);
    }

    if (category) {
      sql += " AND c.name LIKE ?";
      values.push(`%${category}%`);
    }

    db.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

//  exports.searchbyname = (name, category) => {
//     return new Promise((resolve, reject) => {
//         let sql = "SELECT * FROM product WHERE name LIKE ? OR category LIKE ?";
//         let values = ['%' + name + '%', '%' + category + '%'];

//         db.query(sql, values, (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// };