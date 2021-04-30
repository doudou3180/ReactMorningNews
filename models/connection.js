var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://PimS:310788@cluster0.te74v.mongodb.net/morningnews?retryWrites=true&w=majority',
options,        
   function(err) {
    if(err){
    console.log(err);
     } else {
     console.log('____________BDD OK_________________')
     }
   }
)

module.exports = mongoose