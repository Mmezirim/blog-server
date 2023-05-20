const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaTwo = new Schema({
    comment:{
        type: String,
        required: false
    },   
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', schemaTwo);
module.exports = Comment;