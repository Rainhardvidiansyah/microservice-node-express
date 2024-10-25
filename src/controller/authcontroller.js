const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt');
const { getUserByEmail }  = require('../service/authenticationservice');
const refreshTokenService = require('../service/refreshtokenservice');


class AuthenticationController{

    constructor(){}

    async login(req, res){
    
        try{
        
        const secretKey = process.env.SECRETKEY;

        const { email, password } = req.body;
        
        if(!email || !password){
            return res.status(400).send('Username and password are required');
        }

        const userData = await getUserByEmail(email);


        if(!userData){
            return res.status(401).send('Invalid credentials');
        }

        const validPassword = await bcrypt.compare(password, userData.password);

        if(!validPassword){
            return res.status(401).send('Invalid credentials');
        }

        const userPayload = {
            id: userData.id,
            email: userData.email,
            role: userData.role
        }

        const accessToken = jwt.sign(userPayload, secretKey, {expiresIn: '15s'});
        
        
        const expireDate = process.env.EXPIRYDATE;
        const date = new Date(Date.now() + expireDate);
    
        const refreshToken = jwt.sign( userPayload, process.env.REFRESHTOKEN, {expiresIn: expireDate });

        await refreshTokenService.saveRefreshToken(refreshToken, userData._id, false);

        res.cookie('refreshToken', refreshToken, {
            httpOnely: true,
            maxAge: expireDate
            //secure: true ...use it when it is deployed
        });


        console.log("Login successful, from login method in authentication controller");


        return res.status(200).json({ 
            message: 'Login berhasil',
            token: accessToken
        });


    }catch(error){
        console.error(error);
        res.status(500).send('Server Error in authentiationg user. Please try again');
    }}


    createNewAccestToken(req, res){

        const userPayload = {
            id: req.id,
            email: req.email,
            role: req.role
        };

        const newAccessToken = jwt.sign(userPayload, process.env.SECRETKEY, {expiresIn: 15});

        console.log(`New access token: ${newAccessToken}. User email is ${userPayload.email}. Printed from create new access token method in auth controller`);

        res.status(200).json({
            'New access token': newAccessToken
        });
    }

    logout(req, res){
        const token = req.cookies.refreshToken;
        if(!token){
            return res.status(401).send('Token not provided');
        }

        refreshTokenService.deleteRefreshToken(token)
        .then(() => {
            console.log(`Refresh token just got deleted: ${token}`);
            return res.status(200).send('You are now logged out')})
        .catch(err => console.error(err));
    
    }


}


module.exports = new AuthenticationController();