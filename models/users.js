const mongoose = require('mongoose')



var articleSchema = mongoose.Schema({

    articleTitle: String,
    articleDescription: String,
    urlToImage: String,
    articleContent: String,
    articleLang: String,
    
});


const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    token: String,
    article: [articleSchema], 
    selectedLang: String,
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel