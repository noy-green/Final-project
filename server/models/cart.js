const {Schema, model} = require('mongoose')

const cartSchema = new Schema({
    cteationDate :    
    {type: Date, default: Date.now},
    user_id : {type: Schema.Types.ObjectId, ref : "user"},
    products: [
        {
            product_id : {type: Schema.Types.ObjectId, ref : "product" },
            quantity : Number,
            price_per_product : Number

        }
    ],
    price : Number
})

module.exports = model('cart', cartSchema)