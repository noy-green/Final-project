const router = require('express').Router()
const Product = require('../models/product')
const Order = require('../models/order')
const Category = require('../models/category')

router.get('/products_by_category/:category_id', async (req, res) => {
    if (req.params.category_id) {
        try {
            const result = await Product.find({ category_id: req.params.category_id })
            console.log(result)
            res.json(result)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})

router.get('/category/all', async (req, res) => {
    console.log("hiii")
    try {
        const result = await Category.find({})
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/search_product/:text', async (req, res) => {
    if (req.params.text) {
        try {
            const result = await Product.find({ "name": { "$regex": req.params.text, "$options": "i" } })
            res.json(result)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})


router.get('/products/count', async (req, res) => {
    console.log("hiii")
    try {
        const result = await Product.count({})
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})



router.get('/count_by_date/:deliveryDate', async (req, res) => {
    const delivery_date = req.params.deliveryDate
    try {
        const result = await Order.find({ delivery_date })
        if (result.length < 3) {
            res.status(200).json({ error: false, msg: true })
        } else {
            res.status(200).json({ error: false, msg: false })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


router.get('/products/all', async (req, res) => {
    console.log("hiii")
    try {
        const result = await Product.find({})
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


router.get('/orders/all', async (req, res) => {
    console.log("hiii")
    try {
        const result = await Order.count({})
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


// router.get('/all_orders/all', async (req, res) => {
//     console.log("hiii")
//     try {
//         const result = await Order.find({})
//         console.log(result)
//         res.json(result)
//     } catch (err) {
//         console.log(err)
//         res.status(500).json(err)
//     }
// })







module.exports = router