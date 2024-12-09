 const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "VAJIRA-MD=LIll0A4J#lt0Brr6GJ8TMK6B0WrYR6cYSqHUjP2hy6Y4M3Xo8j5k",
    MONGODB: process.env.MONGODB || "enter mongodb here",
    OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39", // omdbapi.com
};
