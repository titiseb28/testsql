var express = require('express');
var router = express.Router();
var sql = require('../db.js');
var jwt = require('jsonwebtoken');
var mySecret = require('../secret') // phrase secrete


const jwtExpirySeconds = 100 // temps d'expiration du token en seconde

// faire le login et passe en sql et codage passe

router.post('/', (req, result) => {
    let login = req.body.login;
    let passe = req.body.passe;
    if (login && passe) {
        sql.query('SELECT * FROM users WHERE login = ? AND passe = ?', [login, passe], (err, res) => {
            if (res.length > 0) {
                let iat = Math.floor(Date.now() / 1000)
                let exp = iat + jwtExpirySeconds

                // création d'un token
                var token = jwt.sign({
                    username: 'login'
                }, mySecret, {
                    algorithm: 'HS256',
                    expiresIn: jwtExpirySeconds
                });
                result.send({
                    token: token,
                    iat: iat,
                    exp: exp
                });
            } else {
                result.send('Incorrect Username and/or Password!');
            }
            result.end();


        });
    } else {
        result.send('Please enter Username and Password!');
        result.end();
    }
})

module.exports = router;