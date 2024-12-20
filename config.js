 const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "youre session id",
    MONGODB: process.env.MONGODB || "enter mongodb here",
    OWNER_NUMBER: process.env.OWNER_NUMBE || "94704243771",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://i.ibb.co/PwTkwNQ/20241209-212640.jpg",
    PREFIX: process.env.PREFIX || ".",
    ANTI_LINK: process.env.ANTI_LINK || "true",
    ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "true",
    ANTI_DELETE: process.env.ANTI_DELETE || "true",
    AUTO_TYPING: process.env.AUTO_TYPING || "true",
    OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39", // omdbapi.com
};
