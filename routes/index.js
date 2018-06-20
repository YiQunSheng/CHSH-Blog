var express = require('express');
var router = express.Router();
var dbConfig=require('../db/DBConfig');
var articleSQL = require('../db/articlesql');
var mysql=require('mysql');
var session = require('express-session');
var client=mysql.createConnection(dbConfig.mysql);

/* GET home page. */
router.get('/', function(req, res, next) {
    var fourArticles;
    client.query(articleSQL.queryFour,function (err,results) {
        if(err)
            throw err;
        else{
            fourArticles = results;
            console.log(fourArticles);

            client.query(articleSQL.queryTags,function (err,results2) {
                if(err)
                    throw err;
                else{
                    var tagsInfo = results2;
                    console.log(tagsInfo)
                    res.render('mdindex.ejs',{fourArticles:fourArticles,tags:tagsInfo});
                }
            })
        }
    })

});
// router.get('/reg', function(req, res, next) {
//   res.render('reg', { title: 'Register' });
// });
router.get('/newindex', function (req, res) {
  res.render('index.ejs')
});
router.get('/login', function (req, res) {
    res.render('login.ejs');
});
router.get('/movies', function (req, res) {
    res.render('movies.ejs');
});
router.get('/reg', function(req, res, next) {
    res.render('register.ejs', { title: 'Express' });
});
//render 才能返回一个ejs文件，如果是send则返回文字。 第一个参数是文件名，第二个是ejs渲染的参数。
router.get('/testhtml',function(req,res){
res.render('testhtml', { title: 'Express' });
})
router.get('/page',function(req,res){
    res.render('pageTest.ejs', null);
})
router.get('/aboutUS',function(req,res){
    res.render('aboutUs.ejs', null);
})
router.get('/mdl',function (req,res) {
    res.redirect('http://www.getmdl.io')
})
//导出这个路由并在app.js中通过app.use('/', routes)加载
module.exports = router;
