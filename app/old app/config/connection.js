var mysql  = require('mysql');
var connection;

if(process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'burgers_db'
    });
};

connection.connect(function(err){
    if(err) throw err;
    console.log('Connect to database with id:',connection.threadId)
});

module.exports = connection;