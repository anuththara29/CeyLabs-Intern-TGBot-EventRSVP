const fs = require('fs');
const path = require('path');

const databaseFilePath = path.join(__dirname, '..', 'database.json');

const readDatabase = () => {
    if (!fs.existsSync(databaseFilePath)) {
        // If the file doesn't exist, return an empty structure
        return { users: {} };
    }

    const data = fs.readFileSync(databaseFilePath, 'utf8');
    return JSON.parse(data);
};

const writeDatabase = (data) => {
    fs.writeFileSync(databaseFilePath, JSON.stringify(data, null, 2), 'utf8');
};

const addUser = (userId, userInfo) => {
    const db = readDatabase();
    db.users[userId] = userInfo;
    writeDatabase(db);
};

const getUser = (userId) => {
    const db = readDatabase();
    return db.users[userId];
};

const removeUser = (userId) => {
    const db = readDatabase();
    if (db.users[userId]) {
        delete db.users[userId];
        writeDatabase(db);
        return true; // User removed successfully
    }
    return false; // User not found
};

module.exports = {
    addUser,
    getUser,
    removeUser
};
