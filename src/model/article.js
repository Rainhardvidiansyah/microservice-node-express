const mongoose = require('mongoose');


const article = mongoose.Schema({
    title: String,
    author: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
    },
    images: [{Url: String, Name: String}],
    content: {type: String, required: true},
    tag: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
})

const Article = mongoose.model('Article', article);


module.exports = Article;

//title, author, contect