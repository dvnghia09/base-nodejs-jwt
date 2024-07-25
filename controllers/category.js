const { response } = require("express");
const Category = require("../models/Category")

const categoryController = {
    create: async (req, res) => {
        Category.create(req.body, function (err, category) {
            if (err) return res.status(400).json({message: "Create category error !"});
            res.status(200).json(
                {
                    status: 200,
                    error: false,
                    data: category,
                }
            );
        });
    },

    getAll: async (req, res) => {
        const response = await Category.find()

        if (!response) {
            return res.status(400).json(
                {
                    status: 400,
                    error: true,
                    message: "Can not get all category",
                }
            );
        }

        res.status(200).json(
            {
                status: 200,
                error: false,
                data: response,
            }
        );
    },

    delete: async (req, res) => {
        const response = Category.findOneAndRemove({_id: req.params.id})

        if (!response) {
            return res.status(400).json(
                {
                    status: 400,
                    error: true,
                    message: "Can not delete category",
                }
            ); 
        }

        res.status(200).json(
            {
                status: 200,
                error: false,
                message: "Delete category successful!",
            }
        );
    },

    update: async (req, res) => {
        const response = await Category.updateOne( { _id: req.body.id}, req.body, { upsert: true } )

        if (!response) {
            return res.status(400).json(
                {
                    status: 400,
                    error: true,
                    message: "Can not update category",
                }
            ); 
        }

        res.status(200).json(
            {
                status: 200,
                error: false,
                message: "Update category successful!",
            }
        );
    }


}

module.exports = categoryController