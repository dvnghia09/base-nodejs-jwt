const { response } = require("express");
const Coupon = require("../models/Coupon")

const couponController = {
    create: async (req, res) => {
        const { name, discount, expiry, code } = req.body

        if (!name || !discount || !expiry || !code) throw new Error('Missing inputs')
        const response = await Coupon.create(req.body)
        return res.json({
            success: response ? true : false,
            createdCoupon: response ? response : "Can't create new coupon!"
        })
    },

    getAll: async (req, res) => {
        const response = await Coupon.find()

        if (!response) {
            return res.status(400).json(
                {
                    status: 400,
                    error: true,
                    message: "Can not get all coupon",
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

    // delete: async (req, res) => {
    //     const response = Category.findOneAndRemove({_id: req.params.id})

    //     if (!response) {
    //         return res.status(400).json(
    //             {
    //                 status: 400,
    //                 error: true,
    //                 message: "Can not delete category",
    //             }
    //         ); 
    //     }

    //     res.status(200).json(
    //         {
    //             status: 200,
    //             error: false,
    //             message: "Delete category successful!",
    //         }
    //     );
    // },

    // update: async (req, res) => {
    //     const response = await Category.updateOne( { _id: req.body.id}, req.body, { upsert: true } )

    //     if (!response) {
    //         return res.status(400).json(
    //             {
    //                 status: 400,
    //                 error: true,
    //                 message: "Can not update category",
    //             }
    //         ); 
    //     }

    //     res.status(200).json(
    //         {
    //             status: 200,
    //             error: false,
    //             message: "Update category successful!",
    //         }
    //     );
    // }

}

module.exports = couponController