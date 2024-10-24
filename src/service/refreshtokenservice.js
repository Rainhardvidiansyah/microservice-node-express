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

        //cari token dulu di fungsi logout. 
        //jika token ditemukan, maka update field revoke menjadi true.
        //jika token tidak ditemukan, maka throw error.
        try {
            const refreshToken = await RefreshToken.findOneAndUpdate(token, {revoke: true});
            return refreshToken;
        } catch (error) {
            console.error(error);
        }
    }



}

module.exports = new RefreshTokenService();