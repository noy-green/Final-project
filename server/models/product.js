const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    name : String,
    category_id : {type: Schema.Types.ObjectId, ref : "category"},
    price : Number,
    imagePath : String,
    description: String
})

module.exports = model('product', productSchema)