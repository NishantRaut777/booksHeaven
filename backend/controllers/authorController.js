const authorModel = require("../models/author");
const { ObjectId } = require("mongodb");

const getAllAuthors = async(req, res) => {
    try {
        const authors = await authorModel.find({});

        return res.status(200).send({
            authors,
            message: "All Authors fetched Successfully",
            success: true,
          });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: `Get All Authors Controller ERROR ${error}`,
            success: false
        })
    }
}

const getAuthor = async(req, res) => {
    try {
        const authorid = req.params.id;

        const author = await authorModel.findOne({ _id:  new ObjectId(authorid)});

        return res.status(200).send({
            author,
            message: "Author fetched Successfully",
            success: true,
          });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: `Get Author Controller ERROR ${error}`,
            success: false
        })
    }
}

module.exports = { getAllAuthors, getAuthor };