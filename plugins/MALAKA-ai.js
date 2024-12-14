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
let data = await fetchJson(`https://www.dark-yasiya-api.site/ai/useadrenaline?q=${q}`)
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
  isOwner,
  args, 
  reply, 
  groupMetadata 
}) => {
  try {
    if (!isGroup) {
      return reply("❌ This command can only be used in groups!");
    }
  if (!isOwner) {
    return reply("❌ You Are Not The Owner !");  
    }
    const customMessage = args.join(" ");
    if (!customMessage) {
      return reply("❌ Please provide a message to send!");
    }
    const groupParticipants = groupMetadata.participants;
    if (!groupParticipants || groupParticipants.length === 0) {
      return reply("❌ No participants found in this group!");
    }

    reply(`📢 Sending messages to ${groupParticipants.length} members...`);

    for (let participant of groupParticipants) {
      const userId = participant.id || participant.jid;
      if (userId) {
        try {
          await conn.sendMessage(userId, { text: customMessage });
        } catch (error) {
          console.error(`❌ Failed to send message to ${userId}:`, error.message);
        }
      }
    }

    reply("✅ Messages have been sent successfully!");
  } catch (error) {
    console.error(error);

    await conn.sendMessage(message.key.remoteJid, {
      react: {
        text: "❌",
        key: message.key
      }
    });
    reply("❌ Error: " + error.message);
  }
});
