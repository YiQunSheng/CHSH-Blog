var express = require('express');
var dbConfig = require('../db/DBConfig');
var articleSQL = require('../db/articlesql');
var mysql = require('mysql');
var session = require('express-session');
var client = mysql.createConnection(dbConfig.mysql);
var router = express.Router();

router.get('/', function (req, res) {
    res.send('respond with a resource');
});
// 写文章页面
router.get('/writeArticle', function (req, res) {
    res.render('writearticle.ejs', null);
});
// 所有文章页面
router.get('/articlePage', function (req, res) {
    client.query(articleSQL.queryAll,function(err,result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        console.log(result);
        res.render('mdarticle.ejs', { title: 'Express' ,passages:result});

    });
});
router.get('/articleDetail',function (req,res) {
    res.render('articledetail.ejs',null);
})
// 提交文章
router.post('/submitArticle', function (req, res) {
    console.log(req.body);
    var para = req.body;
    var title = para.title;
    var author = para.author;
    var content = para.content;
    var date = para.writeDate;
    client.query(articleSQL.insert, [title, author, content, date], function (err, results) {
        if (err) {
            // res.send("submit article failed");
            console.log("存储数据库失败");
            console.log(err.message);
        }
        else {
            console.log("存储article成功")
            // res.send("ok!");
            res.redirect('/');
        }
    })
    // res.send("hello");
    //
})
//返回所有文章的json
router.get('/getPage', function (req, res) {
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    console.log(req.query.page);
    client.query(articleSQL.queryPage,[page,size], function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);

            return;
        }
        res.set("Access-Control-Allow-Origin","*")
        res.send(result);

    });
})
module.exports = router;