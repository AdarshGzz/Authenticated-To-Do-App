const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db');
const pool2 = require('./db');
const ObjectId = require('mongodb').ObjectId
const { response } = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

// delete a todo
app.delete('/todos/:id', async(req,res)=>{
    try {
        let deletetodo = await pool()
        deletetodo = await deletetodo.deleteOne({
          _id: ObjectId(req.params.id)
        })
        res.json(deletetodo)
    } catch (err) {
        console.error(err)
    }
})

///signup 

app.post('/signup', async(req, res)=>{
    const{email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    try{
        const signup = await pool2()
        signup  = await signup.insertOne({
            email:`${email}`,
            hashde_Password:`${hashedPassword}`
        })

        const token = jwt.sign({email} , 'secret' ,{expiresIn:'1hr'})

        res.json({email,token})


    }catch(err){
        console.error(err)
        if(err){
            res.json({detail:err.detail})
        }
    }
})


/// login

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  try {
  } catch (err) {
    console.error(err);
  }
});


app.listen(Port,()=>{
    console.log(`listening on http://localhost:${Port}`);
})