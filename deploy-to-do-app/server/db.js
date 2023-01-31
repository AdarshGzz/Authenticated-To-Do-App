const {MongoClient} = require('mongodb')
const port = process.env.DBPORT ?? 27017
const url = `mongodb://localhost:${port}`
const client = new MongoClient(url)
const database = process.env.DBNAME ?? "todoapp"

const pool = async(res,req) => {
    try{
        let result = await client.connect()
        let db = result.db(database)
        return(db.collection("todos"))
    }catch(err){
        console.error(err)
    }  
}

const pool2 = async (res, req) => {
  try {
    let result = await client.connect();
    let db = result.db(database);
    return db.collection("users");
  } catch (err) {
    console.error(err);
  }
};

module.exports = pool,pool2

