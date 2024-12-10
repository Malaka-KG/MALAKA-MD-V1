const { cmd } = require('../lib/command');
const { exec } = require('child_process');
const config = require('../config');

cmd({
  'pattern': 'block',
  'desc': "Block a user.",
  'category': 'owner',
  'react': '🚫',
  'filename': __filename
}, async (context, match, message, {
  from: sender,
  isOwner: isOwner,
  quoted: quotedMessage,
  reply: reply
}) => {
  if (!isOwner) {
    return reply("❌ You Are Not The SUHAS-MD Main Owner !");
  }
  if (!quotedMessage) {
    return reply("❌ Please Reply To The User You Want To Block !");
  }
  const userToBlock = quotedMessage.sender;
  try {
    await context.updateBlockStatus(userToBlock, "block");
    reply("🚫 User " + userToBlock + " blocked successfully.");
  } catch (error) {
    reply("❌ Error blocking user: " + error.message);
  }
});

cmd({
  'pattern': 'unblock',
  'desc': "Unblock a user.",
  'category': "owner",
  'react': '✅',
  'filename': __filename
}, async (bot, message, args, {
  from: fromId,
  isOwner: isOwner,
  quoted: quotedMsg,
  reply: replyMsg
}) => {
  if (!isOwner) {
    return replyMsg("❌ You Are Not The SUHAS-MD Main Owner !");
  }
  if (!quotedMsg) {
    return replyMsg("❌ Please Reply The User Do You Want To Block !");
  }
  const userToUnblock = quotedMsg.sender;
  try {
    await bot.updateBlockStatus(userToUnblock, 'unblock');
    replyMsg("✅ User " + userToUnblock + " unblocked successfully.");
  } catch (error) {
    replyMsg("❌ Error unblocking user: " + error.message);
  }
});

cmd({
  'pattern': "gjid",
  'desc': "Get the list of JIDs for all groups the bot is part of.",
  'category': "owner",
  'react': '📝',
  'filename': __filename
}, async (bot, message, args, {
  from: senderId,
  isOwner: isOwner,
  reply: reply
}) => {
  if (!isOwner) {
    return reply("❌ You Are Not The SUHAS-MD Main Owner !");
  }
  const allGroups = await bot.groupFetchAllParticipating();
  const groupJids = Object.keys(allGroups).join("\n");
  reply("📝 *Group JIDs:*\n\n" + groupJids);
});

// 3. Set Profile Picture

cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted || !quoted.message.imageMessage) return reply("❌ Please reply to an image.");

    try {
        const media = await conn.downloadMediaMessage(quoted);
        await conn.updateProfilePicture(conn.user.jid, { url: media });
        reply("🖼️ Profile picture updated successfully!");
    } catch (error) {
        reply(`❌ Error updating profile picture: ${error.message}`);
    }
});

// AutoBIO feature variables
let autoBioInterval;

// 1. Set AutoBIO
cmd({
    pattern: "setautobio",
    desc: "Enable or disable the AutoBIO feature.",
    category: "owner",
    react: "⚒️",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    config.autoBioEnabled = !config.autoBioEnabled;

    if (config.autoBioEnabled) {
        reply("⚒️ AutoBIO feature has been *enabled*! 🔄");
        startAutoBio(conn);
    } else {
        reply("⚒️ AutoBIO feature has been *disabled*! 🚫");
        stopAutoBio();
    }
});

// 2. Start AutoBIO
function startAutoBio(conn) {
    // Clear any existing interval to avoid duplicates
    if (autoBioInterval) clearInterval(autoBioInterval);

    // Set a new interval to update the bio every minute (or any preferred time)
    autoBioInterval = setInterval(async () => {
        const time = new Date().toLocaleTimeString();  // Get the current time
        const bioText = `👨‍💻 MALAKA-MD [${time}] 👨‍💻`;  // Set the bio text with time
        await conn.updateProfileStatus(bioText);  // Update the bot's bio
    }, 60 * 1000);  // 1 minute interval
}

// 3. Stop AutoBIO
function stopAutoBio() {
    if (autoBioInterval) {
        clearInterval(autoBioInterval);  // Stop the interval
        autoBioInterval = null;
        console.log("⚒️ AutoBIO feature stopped.");  // Log the stopping of the feature
    }
          }
