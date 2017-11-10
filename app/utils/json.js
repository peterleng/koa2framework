/**
 * 响应json返回
 * @type {{success: module.exports.success, error: module.exports.error}}
 */
module.exports = {
    success: function (data, msg) {
        return {success: true, message: msg || '', data: data || null, code: 200};
    },
    error: function (msg, code) {
        if (msg && msg.indexOf('Validation error') > -1) {
            let errors = msg.split(',\n'), last = errors[errors.length - 1];
            if (last && last.indexOf(':') > -1) {
                let arr = last.split(':');
                msg = arr[1] || '系统错误';
            }
        }

        return {success: false, message: msg, data: null, code: code || 400};
    }
};