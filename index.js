//server creation

//import express

const express=require('express')

//we want to import the data service 
const dataService= require('./service/data.service')

//import jwt

const jwt=require('jsonwebtoken')


//create an app using express

const app=express()
//to parse json data from request body

app.use(express.json())//converting the data to json

//create port number

app.listen(3000,()=>{
    console.log('Server listening on the port:3000');
})

//Application specific middleware

const appMiddleware=(req,res,next)=>{
 console.log('application specific middleware');
 next();

}
app.use(appMiddleware)

//Router specific middleware

const jwtMiddleware=(req,res,next)=>{
    try{
    const token=req.body.token;
    //verify the token -verify()method used
    console.log('Router specific middleware');
    const data=jwt.verify(token,'superkey2020')
    next();
}
catch{
    //422-unproccessable enity(unable to process)
    res.status(422).json({
        statusCode:422,
        status:false,
        message:"please login"


    })

}
}
// app.use(jwtMiddleware) 



//Resolving  HTTP request

//GET method-get or display data

// app.get('/',(req,res)=>{
//     res.send('Get methods');
// })

// //POST method-create data

// app.post('/',(req,res)=>{
//     res.send('POST methods');
// })


// //PUT methods

// app.put('/',(req,res)=>{
//     res.send('PUT methods');
// })

// //PATCH methods

// app.patch('/',(req,res)=>{
//     res.send('PATCH methods');
// })

// //DELETE methos-for delete

// app.delete('/',(req,res)=>{
//     res.send('DELETE methods');
// })


//API request/call


//login
//registration
//deposit
//delete
//transaction history


//Resolving registration request-post method

app.post('/register',(req,res)=>{
    console.log(res.body);
    const result=dataService.register(req.body.acno,req.body.username,req.body.password);
    res.status(result.statusCode).json(result)

//     if(result){
//         res.send('sucessfully registered');

//     }
//   else{
//     res.send('User already exist');

//   }

})
//Resolving loginn request-post method

app.post('/login',(req,res)=>{
    console.log(res.body);
    const result=dataService.login(req.body.acno,req.body.pswd);
    res.status(result.statusCode).json(result)
})


//Resolving deposited request-post method
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(res.body);
    const result=dataService.deposit(req.body.acno,req.body.pswd,req.body.amount);
    res.status(result.statusCode).json(result)
})


//Resolving withdrawn request-post method
app.post('/withdraw',(req,res)=>{
    console.log(res.body);
    const result=dataService.withdraw(req.body.acno,req.body.pswd,req.body.amount);
    res.status(result.statusCode).json(result)
})

//Resolving transaction request-post method
app.post('/transaction',(req,res)=>{
    console.log(res.body);
    const result=dataService.getTransaction(req.body.acno);
    res.status(result.statusCode).json(result)
})
