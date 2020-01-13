var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
    if (req.body.login == "login" && req.body.passe == "mdp") {
        res.send('login ok');
    } else res.send("login false")
})

module.exports = router;