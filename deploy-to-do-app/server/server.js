const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')

const Port = process.env.PORT ?? 8000
app.use(cors())
// get all todos
app.get('/todos/:userEmail', async (req,res)=>{
    console.log(req)
    const {userEmail} = req.params
    try{
        let todos = await pool()
        todos = await todos.find({ user_email: `${userEmail}` }).toArray();
        res.send(todos)
    }catch(err){
        console.error(err)
    }
})

app.listen(Port,()=>{
    console.log(`listening on http://localhost:${Port}`);
})