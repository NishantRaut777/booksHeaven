const express = require("express");
const { getBooksByCategory, getBookById, getRecommendedBooks, getFilteredBooks, getBookFilters, getBooksByAuthor } = require("../controllers/bookController");
const router = express.Router();

router.get("/getBook", getBooksByCategory);
router.get("/getBookById/:id", getBookById);
router.get("/getRecommendedBooks", getRecommendedBooks);
router.get("/getFilterBooks", getFilteredBooks);
router.get("/getBookFilters", getBookFilters)
router.get("/getBooksByAuthor", getBooksByAuthor);

module.exports = router;