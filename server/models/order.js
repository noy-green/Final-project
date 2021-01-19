const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
    cteationDate : {
     type: Date,
     default : Date.now
    },
    user_id : {type: Schema.Types.ObjectId, ref : "user"},
    cart_id : {type: Schema.Types.ObjectId, ref : "cart"},
    finel_price : Number,
    city: String,
    street : String,
    delivery_date : Date,
    last_4_digits_of_credit : String
})

module.exports = model('order', orderSchema)