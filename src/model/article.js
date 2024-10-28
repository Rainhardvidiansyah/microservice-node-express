const mongoose = require('mongoose');


const imageSchema = mongoose.Schema({
    URLSearchParams: String,
    caption: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
},
{ _id: false });


const article = mongoose.Schema({
    title: String,
    author: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
    },
    images: [imageSchema],
    content: {type: String, required: true},
    tag: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
})

const Article = mongoose.model('Article', article);


module.exports = Article;

//title, author, contect