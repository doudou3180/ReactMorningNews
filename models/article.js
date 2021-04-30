var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({

    articleTitle: String,
    articleDescription: String,
    articleImg: String,
    
    //globalRating: Number,
    //viewCount: Number,
    
});

var articleModel = mongoose.model('articles', articleSchema);

module.exports = articleModel;