var express = require('express');
var router = express.Router();
var sql = require('../db.js');
var jwt = require('jsonwebtoken');
var mySecret = require('../secret') // phrase secrete
var crypto = require('crypto');
const jwtExpirySeconds = 100 // temps d'expiration du token en seconde

function crypt(passe) {

    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
        .update(passe)
        .digest('hex');
    return hash    
}

router.post('/signin', (req, result) => {
    let login = req.body.login;
    let passe = req.body.passe;
    if (login && passe) {
        let codeHash = crypt(passe)
        sql.query('SELECT * FROM users WHERE login = ? AND passe = ?', [login, codeHash], (err, res) => {
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
                    id: res[0].id,
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

router.post('/signup', (req, result) => {
    let login = req.body.login;
    let passe = req.body.passe;
    let codeHash = crypt(passe)
    if (login && passe) {
        sql.query("INSERT INTO users ( login , passe ) VALUE ( ? , ? )", [req.body.login, codeHash], (err, res) => {
            if (err) {
                console.log("error: ", err)
                result.status(400).send(err)
            }
            else {
                console.log(res.insertId)
                result.send(res)
            }
        })
    } else {
        result.send('Incorrect Username and/or Password!');
    }
})

module.exports = router;