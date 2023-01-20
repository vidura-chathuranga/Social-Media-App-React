import jwt from 'jsonwebtoken';

export const verifyToken = (res,req,next)=>{

    try{
        let token = req.header("Authorization");

        //for testing print token
        console.log(token);

        if(!token){
            return res.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        //for testing
        console.log(`verfied from middleware ${verified}`);
        console.log(`verified from middleware ${req.user}`);

        req.user = verified;
        
        next();
    }catch(err){
        res.status(500).json({error:err.message});
    }
}