const { addUser } = require('./database');
const { inviteUserToGroup } = require('./groupInvitation');

const collectUserInfo = async (ctx) => {
    if (!ctx.session) ctx.session = {};
    ctx.session.step = 'name';
    ctx.reply('Please enter your name:');
};

//validate email
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const handleUserResponse = async (ctx) => {
    if (!ctx.session) ctx.session = {};
    const step = ctx.session.step;

    console.log('Current step:', step);

    if (step === 'name') {
        ctx.session.name = ctx.message.text;
        ctx.reply('Please enter your email:');
        ctx.session.step = 'email';
    } else if (step === 'email') {
        const email = ctx.message.text;
        if (validateEmail(email)) {
            ctx.session.email = email;
            ctx.reply('Please enter the number of tickets:');
            ctx.session.step = 'tickets';
        } else {
            ctx.reply('Invalid email format. Please enter a valid email:');
        }
    } else if (step === 'tickets') {
        ctx.session.tickets = ctx.message.text;
        ctx.session.step = 'completed';

        const userId = ctx.from.id;
        const ticketId = `TICKET-${Math.random().toString(36).substr(2, 9)}`;

        // Save user info and ticket details to the database
        addUser(userId, {
            name: ctx.session.name,
            email: ctx.session.email,
            tickets: ctx.session.tickets,
            ticketId: ticketId
        });

        console.log(`User info saved for userId ${userId}:`, ctx.session);

        ctx.reply(`Thank you, ${ctx.session.name}. You have requested ${ctx.session.tickets} ticket(s). Your ticket ID is ${ticketId}.`);

        // Add the user to the group
        inviteUserToGroup(ctx, userId);
    }
};

module.exports = { collectUserInfo, handleUserResponse };
