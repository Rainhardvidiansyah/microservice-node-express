const jwt = require('jsonwebtoken');

require('dotenv').config();


class TokenMiddleware{

    constructor(){}

    veryfyToken(req, res, next){

    try {
        
        const authorizationHeader = req.headers['authorization'];

        let accessToken;
        
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            accessToken = authorizationHeader.split(' ')[1];
        } else {
            return res.status(401).send('Access token is missing or invalid');
        }

    jwt.verify(accessToken, process.env.SECRETKEY, (err, decodedUserToken) => {

        if(err){
            return res.status(403).send('invalid token err');
        }


        req.email = decodedUserToken.email;
        req.userId = decodedUserToken.id;
        
        next();
        

    });

    } catch (error) {
        res.status(403).send("error in your authmiddleware");
    }
}

    verifyRefreshToken (req, res, next){
        
        try{

        const token = req.cookies.refreshToken;

        if(!token){
            console.log(`refresh token not found. This is printed from verify refresh token in auth middleware`);
            return res.status(401).send('Token not provided');
        }

        jwt.verify(token, process.env.REFRESHTOKEN, (err, decodedRefreshToken) => {
            if(err){
                return res.status(403).send('Invalid token');
            }

            req.email = decodedRefreshToken.email;

            next();
        });

        
        }catch(error){
            console.error(error);
            res.status(500).send('Server Error in refreshing token');
        }

    }
}



module.exports = new TokenMiddleware();