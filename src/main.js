const { Telegraf, session } = require('telegraf');
const { eventInfo } = require('./utils/eventInfo');
const { collectUserInfo, handleUserResponse } = require('./utils/registration');
const { cancelTicket } = require('./utils/cancel');
const config = require('./config.json');

const bot = new Telegraf(config.BOT_TOKEN);

// Use session middleware
bot.use(session({
    defaultSession: () => ({ step: null })
}));

// Start command
bot.start((ctx) => {
    ctx.reply(`Welcome to the Event Ticketing Bot!\n\n${eventInfo}`);
});

// Help command
bot.command('help', (ctx) => {
    ctx.reply(`Here are the available commands:\n\n` +
        `/start - Start the bot and get event details.\n` +
        `/register - Register for a ticket to the event.\n` +
        `/cancel - Cancel your ticket registration.\n` +
        `/help - Get help and usage instructions.`);
});

// Register command
bot.command('register', (ctx) => {
    collectUserInfo(ctx);
});

// Cancel command
bot.command('cancel', (ctx) => {
    cancelTicket(ctx);
});

// Handle user responses
bot.on('text', (ctx) => {
    if (ctx.session.step) {
        handleUserResponse(ctx);
    } else {
        ctx.reply('Please use the /register command to start the registration process.');
    }
});

// Handle errors
bot.catch((err, ctx) => {
    console.error(`Error for ${ctx.updateType}`, err);
});

// Start the bot
bot.launch().then(() => {
    console.log('Bot started');
});
