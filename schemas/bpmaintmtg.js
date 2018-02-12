var mongoose = require('mongoose');

var bpmaintmtgSchema = new mongoose.Schema({
    poster: String,
    bage_number: String,
    first_name: String,
    last_name: String,
    l_issue: String,
    l_issue_des: String,
    safety_talk: String,
    safety_talk_des: String,
    title: String,
    doctor: String,
    language: String,
    summary: String,
    flash: String,
    poster: String,
    // meta 更新或录入数据的时间记录
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        },
    }
});

// bpmaintmtgSchema.pre 表示每次存储数据之前都先调用这个方法
bpmaintmtgSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

// bpmaintmtgSchema 模式的静态方法
bpmaintmtgSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

// 导出bpmaintmtgSchema模式
module.exports = bpmaintmtgSchema;

