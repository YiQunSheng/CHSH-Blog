var express = require('express');
var dbConfig = require('../db/DBConfig');
var articleSQL = require('../db/articlesql');
var commentSQL=require('../db/commentsql');
var replySQL=require('../db/replysql');
var mysql = require('mysql');
var session = require('express-session');
var async=require('async');
var client = mysql.createConnection(dbConfig.mysql);
var router = express.Router();
router.get("/articles",function (req,res) {
    res.set("Access-Control-Allow-Origin","*");
    client.query(articleSQL.queryAll,function (err,results) {
        if(err){
            res.status(500);
            res.send("服务器内部错误！");
        }
        else{
            if(results.length!==0) {
                res.status(200);
                res.type('json');
                res.json(results);
            }
            else{
                res.status(404);
                res.send("该资源不存在！");
            }
        }
    })
});
router.get("/article/:id",function (req,res) {
    res.set("Access-Control-Allow-Origin","*");
    var articleId=req.params.id;
    client.query(articleSQL.queryByArticleId,[articleId],function(err,result){
        if(err){
            res.status(500);
            res.send("服务器内部错误！");
        }
        else{
            if(result.length!==0) {
                res.status(200);
                res.type('json');
                res.json(result);
            }
            else{
                res.status(404);
                res.send("该资源不存在！");
            }
        }
    });
});
router.get("/article/:id/articleTitle",function (req,res) {
    res.set("Access-Control-Allow-Origin","*");
    var articleId=req.params.id;
    client.query(articleSQL.queryArticleTitleByArticleId,[articleId],function(err,result){
        if(err){
            res.status(500);
            res.send("服务器内部错误！");
        }
        else{
            if(result.length!==0) {
                res.status(200);
                res.type('json');
                res.json(result);
            }
            else{
                res.status(404);
                res.send("该资源不存在！");
            }
        }
    });
});
router.get("/article/:id/tags",function (req,res) {
    var articleId=req.params.id;
    console.log(articleId);
    client.query(articleSQL.queryTagByArticleId,[articleId],function (err,results) {
        res.set("Access-Control-Allow-Origin","*");
        if(err){
            res.status(500);
            res.send("服务器内部错误！");
        }
        else{
            if(results.length!==0) {
                res.status(200);
                res.type('json');
                res.json(results);
            }
            else{
                res.status(404);
                res.send("该资源不存在！");
            }
        }
    })
});
router.get("/comment/:articleId",function (req,res) {
    res.set("Access-Control-Allow-Origin","*");
    var articleId=req.params.articleId;
    client.query(commentSQL.queryAllByArticleId,[articleId],function (err,results) {
        if(err){
            res.status(500);
            res.send("服务器内部错误！");
        }
        else{
            if(results.length!==0) {
                res.status(200);
                res.type('json');
                res.json(results);
            }
            else{
                res.status(404);
                res.send("该资源不存在！");
            }
        }
    })
});
router.get("/reply/:commentId",function (req,res) {
    res.set("Access-Control-Allow-Origin","*");
    var commentId=req.params.commentId;
    client.query(replySQL.queryAllBycommentId,[commentId],function (err,results) {
        if(err){
            res.status(500);
            res.send("服务器内部错误！");
        }
        else{
            if(results.length!==0) {
                res.status(200);
                res.type('json');
                res.json(results);
            }
            else{
                res.status(404);
                res.send("该资源不存在！");
            }
        }
    })
});

module.exports = router;