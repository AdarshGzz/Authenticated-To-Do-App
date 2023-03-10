const {MongoClient} = require('mongodb')
const dotenv = require('dotenv')
dotenv.config() 
const url = process.env.DBURL
const client = new MongoClient(`${url}`)
const database = `${process.env.DBNAME }`

const pool = async(res,req) => {
    try{
        let result = await client.connect()
        let db = result.db(database)
        return(db.collection("todos"))
    }catch(err){
        console.error(err)
    }  
}


module.exports = pool

