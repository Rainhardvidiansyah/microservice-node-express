const mongoose = require('mongoose');

const refreshTokenSchema = mongoose.Schema({
    refreshToken: String, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    expireDate: {type: Date},
    revoke: Boolean
});


const RefreshTokenModel = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshTokenModel;