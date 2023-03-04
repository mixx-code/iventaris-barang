const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const itemController = require("../controllers/item");
//POST: /v1/item/post
router.post(
  "/post",
  [
    body("nama_item")
      .isLength({ min: 1 })
      .withMessage("input nama item tidak sesuai"),
    body("total_stok")
      .isNumeric()
      .isLength({ min: 1 })
      .withMessage("input total stok tidak sesuai"),
  ],
  itemController.createItemPost
);

//GET: /v1/item/posts
router.get("/posts", itemController.getAllItem);

module.exports = router;
