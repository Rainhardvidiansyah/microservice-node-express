const logActivity = require('../model/logactivity');
const userService = require('../service/userservice');



const getAndSaveUserActivity = async (req, res, next) => {

    try {
        const userId = req.userId; //req.userId is from variable that I created in authMiddle, specifically from verifyToken method
        if(!userId){
            return res.status(401).json({'message': 'user doesn\'t have permission to access this endpoint'});
        }

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
        console.log(' ');
        
        await activity.save();
        
        next();
    } catch (error) {
        console.log(`Error message in Log Activity middleware: ${error.message}`);
        next();
    }
}

module.exports = getAndSaveUserActivity;