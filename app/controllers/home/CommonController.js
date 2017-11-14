const multer = require('koa-multer');
const fs = require('fs');
const path = require('path');

function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

/**
 * 上传文件
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
module.exports.upfile = async (ctx, next) => {

    try {

        let date = new Date();
        let dirpath = 'upload/' + date.getFullYear() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getDate();
        let dirfullpath = path.join(__dirname, './../../../static/' + dirpath);
        if (!fs.existsSync(dirfullpath)) mkdirsSync(dirfullpath);

        let name = Math.random().toString(16).substr(2);

        let storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'static/' + dirpath)
            },
            filename: function (req, file, cb) {
                name += path.extname(file.originalname);
                cb(null, name)
            }
        });

        let upload = multer({storage: storage});

        let uploaded = await upload.single('upfile');

        let result = await uploaded(ctx, next);

        ctx.response.body = ctx.jsonSuccess({url: ctx.state.config.res_host +'/'+ name, value: dirpath +'/'+ name}, 'success');
    } catch (err) {
        ctx.response.body = ctx.jsonError(err.message, err.code);
    }

};