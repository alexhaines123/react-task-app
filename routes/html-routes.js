const path = require('path'),
    mysql = require('mysql');

module.exports = function(app, connection) {
    app.get('/', function(req, res) {
        connection.query('SELECT * FROM `task-board`.boards', function(err, data) {
            (err)?res.send(err):res.json({boards:data})
        })
    })
}