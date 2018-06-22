var express = require('express');
var dbConfig=require('../db/DBConfig');
var user=require('../db/usersql');
var mysql=require('mysql');
var articleSQL = require('../db/articlesql');
var session = require('express-session');
var client=mysql.createConnection(dbConfig.mysql);
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getall',function(req,res) {
    client.query(user.queryAll,function(err,result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);

            return;
        }
        res.render("testMysql.ejs",{table:result});
    });
});

router.post('/login',function(req,res){
    var para =req.body;
    console.log(para);
    client.query(user.getUserByOpenid,[para.userid],function(err,results){
        if(err){
            throw err;
        }
        else {
            if(results.length===1)
            {
                if(results[0].password===para.pwd){
                    console.log(results[0]);
                    res.json(results[0]);
                }
                else
                    res.send("Wrong Password");
            }
            else {
                res.send("user not found")
            }
        }
    })
});

router.post('/reg',function(req,res,next){
    var para = req.body;
    client.query(user.getUserByOpenid,[para.userid],function(err,results){
        if(err){
            throw err;
        }
        else {
            if(results.length===0){
                client.query(user.insert,[para.userid,para.userName,para.pwd,'visitor'],function(err,result){
                    if(err)
                        throw err;
                    else {
                        res.send("register success");
                    }
                })}
            else {
                res.send("That id has already been registered")
            }
        }
    })
});
router.get('/registerPage',function (req,res) {
    res.render("register.ejs",null);
});

router.get('/loginPage',function (req,res) {
    res.render("login.ejs",null);
});
router.get('/logout',function (req,res) {
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
                    console.log(tagsInfo);
                    res.render('mdindex.ejs',{fourArticles:fourArticles,tags:tagsInfo});
                }
            })
        }
    })
});


module.exports = router;
