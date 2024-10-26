const User = require('../model/user');

class UserService{

    constructor(){}

    async getUser(username){
        try {
            const user = await User.findOne({"username": username});
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

    async findUserById(id){
        try {
            const user = await User.findById(id).exec();
            return user;
        } catch (error) {
            console.error(error);
        }
    }



}


module.exports = new UserService();