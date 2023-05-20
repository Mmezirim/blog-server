const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('Blog', devSchema);

module.exports = Blog;