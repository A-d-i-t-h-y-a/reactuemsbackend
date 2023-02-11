const mongoose = require('mongoose')
const URI = `mongodb+srv://student:kmit123@cluster0.mwifk43.mongodb.net/himalayas?retryWrites=true&w=majority`

const connectToMongo = ()=>{
    mongoose.connect(URI, async (err, db)=>{
        console.log("connected to mongo successfully");
        let d = await db.collection("peaks").find().toArray()
        console.log(d)
    })
}

connectToMongo()