var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const messageSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const roomSchema = new Schema({
    messages: [ messageSchema ],
    room: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);