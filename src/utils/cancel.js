const { getUser, removeUser } = require('./database');

const cancelTicket = async (ctx) => {
    const userId = ctx.from.id;
    const user = getUser(userId);

    if (user) {
        removeUser(userId);
        ctx.reply('Your ticket has been successfully canceled.');
    } else {
        ctx.reply('No ticket found to cancel.');
    }
};

module.exports = { cancelTicket };

