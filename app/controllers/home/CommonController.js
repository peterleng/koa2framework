const upload = multer({dest: 'uploads/'});

/**
 * 上传
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
module.exports.upfile = async (ctx, next) => {
    upload.single('avatar');
};