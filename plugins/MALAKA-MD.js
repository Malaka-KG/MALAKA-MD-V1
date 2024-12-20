const { readEnv } = require("../lib/database");
const { cmd, commands } = require("../command");
const fs = require('fs');
const path = require('path');
const config = require('../config')
let listenerRegistered = false;

const sendWelcomeMessage = async (client, groupId, participants) => {
  try {
    const groupMetadata = await client.groupMetadata(groupId);
    const groupName = groupMetadata.subject;
    const groupDescription = groupMetadata.desc || "No description available.";
    const envVars = await readEnv();

    if (!envVars.WELCOME_SET) {
      throw new Error("WELCOME_SET is not defined in the environment variables.");
    }

    let invisibleSpace = '​'.repeat(4000);
    let messageContent = `\n${envVars.WELCOME_SET}\n\n*Name :*\n${groupName}\n\n*Description :*\n${groupDescription}\n\nᴄ`;
    const mentions = participants.map(participant => '@' + participant.split('@')[0]).join("\n");
    let welcomeMessage = `*Hey 🫂♥️*\n${mentions}\n*Welcome to Group ⤵️*\n${invisibleSpace}${messageContent}`;

    await client.sendMessage(groupId, {
      image: { url: 'https://i.imgur.com/vzDwkjg.jpeg' },
      caption: welcomeMessage,
      mentions: participants
    });

    await sendGroupRulesAlert(client, participants, groupName, groupDescription);
  } catch (error) {
    console.error("Error sending welcome message:", error);
  }
};

const sendGroupRulesAlert = async (client, participants, groupName, groupDescription) => {
  try {
    const envVars = await readEnv();

    if (envVars.WELCOME_ALERT === undefined) {
      throw new Error("WELCOME_ALERT is not defined in the environment variables.");
    }

    if (envVars.WELCOME_ALERT === "true") {
      const alertMessage = `*Hey Dear 🫂❤️*\n\n*Welcome to ${groupName}*\n\n${groupDescription}\n\n*Be sure to read the group description*\n\nꜟᴄ`;

      for (const participant of participants) {
        try {
          if (!participant) {
            continue;
          }

          await client.sendMessage(participant, {
            image: { url: 'https://i.imgur.com/vzDwkjg.jpeg' },
            caption: alertMessage
          });
        } catch (error) {
          console.error("Error sending message to " + participant + ':', error);
        }
      }
    }
  } catch (error) {
    console.error("Error sending group rules alert:", error);
  }
};

const registerGroupWelcomeListener = client => {
  if (!listenerRegistered) {
    client.ev.on('group-participants.update', async event => {
      const { id: groupId, participants, action } = event;

      if (action === "add" && participants.length > 0) {
        console.log("New participants:", participants);
        await sendWelcomeMessage(client, groupId, participants);
      }
    });
    listenerRegistered = true;
  }
};

cmd({ on: "body" }, async (client, message, chat, { from, body, isOwner }) => {
  try {
    const envVars = await readEnv();

    if (envVars.WELCOME === undefined) {
      throw new Error("WELCOME is not defined in the environment variables.");
    }

    if (envVars.WELCOME === "true") {
      if (isOwner) {
        return;
      }
      registerGroupWelcomeListener(client);
    }
  } catch (error) {
    console.log(error);
    await chat.reply("Error: " + error.message);
  }
});

cmd({
  on: "body"
},
async (conn,mek, m, { from, body, isGroup, isAdmins, isBotAdmins, reply, sender }) => {
    try {
    
        const badWords = ["wtf", "mia", "xxx","fuck","sex","huththa","pakaya","ponnaya","hutto"]
        if (!isGroup || isAdmins || !isBotAdmins) return; // Skip if not in group, or sender is admin, or bot is not admin
      
        const lowerCaseMessage = body.toLowerCase();
        const containsBadWord = badWords.some(word => lowerCaseMessage.includes(word));
        
        if (containsBadWord & config.ANTI_BAD_WORD === 'true') {
          await conn.sendMessage(from, { delete: mek.key }, { quoted: mek });
          await conn.sendMessage(from, { text: "🚫 ⚠️BAD WORDS NOT ALLOWED⚠️ 🚫" }, { quoted: mek });
        }
    } catch (error) {
        console.error(error)
        reply("An error occurred while processing the message.")
    }
})


const linkPatterns = [
    /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,   // WhatsApp group or chat links
    /wa\.me\/\S+/gi,                                      // wa.me links without https
    /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,           // Telegram links
    /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,           // YouTube links
    /https?:\/\/youtu\.be\/\S+/gi,                        // YouTube short links
    /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,          // Facebook links
    /https?:\/\/fb\.me\/\S+/gi,                           // Facebook short links
    /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,         // Instagram links
    /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,           // Twitter links
    /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,            // TikTok links
    /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,          // LinkedIn links
    /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,          // Snapchat links
    /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,         // Pinterest links
    /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,            // Reddit links
    /https?:\/\/ngl\/\S+/gi,                              // NGL links
    /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,           // Discord links
    /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,             // Twitch links
    /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,             // Vimeo links
    /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,       // Dailymotion links
    /https?:\/\/(?:www\.)?medium\.com\/\S+/gi             // Medium links
];

cmd({
    on: "body"
}, async (conn, mek, m, { from, body, sender, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup || isAdmins || !isBotAdmins) return; // Skip if not in group, or sender is admin, or bot is not admin

        const containsLink = linkPatterns.some(pattern => pattern.test(body));

        if (containsLink && config.ANTI_LINK === 'true') {
            // Delete the message
            await conn.sendMessage(from, { delete: mek.key }, { quoted: mek });

            // Warn the user
            await conn.sendMessage(from, { text: `⚠️ Links are not allowed in this group.\n@${sender.split('@')[0]} has been removed. 🚫`, mentions: [sender] }, { quoted: mek });

            // Remove the user from the group
            await conn.groupParticipantsUpdate(from, [sender], 'remove');
        }
    } catch (error) {
        console.error(error);
        reply("An error occurred while processing the message.");
    }
});

cmd({
  'on': "body"
}, async (context, event, user, {
  from: sender,
  isOwner: owner
}) => {
  const envConfig = await readEnv();
  if (envConfig.ALLOWS_ONLINE === "false") {
    await context.sendPresenceUpdate("paused", sender);
    return;
  }
});
