var express = require('express');
var dbConfig=require('../db/DBConfig');
var user=require('../db/usersql');
var mysql=require('mysql');
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
        // var table = '<table><th>id</th><th>name</th><th>pwd</th>';
        // for(var i=0;i<result.length;i++){
        //    table= table.concat('<tr>','<td>',result[i].userid,'</td>','<td>',result[i].username,'</td>','<td>',result[i].password,'</td>','</tr>')
        // }
        // res.send(result);
        res.render("testMysql.ejs",{table:result});

    });
})

router.post('/reg',function(req,res,next){
    /*if(req.method==="POST"){
        var param=req.body;
    }else{
        var param=req.query ||req.params;
    }
    client.query(user.getUserByOpenid,[param.userid],function(err,results){
        if(err){
            throw err;
        }else{
            if(results.length===0){
                client.query(user.insert,[param.userid,param.username,param.password],function(err,result){
                    if(err){
                        throw err;
                    }
                    else{
//    				   res.end(JSON.stringify({status:'100',msg:'注册成功!'}));
                        res.send("注册成功！");
                    }
                });
            }
            else{ // 数据库存在就注册失败
//                  res.end(JSON.stringify({status:'101',msg:'该用户名已经被注册'}));
                res.send("该用户名已经被注册 ");
            }
        }

    });*/
    // console.log(req.body);
    var para = req.body;
    client.query(user.getUserByOpenid,[para.userid],function(err,results){
        if(err){
            throw err;
        }
        else {
            if(results.length===0){
                client.query(user.insert,[para.userid,para.username,para.password,'visitor'],function(err,result){
                    if(err)
                        throw err;
                    else {
                        res.send("register success");
                    }
                })}
            else {
                res.send("已被注册")
            }
        }
    })
});

router.post('/login',function(req,res){
    var para =req.body;
    client.query(user.getUserByOpenid,[para.userid],function(err,results){
        if(err){
            throw err;
        }
        else {
            if(results.length===1)
            {
                if(results[0].password===para.password){
                    //Session用来存储用户信息
                    req.session.user=results[0].username;
                    console.log("You session is "+req.session.user)
                    // res.render("navi.ejs",{username:results[0].username});
                    res.render("loginSuccess.ejs",{
                        name:results[0].username,
                        user:req.session.user

                    })
                }
                else
                    res.send("Wrong Password");
                // res.send("success ！ hello"+results[0].username);
            }
            else {
                res.send("user not found")
            }
        }
    })
})
module.exports = router;
