const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')
const authpool = require('./authDB')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authPool = require('./authDB')
app.use(express.json());
let secretKey = 'secretkey'

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

app.post('/users/signup/', async(req,res)=>{
    const{email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const userdata ={
        "email":`${email}`,
        "hashed_Password": `${hashedPassword}`,
    }
    try{
        let signup = await authpool()
        let search = await signup.find({"email":`${email}`}).toArray()
        let eemail = search.map(userProps =>{
            return (userProps.email)
        })
        if(email === eemail.toString()){
            res.json({detail: "Account already exist with this Email"})
        }
        else{
          signup = await signup.insertOne(userdata)
          const token = jwt.sign({email} , secretKey ,{ expiresIn :'1hr' })
          res.json({email,token})
        }
    }catch(err){
        console.error(err)
    }
})


/// login

app.post("/users/login/", async (req, res) => {
    const { email, password } = req.body
  try {
    let search = await authPool()
    search = await search.find({ email: `${email}` }).toArray()
    if (search.length==0) {
      return res.json({ detail: "Account done not exist with this Email" });
    }
    
    const token = jwt.sign({ email }, secretKey, { expiresIn: "1hr" });

    let hash = search.map((userProps) => {
        return userProps.hashed_Password;
    })
    hashedPass = hash.toString()

    let eemail = search.map((userProps) => {
        return userProps.email;
    })

    const success = await bcrypt.compare(password, hashedPass)

    if(success){
        res.json({'email': eemail,token})
    }else{
        res.json({'detail':'Incorrect Passward Login failed'})
    }

    
  } catch (err) {
    console.error(err);
  }
});


app.listen(Port,()=>{
    console.log(`listening on http://localhost:${Port}`);
})