const express = require('express')
const app = express()
app.get('/',(req,res)=>{
    res.json({
        data:"Welcome to PharmPredict"
    })
})
app.listen(8000,()=>{
    console.log("Application running on port 8000")
})