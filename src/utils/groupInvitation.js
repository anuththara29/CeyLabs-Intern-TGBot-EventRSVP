const config = require('../config');

const inviteUserToGroup = async (ctx, userId) => {
    try {
        // Check if the user is already in the group
        const chatMember = await ctx.telegram.getChatMember(config.group_id, userId);
        
        if (chatMember.status === 'member' || chatMember.status === 'administrator' || chatMember.status === 'creator') {
            ctx.reply('You are already in the group.');
        } else {
            // Create an invite link
            const inviteLink = await ctx.telegram.createChatInviteLink(config.group_id, {
                member_limit: 1, // Ensuring only one user can use this link
                expire_date: Math.floor(Date.now() / 1000) + 60 * 60 // Link expires in 1 hour
            });

            // Send the invite link to the user
            ctx.reply(`Here is your invite link to the group: ${inviteLink.invite_link}`);
        }
    } catch (error) {
        console.error('Error inviting user to the group:', error);
        ctx.reply('There was an error adding you to the group. Please contact support.');
    }
};

module.exports = { inviteUserToGroup };
