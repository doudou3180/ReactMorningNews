var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({

    articleTitle: String,
    articleDescription: String,
    img: String,
    //globalCount: Number,
    //globalRating: Number,
    //viewCount: Number,
    
});

var articleModel = mongoose.model('index', articleSchema);

module.exports = articleModel;