const { validationResult } = require("express-validator");
const ItemPost = require("../models/item");

exports.createItemPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Input Value Tidak sesuai!!!");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const nama_item = req.body.nama_item;
  const total_stok = req.body.total_stok;

  const Upload = new ItemPost({
    nama_item,
    total_stok,
  });

  Upload.save()
    .then((result) => {
      res.status(201).json({
        message: "Create Item Success",
        data: result,
      });
    })
    .catch((err) => console.log("error: ", err));
};

exports.getAllItem = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;
  ItemPost.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return ItemPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        message: "Data Item berhasil Dipanggil",
        data: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      });
    })
    .catch((err) => next(err));
};
