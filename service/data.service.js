//import jwt

const jwt = require('jsonwebtoken')


// import db

const db = require('./db')


userDetails = {//object of objects
    1000: { acno: 1000, username: "Soja", password: 1000, balance: 10000, transaction: [] },
    1001: { acno: 1001, username: "Biju", password: 1001, balance: 20000, transaction: [] },
    1002: { acno: 1002, username: "Sriya", password: 1002, balance: 50000, transaction: [] },


}

const register = (acno, username, password) => {

    return db.User.findOne({ acno })   //27017
        .then(User => {
            if (User) {
                return {
                    statusCode: 401,
                    status: false,
                    message: 'User already registered'
                }
            }
            else {
                const newUser = new db.User({
                    acno,
                    username,
                    password,
                    balance: 0,
                    transaction: []

                })
                newUser.save() //to save to mongodb
                return {
                    statusCode: 200,
                    status: true,
                    message: 'successfully registered'
                }
            }
        })




}
// if (acno in userDetails) {

//     return {
//         statusCode: 401,
//         status: false,
//         message: 'user already registered'
//     }
// }
// else {
//     userDetails[acno] = {
//         acno,
//         username,
//         password,
//         balance: 0,
//         transaction: []
//     }
//     console.log(userDetails);

//function call
// return {
//     statusCode: 200,
//     status: true,
//     message: 'successfully registered'
// }



const login = (acno, pswd) => {

    if (acno in userDetails) {
        if (pswd == userDetails[acno]['password']) {
            currentUser = userDetails[acno]['username']
            currentAcno = acno;
            const token = jwt.sign({
                currentAcno: acno

            }, 'superkey2020')//superkey2020 is the key value generated for sign



            return {
                statusCode: 200,
                status: true,
                message: 'login succesful',

                currentUser,
                currentAcno,
                token
            }
        }
        else {
            // alert('Incorrect password');
            return {
                statusCode: 401,
                status: false,
                message: 'Incorrect password'
            }

        }
    }
    else {
        //   alert('Invalid user');
        return {
            statusCode: 401,
            status: false,
            message: 'invalid user'
        }
    }
}
const deposit = (acno, pswd, amt) => {


    var amount = parseInt(amt);
    if (acno in userDetails) {
        if (pswd == userDetails[acno]['password']) {
            userDetails[acno]['balance'] += amount;
            userDetails[acno]['transaction'].push({
                type: 'Credit',
                amount
            })
            console.log(userDetails);

            return {
                statusCode: 200,
                status: true,
                message: `${amount} is deposited and new balence is ${userDetails[acno]['balance']}`
            }


        }
        else {
            // alert("incorrect password");
            return {
                statusCode: 401,
                status: false,
                message: 'incorrect password'
            }
        }

    }
    else {
        alert("invalid user");
        return {
            statusCode: 401,
            status: false,
            message: 'invalid user'
        }
    }


}
const withdraw = (acno, pswd, amt) => {


    var amount = parseInt(amt);
    if (acno in userDetails) {
        if (pswd == userDetails[acno]['password']) {
            if (userDetails[acno]['balance'] > amount) {


                userDetails[acno]['balance'] -= amount;
                userDetails[acno]['transaction'].push({
                    type: 'Debit',
                    amount
                })
                console.log(userDetails);
                return {
                    statusCode: 200,
                    status: true,
                    message: `${amount} is debited and new balence is ${userDetails[acno]['balance']}`
                }
            }
            else {

                return {
                    statusCode: 401,
                    status: false,
                    message: 'Insufficient balance'
                }
            }

        }
        else {

            return {
                statusCode: 401,
                status: false,
                message: 'Incorrect password'
            }
        }


    }

    else {

        return {
            statusCode: 401,
            status: false,
            message: 'Invalid user'

        }
    }

}
const getTransaction = (acno) => {

    return {
        statusCode: 200,
        status: true,
        transaction: userDetails[acno]['transaction']
    }
}




//export

module.exports = {
    register,
    login,
    deposit,
    withdraw,
    getTransaction
}
