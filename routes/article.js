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
router.get('/articleDetail/:articleId',function (req,res) {
    var articleId=req.params.articleId;
    client.query(articleSQL.queryByArticleId,[articleId],function(err,result){
        if(err){
            console.log('[QUERY ERROR] - ',err.message);
           return;
        }
            async.waterfall([
                function (callback) {
                    client.query(commentSQL.queryAllByArticleId,[articleId],function (err, results) {
                       console.log("评论长度为："+results.length);
                        var newResults = new Array(); //先声明一维
                        callback(null, results, newResults);
                    });
                },
                function (results,newResults,callback) {
                    results.forEach(function (item, index) {
                        client.query(replySQL.queryAllBycommentId, [item.commentId], function (err, results2) {
                            newResults[index] = new Array();
                            results2.forEach(function (item2, index2) {
                                newResults[index][index2] = results2[index2];
                                console.log(newResults[index][index2].replyContent);
                            });
                        });
                    });
                    setTimeout(function(){
                        // console.log(newResults[0].length);
                        callback(null, results,newResults);
                    },500);
                }
            ],function (err, results,newResults) {

                // console.log("评论长度为"+newResults[0].length);
                //   res.render("index.html", {list: results, list2: newResults});
                // console.log(newResults.length);
                res.render('articledetail.ejs',{articleDetail:result[0],articleComment:results,articleReply:newResults});
            })
        })

});
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
router.post('/getPage', function (req, res) {
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    console.log(req.query.page);
    client.query(articleSQL.queryPage,[page,size], function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);

            return;
        }
       // res.set("Access-Control-Allow-Origin","*")
        res.send(result);

    });
});
//提交评论
router.post('/addComment',function (req,res) {
    var para=req.body;
    console.log(para);
    client.query(commentSQL.insert,[para.commentContent,para.commentAuthor,para.commentTime,parseInt(para.articleId)],function (err,result) {
        if(err)
        // console.log('[INSERT ERROR] - ',err.message);
            throw err;
        else{
            res.send("addComment success");
        }
    })
});
//提交回复
router.post('/addReply',function (req,res) {
    var para=req.body;
    console.log(para);
    client.query(replySQL.insert,[para.replyAuthor,para.beRepliedAuthor,para.replyContent,para.commentId,para.replyTime],function(err,result){
        if(err)
            throw err;
        else{
            res.send("addReply sucess");
        }
    })
})
module.exports = router;