var mongoose = require('mongoose');
var bpmaintmtgSchema = require('../schemas/bpmaintmtg.js'); //引入'../schemas/bpmaintmtg.js'导出的模式模块

// 编译生成bpmaintmtg模型
var bpmaintmtg = mongoose.model('bpmaintmtg', bpmaintmtgSchema);

// 将bpmaintmtg模型[构造函数]导出
module.exports = bpmaintmtg;