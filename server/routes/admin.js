const router = require('express').Router()
const Product = require('../models/product')
const Category = require('../models/category')
const { verifyAdmin } = require('../verify')

router.post('/add_product', verifyAdmin , async (req, res) => {
    const { name, category_id, price, imagePath, description } = req.body
    if (name && category_id && price && imagePath && description) {
        try {
            const newProduct = new Product({ name, category_id, price, imagePath, description })
            await newProduct.save()
            res.status(201).json({ error: false, msg: "product added successfully", newProduct })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})

router.post('/add_category', verifyAdmin, async (req, res) => {
    const { name } = req.body
    console.log(name)
    if (name) {
        try {
            const newCategory = new Category({ name })
            const nc = await newCategory.save()
            console.log(nc)
            res.status(201).json({ error: false, msg: "category added successfully" })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})


router.put('/edit_product/:id',  verifyAdmin, async (req, res) => {
    const id = req.params.id
    const { name, category_id, price, description, imagePath } = req.body
    if (name && category_id && price  && description && imagePath) {
        try {
            const product = { name, category_id, price, description, imagePath }
            await Product.updateOne({ _id: id }, product)
            res.status(201).json({ error: false, msg: "product edited successfully", product })
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})

module.exports = router