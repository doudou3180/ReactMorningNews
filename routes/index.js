var express = require('express');
var router = express.Router();
require('../models/article.js');

/* CRYPTAGE DU MOTS DE PASSE */
var uid2 = require("uid2");
var bcrypt = require('bcrypt');

/* MODELE D'UTILISATEURS */
var userModel = require('../models/users')

/* ROUTE POST SIGN UP --------------------------------------------------------*/
router.post('/sign-up', async function (req, res, next) {

  var error = []
  var result = false
  var saveUser = null

  /* GENERER LE HASH */
  const cost = 10;
  const hash = bcrypt.hashSync(req.body.passwordFromFront, cost);

  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })
  
  if (data != null) { error.push('utilisateur déjà présent') }


  if (req.body.usernameFromFront == '' || req.body.emailFromFront == '' || req.body.passwordFromFront == '') { error.push('champs vides') }

  if (error.length == 0) {

    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hash,
      token: uid2(32),
      selectedLang: 'fr'
    })
    saveUser = await newUser.save()

    if (saveUser) {
      result = true
      token = saveUser.token
      selectedLang = saveUser.selectedLang
    }
  }
  res.json({ result, saveUser, error, token })
})


/* ROUTE POST SIGN IN --------------------------------------------------------*/


router.post('/sign-in', async function (req, res, next) {

  var result = false
  var user = null
  var error = []
  var password = req.body.passwordFromFront
  var token = null

  if (req.body.emailFromFront == '' || req.body.passwordFromFront == '') {
    error.push('champs vides')
  }

  user = await userModel.findOne({ email: req.body.emailFromFront })

  if (!user) {
      error.push('email ou mot de passe incorrect')
  }
  if (error.length == 0) {

  if (bcrypt.compareSync(password, user.password)) {
      result = true;
      token = user.token

  } else {
      error.push('email ou mot de passe incorrect')
    }
  }

  res.json({ result, user, error, token })

})

// ROUTE ADD-articles WISHLIST ----------------------------------------------------------------------------------------//

router.post('/screenmyarticles', async function (req, res, next) {
  console.log(req.body)
 var newArticle = new articleModel({
   articleTitle : req.body.title,
   articleDescription: req.body.description,
   articleImg: req.body.img,
 })
var articleSave = await newArticle.save()
  res.json({articleSave, result: true})
});



module.exports = router;
