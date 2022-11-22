//server integration 

//1.server mongodb connection
//import mongoose

const mongoose = require('mongoose');

//2.state connection string via mongoose

mongoose.connect('mongodb://localhost:27017/Bankserver', {
    useNewUrlParser: true
    //to avoid warnings

})

//3.define bank db model

const User = mongoose.model('User', {
    //schema creation
    acno: Number,
    username: String,
    password: String,
    balance: Number,
    transaction: []
})


//exports

module.exports = {
    User
}
