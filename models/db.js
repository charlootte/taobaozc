
var mongodb = require('mongodb'),
    host = "localhost",
    port = 27017;
var server = new mongodb.Server(host, port, {auto_reconnect:true});
var db=new mongodb.Db('taobao',server, {safe: true});

module.exports = db;

 
 	

 