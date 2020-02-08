var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// 数据库操作
var mongoose = require("mongoose");
// 连接数据库    douyu-web是数据库的名字
// 有这个数据库就使用这个数据库，没有就会创建这个数据并使用
mongoose.connect("mongodb://localhost:27017/douyu-web");
// 获取连接对象
var db = mongoose.connection;
db.on("open", function () {
    console.log("数据库连接成功");
})
db.on("error", function () {
    console.log("数据库连接失败");
    console.log(arguments);
})
// 图表结构对象
var Schema = mongoose.Schema;
var userSchema = new Schema({
    tel: String,
    password: String,
})
var User = mongoose.model('User', userSchema);

var str = ''
app.get("/yzm",(req,res)=>{
    str = Math.floor(Math.random()*1000000)
    res.status(200).send(str.toString())
    // console.log(str);
})
app.post("/login",(req,res)=>{
    User.find(function(err,data){
        for(var i = 0; i < data.length; i++){
            if(req.body.tel != data[i].tel){
                res.status(200).json({
                    msg: "手机号不正确请重新输入",
                    telError: true
                })
                return
            }else if(req.body.password != data[i].password){
                res.status(200).json({
                    msg: "密码不正确请重新输入",
                    pwdError: true
                })
                return
            }else{
                res.status(200).json({
                    msg: "登录成功",
                    code: 1,
                    Error: false
                })
                return
            }
        }
    })
})

app.post("/reg", (req, res) => {
    // 数据库添加数据
    var us = new User({
        tel: req.body.tel,
        password: req.body.password,
    })
    User.find(function (err, data) {
        for (var i = 0; i < data.length; i++) {
            if (us.tel == data[i].tel) {
                res.status(200).send("该手机号已被注册")
                return;
            }
        }
        us.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send("注册成功")
                console.log(arguments);
            }
        })
    })
})


app.listen(3000, () => {
    console.log("running.....");
})