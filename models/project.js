var db = require('./db');
var ObjectID = require ('mongodb').ObjectID;

function Project(project) {
	this.proType = project.proType;
	this.proName = project.proName;
	this.proTitle = project.proTitle;
	this.proDescribe = project.proDescribe;
	this.during = project.during;
	this.goalMoney = project.goalMoney;
	this.currentMoney = project.currentMoney;
	this.supportNum = project.supportNum;
	this.startTime = project.startTime;
	this.finishTime = project.finishTime;
	this.username = project.username;
	this.perSupport = {
		payBack1 :project.perSupport.payBack1,
		payBack2 :project.perSupport.payBack2,
		payBack3 :project.perSupport.payBack3
	};
	this.img = project.img;
}

module.exports = Project;

//存储项目信息
Project.prototype.save = function (callback) {
	//计算项目结束时间
	function finishT(dur){
		var now = new Date();
		var n = now.getDate();
		var d = parseInt(dur);
		now.setDate(n+d);
		return now;
	}
	//要存入数据库的文档
	var project = {
		proType : this.proType,
		proName : this.proName,
		proTitle :this.proTitle,
		proDescribe :this.proDescribe,
		during : this.during,
	    goalMoney : this.goalMoney,
		currentMoney:this.currentMoney,
		supportNum:this.supportNum,
	    startTime : this.startTime,
		finishTime : finishT(this.during),
		username : this.username,
		perSupport:{
			payBack1 : this.perSupport.payBack1,
			payBack2 : this.perSupport.payBack2,
			payBack3 : this.perSupport.payBack3
		},
		img:this.img
	};
    console.log(project);
	//打开数据库
	db.open(function(err, db) {
		if (err) {
			throw err; //错误， 返回err信息
		}else{
			db.collection('project', function(err, collection) {
				if (err) {
					db.close();
					throw err; //错误， 返回 err 信息
				}else{
					collection.insert(project,{safe:true});
				}
			});
		}
		//读取 project 集合

	});
};
//获取项目信息
//Project.prototype.get = function(callback) {
//	var pname = this.proName;
//    //打开数据库
//    db.open(function(err, db) {
//        if (err) {
//            throw err; //错误，返回 err 信息
//        }else{
//			//读取 project 集合
//			db.collection('project', function(err, collection) {
//				if (err) {
//					throw err; //错误，返回 err 信息
//				}else{
//					//查找用户名（proName键）值为 proName 一个文档
//					collection.find({proName:pname}).toArray(function(err,docs){
//						if(err) throw err;
//						else{
//
//							db.close();
//						}
//						callback(null,doc);
//
//					});
//				}
//			});
//		}
//    });
//};
Project.getOne = function(proname,callback) {
	//打开数据库
	db.open(function (err, db) {

		if (err) {
			return callback(err);
		}
		//读取 articles 集合
		db.collection('project', function(err, collection) {
			if (err) {
				db.close();
				return callback(err);
			}
			collection.findOne({
				proName:proname
			},function(err, doc){
				db.close();
				if (err) {
					return callback(err);//失败！返回 err
				}
				callback(null, doc);//成功！以数组形式返回查询的结果
			});

		});
	});
};

//获取项目信息
Project.get = function(callback) {
	//打开数据库
	db.open(function(err, db) {
		if(err) {
			return callback(err);
		}
		db.collection('project', function (err, collection) {
			if(err) {
				db.close();
				return callback(err);
			}
			collection.find({}).toArray(function (err, project) {
				db.close();
				if (err) {
					return callback(err);
				}
				callback(null,project);
			});
		});
	});
};

//更新项目信息
Project.update = function(_id, money, sptNum, callback) {

	//打开数据库
	db.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		//读取 project 集合
		db.collection('project', function (err, collection) {
			if (err) {
				db.close();
				return callback(err);
			}
			//更新项目已筹金额与支持人数
			collection.update({
				"_id": new ObjectID(_id)
			}, {
				$set: {
					currentMoney: money,
					supportNum: sptNum
				}
			}, function (err) {
				db.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
};

//删除项目信息
Project.delete = function(_id,callback){
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('project', function (err, collection) {
			if(err) {
				db.close();
				return callback(err);

			}
			collection.remove({
				"_id": new ObjectID(_id)
			},{
				w:1
			},function(err){
				db.close();
				if (err) {
					return callback(err);//失败！返回 err
				}
				callback(null);//成功
			});
		});
	});

};
