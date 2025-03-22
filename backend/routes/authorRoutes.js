const express = require("express");

const router = express.Router();
const { getAuthor, getAllAuthors } = require("../controllers/authorController");

router.get("/getAllAuthors", getAllAuthors)
router.get("/getAuthor/:id", getAuthor)

module.exports = router;