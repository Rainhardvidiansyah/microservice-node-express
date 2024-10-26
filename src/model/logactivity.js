const mongoose = require('mongoose');


const LogActivitySchema = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    endpoint: String,
    method: String,
    path: String,
    ip: String,
    createdAt: { type: Date, default: Date.now }
});

const LogActivity = mongoose.model('LogActivity', LogActivitySchema);


module.exports = LogActivity;

