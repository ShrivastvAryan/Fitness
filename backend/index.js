const express=require('express')
const app=express()
const PORT=5000
const cors=require('cors')

app.use(cors());
app.use(express.json());

app.get('/health',(req,res)=>{
    res.send("The server is healthy")
})


app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Server is running at ${PORT}`)
    }
    else{
        console.log(error)
    }
})