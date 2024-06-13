/**
 * express( frame work ->  npm i express)
 * mongoose (database  -> npm i mongoose)
 * nodemon (continuese run project (-g globally install) -> npm i nodemon -g )
 * dotenv ( configuration (mail configuration , API keys  ,sendgrid , nodemailer ,database configuration) -> npm i dotenv )
 * body-parser (api responsibility -> npm i body-parser )
 * bcrypt ( password encrypt -> npm i bcrypt )
 * jsonwebtoken (token generate -> npm jsonwebtoken )
 *
 * nodemailer (send email -> npm i nodemailer )
 **/
const cors=require('cors')
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const bodyParser =require('body-parser');
const port = process.env.SERVER_PORT || 3000;
const app = express();
// app.use(cors())
app.use(cors())
//-------------------

const userRoute = require('./routes/UserRoute');
const customerRoute = require('./routes/CustomerRoute');
const productRoute = require('./routes/ProductRoute');
const orderRoute = require('./routes/OrderRoute');



//---------------------



//apita ona venawa kauru hari request ekak yawanawa eka wrap karala ganna
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

try{
    mongoose.connect('mongodb://127.0.0.1:27017/posapi');
    app.listen(port, () => {
        console.log(`server Stared & running on port ${port}`);
    })

}catch (e){
    console.log(e);
}

app.get('/test-api', (req, resp) => {
    return resp.json({'message': 'Server Started !'})
})


//-----------------------
app.use('/api/v1/users',userRoute);
app.use('/api/v1/customer',customerRoute);
app.use('/api/v1/order',orderRoute);
app.use('/api/v1/products',productRoute);

