const user = require('../model/user');

async function getUserByEmail(email){
    try {
        const userData = await user.findOne({ email: email }).exec();
        return userData;
    } catch (error) {
        console.log(error.message + ' auth service...' );
    }
    
}

module.exports = {
     getUserByEmail
}