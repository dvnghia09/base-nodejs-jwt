const Order = require("../models/Order")
const User = require("../models/User")
const Coupon = require("../models/Coupon")

const orderController = {
    // Get all
    createOrder: async (req, res) => {
        const { id } = req.user
        const { coupon, phone, address } = req.body
        const user = await User.findById(id).select('cart').populate('cart.product', 'title price')

        const products = user?.cart.map(el => {
            return {
                product: el.product._id,
                count: el.quantity,
                color: el.color
            }
        })

        let totalPrice =  user?.cart.reduce((sum, el) => el.product.price * el.quantity + sum, 0)
        if (coupon) {
            const sale = await Coupon.findOne({code: coupon})
            totalPrice =  Math.round(totalPrice - totalPrice * (sale.discount / 100))
        }

        const response = await Order.create({
            product: products, 
            totalPrice,
            user: id,
            phone,
            address,
        })

        return res.status(200).json({
            status: 200,
            error: false,
            data: response
        })
    },

    updateStatus: async (req, res) => {
        try {
            const { id } = req.params
            const { status } = req.body
            if (!status) throw new Error('Missing status')
            const response = await Order.findByIdAndUpdate(id, {status}, { new: true })

            return res.status(200).json({
                status: 200,
                error: false,
                data: response
            })

        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAll: async (req, res) => {
        try {
            const response = await Order.find()

            return res.status(200).json({
                status: 200,
                error: false,
                data: response
            })

        } catch (error) {
            res.status(500).json(error);
        }
    },

    getByUser: async (req, res) => {
        try {
            const id = req.params.id
            const response = await Order.find({user: id})

            return res.status(200).json({
                status: 200,
                error: false,
                data: response
            })

        } catch (error) {
            res.status(500).json(error);
        }
    },

}

module.exports = orderController