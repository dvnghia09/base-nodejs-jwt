const Product = require("../models/Product")

const productController = {
    createProduct: async (req, res) => {
        req.body.images = req.files.map(el => el.path)
        Product.create(req.body, function (err, product) {
            if (err) return res.status(400).json({message: "Không thể"});
            res.status(200).json(
                {
                    status: 200,
                    error: false,
                    data: product,
                }
            );
        });
    },

    detail: async (req, res) => {
        const { slug } = req.params
        Product.findOne({ slug: slug})
            .then(product => {
                res.status(200).json({
                    status: 200,
                    error: false,
                    product
                })
            })
            .catch(error => next(error))
    },

    getAll: async (req, res) => {
        Product.find()
            .then(product => {
                res.status(200).json({
                    status: 200,
                    error: false,
                    product
                })
            })
            .catch(error => next(error))
    },

    update(req, res, next) {
        Product.updateOne( { _id: req.body.id}, req.body, function(err, product) {
            if (err) return res.status(400).json({
                status: 400,
                error: true,
                message: err
            })

            res.status(200).json(
                {
                    status: 200,
                    error: false,
                    message: "Update successful!"
                }
            );

        })
        

    },

    delete(req, res, next) {
        
        Product.findOneAndRemove({_id: req.params.id})
            .then(() => {
                res.status(200).json(
                    {
                        status: 200,
                        error: false,
                        message: "delete successful"
                    }
                );
            })
            .catch(error => next(error))
    },

    getProductByCondition: async (req, res) => {
        const queries = { ...req.query }

        // Tách các trường hợp đặc biệt
        const fieldSpecial = ['limit', 'sort', 'page', 'fields']
        fieldSpecial.forEach(el => delete queries[el])

        // search by keyword
        if (queries?.title) queries.title = { $regex: queries.title, $options: 'i' }

        let queryRun = Product.find(queries)

        // sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            queryRun.sort(sortBy)
        }
        
        // Pagination
        if (req.query.page && req.query.limit) {
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 3
            const skip = (page - 1) * limit
    
            queryRun.skip(skip).limit(limit)
        }

        // Execute
        queryRun.exec((err, response) => {
            if (err) throw new Error(err.message)
            const counts = response.length

            return res.status(200).json({
                status: 200,
                error: false,
                data: response,
                counts
            })
        })

    },

    uploadImage: async (req, res) => {
        console.log(req.files)
        return res.json('ok');
    }
}

module.exports = productController