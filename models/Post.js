const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    caption: { type: String, max: 500 },
    img: { type: String,required:true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String },
        createdAt: { type: Date, default: new Date() }
    },],
});

module.exports = mongoose.model("Post", postSchema);