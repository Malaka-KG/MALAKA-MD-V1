const config = require('../config')
const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "ai",
    desc: "ai chat",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let data = await fetchJson(`https://api-vioo.my.id/api/ai/vai?q=${q}`)
return reply(`${data.data}`)
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
  pattern: "msgall",
  alias: ["messageall"], // Optional aliases
  desc: "Send a custom message to all group participants via inbox",
  react: "✉️", // Optional reaction
  category: "group",
  filename: __filename
}, async (conn, message, chat, { 
  isGroup, 
  isBotAdmins, 
  isAdmins, 
  args, 
  reply, 
  groupMetadata 
}) => {
  try {
    // Check if the command is used in a group
    if (!isGroup) {
      return reply("❌ This command can only be used in groups!");
    }

    // Check if the bot is an admin
    if (!isBotAdmins) {
      return reply("❌ I need to be a group admin to perform this action!");
    }

    // Check if the user is an admin
    if (!isAdmins) {
      return reply("❌ Only group admins can use this command!");
    }

    // Check if a message is provided
    const customMessage = args.join(" ");
    if (!customMessage) {
      return reply("❌ Please provide a message to send!");
    }

    // Get the list of group participants
    const groupParticipants = groupMetadata.participants;
    if (!groupParticipants || groupParticipants.length === 0) {
      return reply("❌ No participants found in this group!");
    }

    reply(`📢 Sending messages to ${groupParticipants.length} members...`);

    // Iterate through participants and send the message
    for (let participant of groupParticipants) {
      const userId = participant.id || participant.jid;
      if (userId) {
        try {
          await conn.sendMessage(userId, { text: customMessage }, { quoted: message });
        } catch (error) {
          console.error(`❌ Failed to send message to ${userId}:`, error.message);
        }
      }
    }

    // Confirm completion
    reply("✅ Messages have been sent successfully!");
  } catch (error) {
    console.error(error);

    // React with an error emoji and send an error message
    await conn.sendMessage(message.key.remoteJid, {
      react: {
        text: "❌",
        key: message.key
      }
    });
    reply("❌ Error: " + error.message);
  }
});
