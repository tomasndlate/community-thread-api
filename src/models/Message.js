const mongoose = require('mongoose');
const { SCHEMA } = require('../openapi/openapi-builder');

SCHEMA(
    'Message',
    {
        required: ["_id"],
        type: "object",
        properties: {
            _id: { type: "integer" },
            thread: { $ref: "#/components/schemas/Thread/properties/_id" },
            sender: { type: "string" },
            content: { type: "string" },
            startDate: { type: "integer" }
        }
    }
)
const messageSchema = new mongoose.Schema({
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        require: true
    },
    sentDate: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;