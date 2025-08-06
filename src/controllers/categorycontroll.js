
let Catemodel = require("../models/Category.js");

exports.AddCategory = ((req,res)=>{     
    let {name} = req.body;
    let promise = Catemodel.AddCategory(name);
    promise.then((result)=>{
        res.json({status:"add successfully",msg:result});
    }).catch((err)=>{
          res.json({status:"not added",msg:err});
    });
 });
 

exports.DeleteCategory = (req, res) => {
  const id = parseInt(req.query.id); // assuming ?id=1

  if (isNaN(id)) {
    return res.status(400).json({ status: "error", msg: "Invalid category ID" });
  }

  Catemodel.DeleteCategory(id)
    .then(() => {
      res.json({ status: "deleted", msg: `Category with ID ${id} deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", msg: err });
    });
};
exports.CategoryFinalUpdate = (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ status: "error", msg: "ID or name not provided" });
  }

  Catemodel.updateCategory(id, name)
    .then(() => {
      res.json({ status: "updated", msg: `Category with ID ${id} updated successfully.` });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", msg: "Category not updated", error: err });
    });
};
//  exports.getAllDept=(req,res)=>{
//     let promise=deptmodel.getAllDept();
//     promise.then((result)=>{
//      //   res.json(result);  //as we want all deta in json formate
//      //we want data in ajax formate 
//      res.render("viewdept.ejs",{deptList:result});  //gives result array
//     });
//     promise.catch((err)=>{
//         res.send(err);
//     });
// }