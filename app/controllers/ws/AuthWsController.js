const url = require('url');
const userInfoRepository = require('./../../repositories/UserInfoRepository');

var messageIndex = 0;

function createMessage(type, user, data) {
    messageIndex++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
}

function onConnect() {
    let user = this.user;
    let msg = createMessage('join', user, `${user.name} joined.`);
    this.wss.broadcast(msg);

    // build user list:
    let users = [];

    this.wss.clients.forEach(function (client) {
        users.push(client.user);
    });

    this.send(createMessage('list', user, users));
}


function onMessage(message) {
    console.log('[onMessage]' + this.user.name + ':' + message);
    if (message && message.trim()) {
        let msg = createMessage('chat', this.user, message.trim());
        this.wss.broadcast(msg);
    }
}

function onClose() {
    console.log('[onClose]' + this.user.name + ':leave');
    let user = this.user;
    let msg = createMessage('leave', user, `${user.name} is leave.`);
    this.wss.broadcast(msg);
}

function onError(err) {
    console.log('[WebSocket] error: ' + err);
}


/**
 * 登录后才可链接的socket
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
exports.auth = async (ctx, next) => {
    console.log('[connection]: ' + ctx.path);

    let uid = ctx.params.uid;
    console.log('[uid]:' + uid);

    try {
        let userResult = await userInfoRepository.findById(uid);
        if (!userResult) {
            ctx.throw('用户不存在.');
        }

        let user = {
            id: userResult.id,
            email: userResult.email,
            name: userResult.name,
            nick: userResult.nick,
            icon: userResult.icon,
        };

        let wss = ctx.app.ws.server;

        wss.broadcast = function broadcast(data) {
            wss.clients.forEach(function each(client) {
                client.send(data);
            });
        };

        ctx.websocket.on('message', onMessage);
        ctx.websocket.on('close', onClose);
        ctx.websocket.on('error', onError);
        ctx.websocket.user = user;
        ctx.websocket.wss = wss;

        onConnect.apply(ctx.websocket);

    } catch (err) {
        ctx.websocket.close();
    }
};