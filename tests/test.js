const { Telegraf } = require('telegraf');
const { collectUserInfo, handleUserResponse } = require('../src/utils/registration');
const { cancelTicket } = require('../src/utils/cancel'); 
const { addUser } = require('../src/utils/database'); 

const bot = new Telegraf('6571122310:AAE2Orcpy0_riiA4hpgOBst0pr45O8nzuls');

// Mock context object for testing purposes
const mockContext = {
    from: { id: 12345 }, 
    message: { text: '' }, 
    reply: (message) => console.log('Bot Reply:', message) 
};

// Test user registration
const testUserRegistration = async () => {
    console.log('Starting user registration test...');
    await collectUserInfo(mockContext);
    mockContext.message.text = 'John Doe'; 
    await handleUserResponse(mockContext);
    mockContext.message.text = 'john.doe@example.com'; 
    await handleUserResponse(mockContext);
    mockContext.message.text = '2'; 
    await handleUserResponse(mockContext);
    console.log('User registration test completed.');
};

// Test ticket cancellation
const testTicketCancellation = async () => {
    console.log('Starting ticket cancellation test...');
    await cancelTicket(mockContext);
    console.log('Ticket cancellation test completed.');
};

// Test database functionality
const testDatabase = () => {
    console.log('Starting database test...');
    addUser(12345, { name: 'John Doe', email: 'john.doe@example.com', tickets: 2, ticketId: 'TICKET-123' });
    console.log('User added to database.');
    console.log('Database test completed.');
};

// Run tests
testUserRegistration()
    .then(() => testTicketCancellation())
    .then(() => testDatabase())
    .then(() => console.log('All tests completed.'))
    .catch((error) => console.error('Error during testing:', error));
