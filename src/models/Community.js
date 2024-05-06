const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    // image: string,
    description: {
        type: String,
        unique: false,
        required: false,
    },
    //    "roles": ["roleId"(string)]
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    startDate: {
        type: Date,
        default: Date.now,
    },
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;