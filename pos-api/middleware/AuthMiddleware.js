const jwt = require('jsonwebtoken');
const secretKey = process.env.SECREAT_KEY;

function verifyToken(req,resp,next){
    const token = req.headers.authorization;
// Split the token string after "Bearer" part
//     const tokenParts = token.split('Bearer ');
// Token parts will be an array where the second element will be the token without "Bearer"
//     const authToken = tokenParts[1];
    // console.log(authToken); // This will print the token without "Bearer" prefix

    if(!token){
        return resp.status(403).json({'message':'token is missing'});
    }
    jwt.verify(token,secretKey,(err,decoded)=>{
        if(err){
            return resp.status(401).json({'message':'token is invalid'});
        }
        next();
    })
}
module.exports=verifyToken;