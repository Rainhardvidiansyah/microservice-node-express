const RefreshToken = require('../model/refreshtoken');


class RefreshTokenService{

    constructor(){}

    async saveRefreshToken(token, userId, revoke){
        try {
            const date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            const newRefreshToken = new RefreshToken({
                refreshToken: token,
                user: userId,
                expireDate: date,
                revoke: revoke
            });
            const savedRefreshToken = await newRefreshToken.save();
            return savedRefreshToken;
        } catch (error) {
            console.error(error);
        }
    }


    async updateRevoke(token){
        try {
            const refreshToken = await RefreshToken.findOneAndUpdate( {refreshToken: token}, { $set: {revoke: true }} );
            return refreshToken;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteRefreshToken(token){
        try {
            await RefreshToken.deleteOne({refreshToken: token});
        } catch (error) {
            console.log(error);
        }
    }



}

module.exports = new RefreshTokenService();