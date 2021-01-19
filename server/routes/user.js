const router = require('express').Router()
const User = require('../models/user')
const Cart = require('../models/cart')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const Order = require('../models/order')
const { findByIdAndUpdate } = require('../models/user')
const { verifyUser } = require('../verify')


router.post('/register_first_step', async (req, res) => {
    const { user_id } = req.body
    console.log(user_id)
    if (user_id) {
        try {
            const check = await User.find({ user_id })
            console.log(check)
            if (check.length === 0) {
                res.status(201).json({ error: false, msg: true })
            }
            else {
                res.status(201).json({ error: false, msg: false })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})


router.post('/final_register', async (req, res) => {
    console.log("registerrrr")
    const { user_id, email, password, city, street, f_name, l_name } = req.body
    console.log(user_id, email, password, city, street, f_name, l_name)
    if (user_id && email && password && city && street && f_name && l_name) {
        const salt = genSaltSync(10)
        const hash = hashSync(password, salt)
        try {
            const newUser = new User({ user_id, email, password: hash, city, street, f_name, l_name, role: "user" })
            const result = await newUser.save()
            let token = jwt.sign({ user_id, f_name, role: result.role }, "blah", { expiresIn: "10m" })
            res.status(201).json({ error: false, msg: "The user has registered successfully", token, result})
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        try {
            const result = await User.find({ email })
            if (result.length === 0) {
                res.status(201).json({ error: true, msg: "The email dosn't exist" })
            } else {
                const check = compareSync(password, result[0].password)
                if (check) {
                    let token = jwt.sign({ user_id: result[0].user_id, f_name: result[0].f_name, role: result[0].role }, "blah", { expiresIn: "10m" })
                    res.status(201).json({ error: false, msg: " user logged in successfully", token, result })
                }
                else{
                    res.status(201).json({ error: true, msg: "wrong password"})
                }
            }

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})



router.put('/remove_product_from_cart', verifyUser, async (req, res) => {
    const { product_id, cart_id, price_per_product } = req.body
    if (product_id, cart_id) {
        try {
            const result =  await Cart.findById({ _id : cart_id})
            result.price = result.price - price_per_product
            result.products = result.products.filter(p=>p.product_id != product_id)
            await result.save()
            // await Cart.updateOne({ _id: cart_id }, { $set: { products: result.products } })
            res.status(201).json({ error: false, result })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})


router.put('/remove_all_products', verifyUser, async (req, res) => {
    const {  cart_id } = req.body
    if ( cart_id) {
        try {
            const result =  await Cart.findById({ _id : cart_id})
            
            result.products = []
            result.price = 0
            await result.save()
            // await Cart.updateOne({ _id: cart_id }, { $set: { products: result.products } })
            res.status(201).json({ error: false, msg : "The products have been successfully deleted", result })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})

router.get('/check_if_exist_cart/:user_id', async (req, res) => {
    
        try {
            const result =  await Cart.find({ user_id: req.params.user_id})
            res.status(201).json({error: false, msg : result})
        } catch (err) {
            console.log(err)
            res.status(500).json({error:true, msg : "internal error"})
        }
    } 
)


router.post('/open_cart', verifyUser, async (req, res) => {
    const { id } = req.body
    console.log(id)
    if (id) {
        try {
            const newCart = new Cart({ user_id: id, products: [], price: 0 })
            const cart = await newCart.save()
            res.status(201).json({ error: false, msg: "the cart was opened successfully", cart })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})


router.post('/open_order', verifyUser, async (req, res) => {
    const { user_id, cart_id, finel_price, city, street, delivery_date, last_4_digits_of_credit} = req.body
    console.log(user_id, cart_id, finel_price, city, street, delivery_date, last_4_digits_of_credit)
  
    if (user_id  && cart_id && finel_price && city && street && delivery_date && last_4_digits_of_credit) {
        try {
            const newOrder = new Order({ user_id, cart_id, finel_price, city, street, delivery_date, last_4_digits_of_credit  })
            await newOrder.save()
            res.status(201).json({ error: false, msg: "the order was opened successfully", newOrder })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})

// cteationDate : Date,
// user_id : {type: Schema.Types.ObjectId, ref : "user"},
// cart_id : {type: Schema.Types.ObjectId, ref : "cart"},
// finel_price : Number,
// city: String,
// street : String,
// delivery_date : Date,
// last_4_digits_of_credit : String





router.put('/add_or_remove_product_from_cart', verifyUser, async (req, res) => {
    let { cart_id, product_id, quantity, price_per_product } = req.body
    console.log("addtocart",cart_id, product_id, quantity, price_per_product)
   
    if (cart_id && product_id && quantity && price_per_product) {
        console.log( cart_id, product_id, quantity, price_per_product, "hii")
      
        try {
            let result = await Cart.findById(cart_id)
            const check_if_product_exist = result.products.filter(p => p.product_id == product_id)
            let temp_quantity 
            let temp_price_per_product
            if (check_if_product_exist.length == 0) {
                temp_quantity = 0
                temp_price_per_product = 0
                const product = { product_id, quantity, price_per_product }
                await Cart.updateOne({ _id: cart_id }, { $push: { products: product } })
               
            } else {
                const index = result.products.indexOf(check_if_product_exist[0])
                temp_quantity = result.products[index].quantity
                temp_price_per_product = result.products[index].price_per_product
                const product = { product_id, quantity, price_per_product}
                result.products[index] = product
                await Cart.updateOne({ _id: cart_id }, { $set: { products: result.products } })
                
            }
            if(temp_quantity<quantity){
                await Cart.updateOne({_id: cart_id}, {$set: {price : result.price+(price_per_product - temp_price_per_product)}})
                
            }
            if(temp_quantity>quantity){
                await Cart.updateOne({_id: cart_id}, {$set: {price : result.price -( temp_price_per_product- price_per_product)}})
                
            }

            
            result = await Cart.findById(cart_id)
            res.status(201).json({ error: false, msg: "the cart was updated successfully", cart : result })
            
         
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})



router.put('/delete_cart', verifyUser, async (req, res) => {
    const { id } = req.body
    if (id) {
        try {
            await Cart.deleteOne({ _id:id });
            res.status(201).json({ error: false, msg: "cart deleted" })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})




router.get('/allOrders/:user_id', async (req, res) => {
    if (req.params.user_id) {
        try {
            const result = await Order.find({ user_id: req.params.user_id })
            res.json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})




module.exports = router