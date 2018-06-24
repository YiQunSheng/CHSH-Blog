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
    client.query(articleSQL.recommendArticle,function (err,results) {
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
                    console.log(tagsInfo);
                    res.render('mdindex.ejs',{fourArticles:fourArticles,tags:tagsInfo});
                }
            })
        }
    })

});

router.get('/page',function(req,res){
    res.render('pageTest.ejs', null);
});
router.get('/movies',function(req,res){
    res.render('moviePage.ejs', null);
});
router.get('/movieDetail/:movieId',function (req,res) {
     var movieId=req.params.movieId;
      res.render('movieDetail.ejs',{movieId:movieId});
});

router.get('/aboutUS',function(req,res){
    res.render('aboutUs.ejs', null);
});
router.get('/mdl',function (req,res) {
    res.redirect('http://www.getmdl.io')
});
router.get('/dashboard',function (req,res) {
    res.render('dashBoard.ejs', null);
});

router.get('/dashboardArticle', function (req, res) {
    client.query(articleSQL.queryAll,function(err,result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        console.log(result);
        res.render('dashBoard.ejs', {articles:result});

    });
});

//导出这个路由并在app.js中通过app.use('/', routes)加载
module.exports = router;
