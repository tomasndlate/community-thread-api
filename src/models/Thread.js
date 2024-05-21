const mongoose = require('mongoose');
const DatabaseError = require('../errors/DatabaseError');
const BadRequestError = require('../errors/BadRequestError');
const { SCHEMA } = require('../openapi/openapi-builder');

SCHEMA( 
    'Thread', 
    {
        required: ["_id"],
        type: "object",
        properties: {
            _id: { type: "integer" },
            community: { $ref: "#/components/schemas/Community/properties/_id" },
            nameId: { type: "string" },
            name: { type: "string" },
            messages: { type: "array", $ref: "#/components/schemas/Message/properties/_id" },
            startDate: { type: "integer" }
        }
    }
)
const threadSchema = new mongoose.Schema({
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },
    nameId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    messages: [{
            type: String
        }],
    startDate: {
        type: Date,
        default: Date.now,
    },
});

threadSchema.index({ nameId: 1, community: 1 }, { unique: true });

threadSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const existingThread = await this.constructor.findOne({ nameId: this.nameId, community: this.community });
        
            if (!!existingThread)
                throw new BadRequestError('Thread already exists');
        }
        
        next();

    } catch (error) {
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        next(error);
    }
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;