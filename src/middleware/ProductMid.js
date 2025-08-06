// const multer = require("multer");
// const upload = multer({ dest: "public/uploads/" });

// router.post("/addproduct", upload.single("image"), (req, res) => {
//   const { name, description, price, category_id, rating } = req.body;
//   const image_url = req.file ? `/uploads/${req.file.filename}` : null;
//   const create_at = new Date();
//   const updated_at = new Date();

//   Prodmodel.AddProduct(name, description, price, category_id, rating, create_at, updated_at, image_url)
//     .then((result) => res.json({ status: "added", msg: result }))
//     .catch((err) => res.status(500).json({ status: "not added", msg: err }));
// });
