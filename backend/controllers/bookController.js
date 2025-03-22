const bookModel = require("../models/book");

const { ObjectId } = require("mongodb");

const getBooksByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const decodedCategory = decodeURIComponent(category)

    const books = await bookModel.find({ categories: { $in: category } });

    return res.status(200).send({
      books,
      message: "Books fetched Successfully",
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Get Book By Category Controller Error : ${error.message}`,
      success: false,
    });
  }
};

const getBookById = async(req, res) => {
    try {
        const id = req.params.id;

        const book = await bookModel.findById(id);

        return res.status(200).send({
            book,
            message: "Book fetched Successfully",
            success: true,
          });

    } catch (error) {
        console.log(error);
    return res.status(500).send({
      message: `Get Book By Id Controller Error : ${error.message}`,
      success: false,
    });
    }
}

const getRecommendedBooks = async(req, res) => {
    try {
        const { category, id } = req.query;
        // console.log(category, id);

        const categories = Array.isArray(category) ? category : category.split(',');

        let books;

        books = await bookModel.find({ categories: { $in: categories }, _id: { $ne: new ObjectId(id) } });
        // console.log(books);

        if( books.length == 0){
          books = await bookModel.find({ categories: { $in: ["Trending"] }, _id: { $ne: new ObjectId(id) } });
        }

        return res.status(200).send({
            books,
            message: "Book fetched Successfully",
            success: true,
          });


    } catch (error) {
        console.log(error);
        return res.status(500).send({
          message: `Get Recommended books Controller Error : ${error.message}`,
          success: false,
        });
    }
}

const getFilteredBooks = async(req, res) => {
  try {
    const { categories, authors, priceRange, searchTerm } = req.query;

    let query = {};

    if (categories){
      let categoryRegex = categories.split(",").map(category => new RegExp(category, 'i'));
      query.categories = { $in: categoryRegex };
    }

    if(authors){
      let authorRegex = authors.split(",").map(author => new RegExp(author, 'i'));
      query.author = { $in: authorRegex };
    }

    if(priceRange){
      const [minPrice, maxPrice] = priceRange.split(",").map(Number);
      query.discountedPrice = { $gte: minPrice, $lte: maxPrice };
    }

    if(searchTerm){
      query.name = new RegExp(searchTerm, "i");
    }

    const books = await bookModel.find(query);

    return res.status(200).send({
      books,
      message: "Filtered Books fetched Successfully",
      success: true,
    });

  } catch (error) {
    console.log(error);
        return res.status(500).send({
          message: `Get Book By Name Controller Error : ${error.message}`,
          success: false,
        });
  }
}

const getBookFilters = async(req, res) => {
  try {
    const categories = await bookModel.distinct("categories");
    const authors = await bookModel.distinct("author");
    const minPrice = await bookModel.find().sort({ discountedPrice: 1 }).limit(1);
    const maxPrice = await bookModel.find().sort({ discountedPrice: -1 }).limit(1);

    return res.status(200).send({
      categories,
      authors,
      price: [minPrice[0]?.discountedPrice || 0, maxPrice[0]?.discountedPrice || 0]
    });


  } catch (error) {
    console.log(error);
        return res.status(500).send({
          message: `Get Book Filters Error : ${error.message}`,
          success: false,
        });
  }
}

const getBooksByAuthor = async(req, res) => {
  try {
    const { author } = req.query;
    const decodedAuthor = decodeURIComponent(author)

    const books = await bookModel.find({ author: decodedAuthor });

    return res.status(200).send({
      books
    });


  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Get Books By Author Error : ${error.message}`,
      success: false,
    });
  }
}

module.exports = { getBooksByCategory, getBookById, getRecommendedBooks, getFilteredBooks, getBookFilters, getBooksByAuthor };
