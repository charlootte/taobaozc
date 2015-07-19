var db = require('./db');
var ObjectID = require('mongodb').ObjectID;

function User(user) {
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
}

module.exports = User;

//存储用户信息
User.prototype.save = function(callback) {
    //要存入数据库的用户文档
    var user = {
        email:this.email,
        username: this.username,
        password: this.password
    };
    //打开数据库
    console.log("indb");
     db.open(function (err, db) {
        if (err) {
            return callback(err); //错误， 返回err信息
        }
        //读取 customs 集合
        db.collection('user', function (err, collection) {
            if (err) {
                db.close();
                return callback(err); //错误， 返回 err 信息
            }
            //将用户数据插入 users 集合
            collection.insert(user, {
                safe: true
            }, function (err, user) {
                db.close();
                if (err) {
                    return callback(err); //错误， 返回 err 信息
                }

                //callback(null, user[0]); //成功！err为null，并返回存储后的用户文档
            });
        });
    });
};

//读取用户信息(用户名)
User.get = function(username, callback) {
    //打开数据库
    db.open(function(err, db) {
        if (err) {
            return callback(err); //错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('user', function(err, collection) {
            if (err) {
                db.close();
                return callback(err); //错误，返回 err 信息
            }
            //查找用户名（name键）值为 name 一个文档
            collection.findOne({
                username: username
            }, function(err, user) {
                db.close();
                if (err) {
                    return callback(err); //失败！返回 err 信息
                }
                callback(null, user); //成功！返回查询的用户信息
            });
        });
    });
};
