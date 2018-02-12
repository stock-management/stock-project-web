var express = require('express');  // 加载express模块
var app = express(); // 启动Web服务器

var port = process.env.PORT || 3000; // 设置端口号：3000
app.listen(port); // 监听 port[3000]端口
console.log('Application start on port' + port);

var mongoose = require('mongoose'); // 加载mongoose模块
mongoose.connect('mongodb://localhost:27017/ibpmaintmtg'); // 连接mongodb本地数据库ibpmaintmtg
console.log('MongoDB connection success!');
/*  mongoose 简要知识点补充
* mongoose模块构建在mongodb之上，提供了Schema[模式]、Model[模型]和Document[文档]对象，用起来更为方便。
* Schema对象定义文档的结构（类似表结构），可以定义字段和类型、唯一性、索引和验证。
* Model对象表示集合中的所有文档。
* Document对象作为集合中的单个文档的表示。
* mongoose还有Query和Aggregate对象，Query实现查询，Aggregate实现聚合。
* */

//mysql
var mysql = require('mysql');
var con = mysql.createConnection({
  host: '127.0.0.1:3306',
  user: 'root',
  password: '24february'
});
console.log('MySQL connection success!');
module.exports = function() {
    var connection = mysql.createConnection({
        host               : config.DATABASE_HOST,
        user               : config.DATABASE_USER,
        password           : config.DATABASE_PASS,
        database           : config.DATABASE_NAME,
        multipleStatements : true
    });
    connection.connect(function(err) {
        if (!err) {
            console.log("mysql connected")
        } else {
            console.log("mysql connection lost");
        }
    });
    return connection;
} 
app.locals.moment = require('moment'); // 载入moment模块，格式化日期

var serveStatic = require('serve-static');  // 静态文件处理
app.use(serveStatic('public')); // 路径：public

var bodyParser = require('body-parser');
// 因为后台录入页有提交表单的步骤，故加载此模块方法（bodyParser模块来做文件解析），将表单里的数据进行格式化
app.use(bodyParser.urlencoded({extended: true}));

var _underscore = require('underscore'); // _.extend用新对象里的字段替换老的字段

app.set('views', './views/pages');     // 设置视图默认的文件路径
app.set('view engine', 'jade');  // 设置视图引擎：jade

var bpmaintmtg = require('./models/bpmaintmtg.js'); // 载入mongoose编译后的模型bpmaintmtg

// 编写主要页面路由
// index page 首页
app.get('/', function (req, res) {
    bpmaintmtg.fetch(function (err, bpmaintmtgs) {
        if (err) {
            console.log(err);
        }
        res.render('index', {  // 渲染index 首页
            title: 'AmtopBOPP 首页',
            bpmaintmtgs: bpmaintmtgs
        });
    });
});

// detail page 详情页
app.get('/bpmaintmtg/:id', function (req, res) {
    var id = req.params.id;
    bpmaintmtg.findById(id, function (err, bpmaintmtg) {
        res.render('detail', {
            title: 'i_bpmaintmtg' + bpmaintmtg.title,
            bpmaintmtg: bpmaintmtg
        });
    });
});

// admin page 后台录入页
app.get('/admin/bpmaintmtg', function (req, res) {
    res.render('admin', {
        title: 'AmptopBOPP 后台录入页',
        bpmaintmtg: {
            poster: '',
            bage_number: '',
            first_name: '',
            last_name: '',
            l_issue: '',
            l_issue_des: '',
            safety_talk: '',
            safety_talk_des: '',
        }
    });
});

// admin update bpmaintmtg 后台更新页
app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id;
    if (id) {
        bpmaintmtg.findById(id, function (err, bpmaintmtg) {
            res.render('admin', {
                title: 'AmtopBOPP 后台更新页',
                bpmaintmtg: bpmaintmtg
            });
        });
    }
});

// admin post bpmaintmtg 后台录入提交
app.post('/admin/bpmaintmtg/new', function (req, res) {
    var id = req.body.bpmaintmtg._id;
    var bpmaintmtgObj = req.body.bpmaintmtg;
    var _bpmaintmtg = null;
    if (id !== 'undefined') { // 已经存在的电影数据
        bpmaintmtg.findById(id, function (err, bpmaintmtg) {
            if (err) {
                console.log(err);
            }
            _bpmaintmtg = _underscore.extend(bpmaintmtg, bpmaintmtgObj); // 用新对象里的字段替换老的字段
            _bpmaintmtg.save(function (err, bpmaintmtg) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/bpmaintmtg/' + bpmaintmtg._id);
            });
        });
    } else {  // 新加的电影
        _bpmaintmtg = new bpmaintmtg({
            poster: bpmaintmtgObj.poster,
            bage_number: bpmaintmtgObj.bage_number,
            first_name: bpmaintmtgObj.first_name,
            last_name: bpmaintmtgObj.last_name,
            l_issue: bpmaintmtgObj.l_issue,
            l_issue_des: bpmaintmtgObj.l_issue_des,
            safety_talk: bpmaintmtgObj.safety_talk,
            safety_talk_des: bpmaintmtgObj.safety_talk_des,
        });
        _bpmaintmtg.save(function (err, bpmaintmtg) {
            if (err) {
                console.log(err);
            }
            res.redirect('/bpmaintmtg/' + bpmaintmtg._id);
        });
    }
});

// list page 列表页
app.get('/admin/list', function (req, res) {
    bpmaintmtg.fetch(function (err, bpmaintmtgs) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: 'AmtopBOPP 列表页',
            bpmaintmtgs: bpmaintmtgs
        });
    });
});

// list delete bpmaintmtg data 列表页删除电影
app.delete('/admin/list', function (req, res) {
    var id = req.query.id;
    if (id) {
        bpmaintmtg.remove({_id: id}, function (err, bpmaintmtg) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        });
    }
});
