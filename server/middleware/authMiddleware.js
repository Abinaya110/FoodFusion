const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'nezuko-chan';

const authMiddleware = (req,res,next)=>{
    const authHeader = req.header('Authorization');

if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
// Extract the token from the "Bearer Token" format
const token = authHeader.split(' ')[1];

if(!token){
    return res.status(401).json({message:'Unauthorized: no token provided'});
    console.log('Unauthorized: no token provided')
}

jwt.verify(token,JWT_SECRET_KEY,(err,decodedToken)=>{
if (err){
    return res.status(401).json({message:'Unauthorized:'})
}
req.user= decodedToken.user;
next();
});
};


module.exports = authMiddleware;
