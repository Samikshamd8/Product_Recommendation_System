let db = require("../../db.js");

exports.AddCategory = (name)=>{
    return new Promise((resolve,reject)=>
    {
        console.log(name);
        db.query("insert into category values('0',?)",[name],(err,result)=>{
            if(err){
                reject("Category not saved");
            }
            else
              {resolve("Category saved Successfully...");}  
        });
    });
}


exports.DeleteCategory=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("delete from category where id=?",[id],(err,result)=>{
            if(err)
            {
                reject("Error");
            }
            else
            {
                resolve("Category deleted Successfully");
            }
        });
    });
}
exports.updateCategory = (id, name) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE category SET name = ? WHERE id = ?", [name, id], (err, result) => {
      if (err) {
        reject("Database error");
      } else if (result.affectedRows === 0) {
        reject("No category found with that ID");
      } else {
        resolve("Category updated successfully");
      }
    });
  });
};



// exports.searchbyname = (name, category) => {
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