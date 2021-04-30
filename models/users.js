const mongoose = require('mongoose')



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


const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    token: String,
    article: [articleSchema]
    
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel