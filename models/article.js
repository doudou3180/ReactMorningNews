var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({

    articleTitle: String,
    articleDescription: String,
    urlToImage: String,
    articleContent: String,
    selectedLang: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
    
    //globalRating: Number,
    //viewCount: Number,
    
});

var articleModel = mongoose.model('article', articleSchema);

module.exports = articleModel;