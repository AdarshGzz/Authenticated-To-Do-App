const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db');
const ObjectId = require('mongodb').ObjectId
const { response } = require('express');
app.use(express.json());

const Port = process.env.PORT ?? 8000
app.use(cors())
// get all todos
app.get('/todos/:userEmail', async (req,res)=>{
    const {userEmail} = req.params
    try{
        let todos = await pool()
        todos = await todos.find({ user_email: `${userEmail}` }).toArray();
        res.send(todos)
    }catch(err){
        console.error(err)
    }
})

// create a new to do 
app.post('/todos', async(req,res)=>{
    
    try{
        let newToDo = await pool()
        newToDo = await newToDo.insertOne(req.body); 
        res.json(newToDo); 
    }catch(err){
        console.error(err)
    }
})
// edit a new to do
app.put('/todos/:_id', async(req,res)=>{
    const {_id}  = req.params;
    try {
        let editToDo = await pool()
        let result = editToDo.updateMany(
          { _id: ObjectId(`${_id}`)},
          { $set: req.body}
        )
        res.json(result)
    } catch (err) {
        console.error(err)
    }
})

app.listen(Port,()=>{
    console.log(`listening on http://localhost:${Port}`);
})