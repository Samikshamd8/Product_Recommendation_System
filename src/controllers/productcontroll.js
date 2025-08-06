
const Prodmodel = require("../models/product.js");

exports.AddProduct = (req, res) => {
  const { id, name, description, price, category_id, rating } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  // Basic validation
  if (!name || !description || !price || !category_id || !rating) {
    return res.status(400).json({ status: "error", msg: "Missing required fields" });
  }

  Prodmodel.AddProduct(id, name, description, price, category_id, rating, image_url)
    .then((result) => {
      res.json({ status: "success", msg: result });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", msg: "Product not added", error: err });
    });
};

exports.DeleteProduct = (req, res) => {
  const id = req.query.id; // assuming ?id=1

  if (isNaN(id)) {
    return res.status(400).json({ status: "error", msg: "Invalid product ID" });
  }

  Prodmodel.DeleteProduct(id)
    .then(() => {
      res.json({ status: "deleted", msg: `Product with ID ${id} deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", msg: err });
    });
};

// // exports.homepage=(req,res)=>
// // {
// //     res.render("home.ejs");
// // }
// // exports.newProd=((req,res)=>
// // {
// //     res.render("add.ejs",{msg:""});
// // });

// // exports.getallProduct=(req,res)=>{
// //     let promise = Prodmodel.getallProduct();
// //     promise.then((result)=>{
// //         res.render("view.ejs",{ProductList:result});
// //     });
// //     promise.catch((err)=>{
// //         res.send(err);
// //     });
// // }



exports.ProductFinalUpdate = (req, res) => {
  const { id, name, description, price, category_id, rating } = req.body;
  const created_at = new Date();
  const updated_at = new Date();
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!id || !name) {
    return res.status(400).json({ status: "error", msg: "ID or name not provided" });
  }

  Prodmodel.updateProduct(id, name, description, price, category_id, rating, created_at, updated_at, image_url)
    .then(() => {
      res.json({ status: "updated", msg: `Product with ID ${id} updated successfully.` });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", msg: "Product not updated", error: err });
    });
};


exports.SearchbyName = (req, res) => {
  const name = req.query.name || "";
  const category = req.query.category || "";

  Prodmodel.searchbyname(name, category)
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json({ status: "error", msg: "No matching products found." });
      } else {
        res.json({ status: "success", data: result });
      }
    })
    .catch((err) => {
      console.error("Search error:", err);
      res.status(500).json({ status: "error", msg: "Something went wrong", error: err });
    });
};



// exports.SearchbyName = ((req, res) => {
//     let name = req.query.name || "";
//     let category = req.query.category || "";
//     let promise = Prodmodel.searchbyname(name, category);  //  Check this call
    
//     promise
//         .then((result) => {
//             res.json(result); // Send data as JSON for AJAX
//         })
//         .catch((err) => {
//             res.send("something went wrong");
//         });
// });

// // exports.loginpage=(req,res)=>{
// //     res.render("login.ejs");
// // }

// // exports.newloginpage=(req,res)=>{
// //     res.render("login.ejs");
// // }
// //   Prodmodel.AddProduct(name, description, price, category_id, rating, create_at, updated_at, image_url)
// //     .then(result => res.status(201).json({ status: "added", msg: result }))
// //     .catch(err => res.status(500).json({ status: "not added", msg: err }));
// // };

// exports.homepage=(req,res)=>
// {
//     res.render("home.ejs");
// }
// exports.newProd=((req,res)=>
// {
//     res.render("add.ejs",{msg:""});
// });

// exports.getallProduct=(req,res)=>{
//     let promise = Prodmodel.getallProduct();
//     promise.then((result)=>{
//         res.render("view.ejs",{ProductList:result});
//     });
//     promise.catch((err)=>{
//         res.send(err);
//     });
// }

// exports.deleteProd=(req,res)=>{
//     let id = parseInt(req.query.id); 
//     let promise=Prodmodel.deleteProd(id);
   
//     promise.then((result)=>{
//          let p = Prodmodel.getallProduct();
//          p.then((result)=>{
//             res.render("view.ejs",{ProductList:result})
//          });
//          p.catch((err)=>{
//             res.send(err);
//          });
        
//     });
// }


// exports.updateproduct = (req, res) => {
//     res.render("updatepro.ejs", {
//         id: req.query.id,
//         name: req.query.name,
//         category: req.query.category,
//         price: req.query.price,
//         quantity: req.query.quantity
//     });
// };


// exports.updateprod = (req, res) => {
//     let { id, name,category, price,quantity } = req.body;

//     Prodmodel.updatepro(id, name,category, price,quantity )
//         .then(() => {
//             return Prodmodel.getallProduct();
//         })
//         .then((productList) => {
//             res.render("view.ejs", { ProductList: productList });
//         })
//         .catch((err) => {
//             res.send("Product update failed: " + err);
//         });
// };

// exports.searchbyname = ((req, res) => {
//     let name = req.query.name || "";
//     let category = req.query.category || "";
//     let promise = Prodmodel.searchbyname(name, category);  //  Check this call
    
//     promise
//         .then((result) => {
//             res.json(result); // Send data as JSON for AJAX
//         })
//         .catch((err) => {
//             res.send("something went wrong");
//         });
// });

// exports.loginpage=(req,res)=>{
//     res.render("login.ejs");
// }

// exports.newloginpage=(req,res)=>{
//     res.render("login.ejs");
// }