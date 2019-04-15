const express = require("express");
const router = express.Router();
const Book = require("../models/book");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//Get books page
router.get("/books", (req, res) => {
  Book.find({})
    .then(books => {
      res.render("books", { books });
      console.log(books);
    })
    .catch(err => {
      console.err(err);
    });
});

//Add a book
router.get("/books/add", (req, res) => {
  res.render("book-add");
});

router.post("/books/add", (req, res) => {
  const { title, author, description, rating } = req.body;
  Book.create({ title, author, description, rating })
    .then(() => {
      console.log("Book successfully created");
      res.redirect("/books");
    })
    .catch(err => {
      console.error(`Error while creating a book`, err);
    });
});

//Get book details
router.get("/books/:bookId", (req, res) => {
  const _id = req.params.bookId;
  Book.findOne({ _id })
    .then(book => {
      res.render("book-detail", { book });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
