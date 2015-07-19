var express = require('express');
var router = express.Router();
var Project = require('../models/project.js');
var User = require('../models/user.js');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer  = require('multer');
router.use(multer({ dest: './public/images'}));


//登录
router.get('/login',function(req,res){
    res.render('login');
});

//登录验证
router.post('/mylogin',function(req, res){
    var password = req.body.password;
    User.get(req.body.username, function (err, user) {
        if (!user) {
            return res.send({
                isChecked: false,
                text: 'user is not exist'
            });
        }
        if (user.password != password) {

            return res.send({
                isChecked: false,
                text: 'password erro'
            });
        }

       // req.session.user = user;
        res.send({
            isChecked: true
        });
    });
});


//注册
router.get('/register',function(req,res){
    res.render('register');
});

//注册存储用户信息
router.post('/userSave',function(req,res){
    console.log("receive ajax");
    var user = new User({
      email: req.body.email,
      username:req.body.username,
      password:req.body.password
    });
    console.log(user);
    user.save();
    console.log("already save");
    //res.send("success");
});

//浏览项目
router.get('/scan', function (req, res) {
    res.render('scan');
});

//浏览项目取得数据
router.get('/index.js', function (req, res) {
    var pro = req.query.q;
    Project.getOne(pro,function (err, proname) {
        if (err) {
            console.log(err);
        }
        res.send(proname);
    });
});

//发起项目
router.get('/startPro', function (req, res) {
    res.render('startPro');
});

//发起项目存储信息
router.post('/startPro', function(req, res) {
    var date = new Date();
    console.log(req.files);
    // 上传文件的临时路径
    var tmp_path = req.files.upImg.path;
    // 移动至硬盘路径
    var target_path = './public/images/' + req.files.upImg.originalname;
    // 移动文件
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // 删除临时文件
        fs.unlink(tmp_path, function() {
            if (err) throw err;
        });
    });

    var newPro = new Project({
        proType:req.body.proType.selected,
        proName: req.body.proName,
        proTitle: req.body.proTitle,
        proDescribe:req.body.proDescribe,
        during:req.body.during,
        goalMoney:req.body.goalMoney,
        currentMoney:0,
        startTime:date,
        supportNum:0,
        finishTime:0,
        perSupport : {
            payBack1 : req.body.payBack1,
            payBack2 : req.body.payBack2,
            payBack3 : req.body.payBack3
        },
        img:[req.files.upImg.originalname]
    });
    newPro.save();
});

//预览项目
router.get('/preScan',function(req,res){
    res.render('preScan');
});

//首页
router.get('/so',function(req,res){
    res.render('so');
});

//项目详情页
router.get('/detail',function(req,res){
    res.render('detail');
});

//获取所有项目
router.get('/getprolist', function(req, res) {
    Project.get(function(err,project) {

        if (err) {
            return res.redirect('/');
        };

        res.send(project);
    })
});

//支持项目
router.post('/supportPro',function(req, res){
    var id = req.body._id,
        sNum = req.body.sptNum,
        money = req.body.money;
    Project.update(id,money,sNum,function(err,pro){
        if (err) {
            return res.redirect('/');
        };
        res.send("success");
    })

})


module.exports = router;
