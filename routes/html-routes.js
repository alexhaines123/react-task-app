const path = require('path'),
    mysql = require('mysql2');

module.exports = function(app, connection) {
    app.get('/lists/', function(req, res) {
        connection.query('SELECT listId, name FROM `lists`;', function(err, data) {
            (err)?res.send(err):res.json({lists:data})
        })
    });

    app.post('/lists/:id/', function(req, res) {
        const name = req.body.name,
            id = req.params.id
        connection.query('UPDATE `lists` SET name = ? WHERE listId = ?;', [name, id], function(err) {
            console.log(err);
            (err)?res.send(err):res.json({success:true})
        })
    });

    app.put('/lists/', function(req, res) {
        const name = req.body.name;
        connection.query('INSERT INTO `lists` (name) VALUES (?);', [name], function(err) {
            console.log(err);
            (err)?res.send(err):res.json({success:true})
        })
    });

    app.delete('/lists/:id/', function(req, res) {
        const id = req.params.id;
        connection.query('DELETE FROM `lists` WHERE listId = ?;', [id], function(err) {
            console.log(err);
            (err)?res.send(err):res.json({success:true})
        })
    });

    app.get('/lists/:id/tasks/', function(req, res) {
        const id = req.params.id;
        connection.query('SELECT taskId, name, description, listId FROM tasks WHERE listId = ?;', [id], function(err, data) {
            console.log(data);
            (err)?res.send(err):res.json({tasks:data})
        })
    });

    app.post('/tasks/:id/', function(req, res) {
        const { name, description } = req.body,
            id = req.params.id;
        connection.query('UPDATE `tasks` SET name = ?, description = ? WHERE taskId = ?;', [name, description, id], function(err) {
            console.log(err);
            (err)?res.send(err):res.json({success:true})
        })
    });

    app.put('/lists/:id/tasks/', function(req, res) {
        const { name, description } = req.body,
            id = req.params.id;
        connection.query('INSERT INTO `tasks` (name, description, listId) VALUES (?, ?, ?);', [name, description, id], function(err) {
            console.log(err);
            (err)?res.send(err):res.json({success:true})
        })
    });

    app.delete('/tasks/:id/', function(req, res) {
        const id = req.params.id;
        connection.query('DELETE FROM `tasks` WHERE taskId = ?;', [id], function(err) {
            console.log(err);
            (err)?res.send(err):res.json({success:true})
        })
    });

    app.post('/tasks/:id/move/', function(req, res) {
        const { listId } = req.body,
            id = req.params.id;
        connection.query('UPDATE `tasks` SET listId = ? WHERE taskId = ?;', [listId, id], function(err) {
            console.log(err);
            (err)?res.send(err):res.json({success:true})
        })
    });

}