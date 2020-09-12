const cors = require('cors')
const express= require('express')

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

const PORT_NUMBER=61551;

app.use('/', require('./route')); 

app.listen(PORT_NUMBER, () => {
    console.log(`Server started for Order Service at http://localhost:${PORT_NUMBER}`)
});