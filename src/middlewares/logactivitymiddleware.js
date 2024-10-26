const { MongoNotConnectedError } = require('mongodb');
const logActivity = require('../model/logactivity');
const userService = require('../service/userservice');



const getAndSaveUserActivity = async (req, res, next) => {

    try {
        const userId = req.id;
        const user = await userService.findUserById(userId);
        if(!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
//userId, endpoint, method, path, ip
        const activity = new logActivity({
            userId: user._id,
            endpoint: req.getOriginalUrl,
            method: req.method,
            path: req.path,
            ip: req.ip
        });

        console.log(`Get data user id ${activity.userId} from log activity middleware function`);
        
        await activity.save();
        
        next();
    } catch (error) {
        console.log(`Error message in Log Activity middleware: ${error.message}`);
        next();
    }
}

module.exports = getAndSaveUserActivity;