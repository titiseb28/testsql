var express = require('express');
var router = express.Router();
var sql = require('../db.js');

router.get('/', (req, result) => {
    sql.query("Select * from tasks", (err, res) => {

        if (err) {
            console.log("error: ", err);
            result.status(400).send(err);
        }
        else {
            console.log('tasks : ', res);

            result.send(res);
        }
    });
})

router.get('/:id', (req, result) => {
    sql.query("Select * from tasks where id = ?", req.params.id, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result.status(400).send(err);
        }
        else {
            console.log('tasks : ', res);
            if (res.length >= 1) {
                result.send(res);
            } else result.send('Not Found')
        }
    });
})

router.delete('/:id', (req, result) => {
    sql.query("DELETE FROM tasks WHERE id = ?", req.params.id, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result.status(400).send(err);
        }
        else {
            if (res.affectedRows >= 1) {
                result.send(res);
            } else result.send('Not Found')
        }
    });
})

router.put('/:id', (req, result) => {
    let date = new Date()
    sql.query("UPDATE tasks SET task = ? ,status = ? , created_at = ? WHERE id = ?", [req.body.task, req.body.status, date ,req.params.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result.status(400).send(err);
        }
        else {
            result.send(res);
        }
    });
})

router.post('/', (req, result) => {
    sql.query("INSERT INTO tasks set ?", req.body, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result.status(400).send(err)
        }
        else {
            console.log(res.insertId)
            result.send(res)
        }
    })

})



module.exports = router;