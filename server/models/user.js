const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    f_name : String,
    l_name : String,
    email : String,
    user_id : String,
    password : String,
    city : String,
    street: String,
    role : String,

})

module.exports = model('user', userSchema)