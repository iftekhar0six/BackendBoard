const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.post("/create-category", categoryController.createCategory);
router.get("/search-category/:id", categoryController.findCategory);
router.get("/search-category", categoryController.categoryList);
router.put("/update-category/:id", categoryController.updateCategory);
router.delete("/delete-category/:id", categoryController.deleteCategory);

module.exports = router;
