const express=require("express")
var bodyParser = require('body-parser');


const cors=require("cors")

const {mongoose}=require("./db.js")
var usercontroller =require("./controllers/user.controller")

var app=express()
app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:4200"}))


app.listen(3000,()=>{
    console.log("server connected on the port 3000")
})

app.use("/users",usercontroller)