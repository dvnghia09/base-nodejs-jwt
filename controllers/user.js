const User = require("../models/User")

const userController = {
    // Get all
    getAll: async (req, res) => {
        try {
            const users = await User.find({});
    
            res.status(200).json(users);
            
        } catch (error) {
            res.status(500).json(error);
        }
    },

    handleCart: async (req, res) => {
        const id_user = req.user.id
        const { id_product, quantity, color } = req.body
        if (!id_product || !quantity || !color) throw new Error('Mising inputs')
        const { cart } = await User.findById(id_user)
        const alreadyProduct = cart.find(el => el.product.toString() === id_product && el.color == color)
        
        // console.log(alreadyProduct)
        if (alreadyProduct) {
            // if (alreadyProduct.color == color) {
                const response = await User.updateOne({cart: {$elemMatch: alreadyProduct}}, { $set: {"cart.$.quantity": `${Number(quantity) + Number(alreadyProduct.quantity)}`}}, { new: true } )
                return res.status(200).json({
                    success: response ? true : false,
                    updatedUser: response ? response : 'Some thing went wrong'
                })
            // } else {
            //     const response = await User.findByIdAndUpdate(id_user, {$push: { cart: { product: id_product, quantity, color } } }, { new: true } )
            //     return res.status(200).json({
            //         success: response ? true : false,
            //         updatedUser: response ? response : 'Some thing went wrong'
            //     })
            // }
        } else {
            const response = await User.findByIdAndUpdate(id_user, {$push: { cart: { product: id_product, quantity, color } } }, { new: true } )
            return res.status(200).json({
                success: response ? true : false,
                updatedUser: response ? response : 'Some thing went wrong'
            })
        }
    }
}

module.exports = userController