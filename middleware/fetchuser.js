const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
const JWT_SECRET = `${process.env.JWT_SECRET}`


const fetchuser = (req, res, next)=>{
    const authToken = req.header("auth-token")
    if(!authToken){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(authToken, JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");
    }

}

module.exports = fetchuser