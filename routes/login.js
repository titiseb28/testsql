var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mySecret = require('../secret') // phrase secrete


const jwtExpirySeconds = 100 // temps d'expiration du token en seconde

router.post('/', (req, res) => {
    if (req.body.login == "login" && req.body.passe == "mdp") {
        let iat = Math.floor(Date.now()/ 1000)
        console.log(iat)
        let exp = iat + jwtExpirySeconds

        // création d'un token
        var token = jwt.sign({
            username: 'login'
        }, mySecret, {
            algorithm: 'HS256',
            expiresIn: jwtExpirySeconds
          } );
        res.send({
            token: token,
            iat: iat,
            exp: exp
        });
    } else res.send("login false")
})

module.exports = router;