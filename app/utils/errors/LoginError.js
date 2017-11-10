/**
 * 逻辑错误
 * @param {string} message
 */
class LoginError extends Error {

    constructor(message) {
        super(message);
    }
}

module.exports = LoginError;