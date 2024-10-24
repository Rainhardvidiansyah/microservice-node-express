const User = require('../model/user');

class UserService{

    constructor(){}

    async getUser(){
        try {
            const user = await User.findOne({"username": "rainhard"});
            return user;
        } catch (error) {
            console.error(error);
        }
    }

    async getUserByEmail(email){
        try {
            const user = await User.findOne({ email: email });
            return user;
        } catch (error) {
            console.error(error);
        }
    }



}


module.exports = new UserService();