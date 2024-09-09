const jwt = require('jsonwebtoken')

const authToken = (req , res , next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null){
        return res.status(401).json({msg:"Authentication token required"});
    }

    jwt.verify(token , "stake123" , (err , user) =>{
        if(err){
            return res.status(401).json({msg:"Authentication token expired"});
        }
        req.user=user;
        next();
    })
}

module.exports = {authToken};