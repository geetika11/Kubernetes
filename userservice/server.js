const cors = require('cors')
const express= require('express')
const {db, User} = require('./db/dbindex')
const rn = require('random-number')

const options = {
    min:  0
  , max:  1000
  , integer: true
  };
const randomNumber=rn(options)

const optionsforAge = {
    min:  20
  , max:  50
  , integer: true
  };
const randomAge=rn(optionsforAge)

const app=express()
app.use(express.json())

app.use(express.urlencoded({
    extended:true
}))

app.use(cors());

app.use(function(request,response,next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
    response.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

const PORT_NUMBER=61550;
app.use('/', require('./route')); 

db.sync().then(() => {
    var username="user"+randomNumber
    console.log('Database Synced')
    User.create({
        name: username,
        email:username+"@gmail.com",
        age:randomAge
    })
    app.listen(PORT_NUMBER, () => {
        console.log(`Server started for User Service at http://localhost:${PORT_NUMBER}`)
    });
}).catch(console.error)



