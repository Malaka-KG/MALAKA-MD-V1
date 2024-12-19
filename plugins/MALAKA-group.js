const config = require('../config');
const {
  cmd,
  commands
} = require("../command");
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson
} = require("../lib/functions");

cmd({
  pattern: "approve",
  desc: "Automatically approve Specific Country users in the waiting list",
  react: '✅',
  category: "group",
  filename: __filename
}, async (bot, message, chat, { 
  isGroup, 
  isBotAdmins, 
  isAdmins, 
  args, 
  reply 
}) => {
  try {
    // Check if the command is used in a group
    if (!isGroup) {
      return reply("This command is only for groups.");
    }

    // Check if the bot is an admin
    if (!isBotAdmins) {
      return reply("I need to be a group admin to perform this action.");
    }

    // Check if the user is an admin
    if (!isAdmins) {
      return reply("You must be an admin to use this command.");
    }

    const groupId = message.key.remoteJid;

    // Get the list of participants in the group waiting list
    const waitingList = await bot.groupRequestParticipantsList(groupId);
    if (waitingList.length === 0) {
      return reply("No participants are in the waiting list.");
    }

    // Filter participants with the specific country code
    const filteredUsers = waitingList.filter(participant => 
      participant.jid.startsWith(config.AUTO_ADD_Country_Code)
    );
    
    if (filteredUsers.length === 0) {
      return reply(`No users with the country code ${config.AUTO_ADD_Country_Code} found in the waiting list.`);
    }

    // Extract the JIDs of the filtered users
    const userJids = filteredUsers.map(user => user.jid);

    // Approve the filtered users
    const approvedUsers = await bot.groupRequestParticipantsUpdate(groupId, userJids, "approve");
    console.log(approvedUsers);

    reply("Approved the following users:\n" + userJids.join("\n"));
  } catch (error) {
    console.error(error);

    // React with an error emoji and send an error message
    await bot.sendMessage(message.key.remoteJid, {
      react: {
        text: '❌',
        key: message.key
      }
    });
    reply("Error: " + error.message);
  }
});

cmd({
  pattern: "promote",
  react: "🥏",
  alias: ["addadmin"],
  desc: "To Add a participant as an Admin",
  category: "group",
  use: ".promote",
  filename: __filename
}, async (client, message, context, {
  from,
  quoted,
  body,
  isCmd,
  command,
  mentionByTag,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isCreator,
  isDev,
  isAdmins,
  reply
}) => {
  try {
    // Ensure the command is used in a group
    if (!isGroup) {
      return reply("This is a group-only command.");
    }

    // Check if the user is an admin
    if (!isAdmins && !isMe) {
      return client.sendMessage(from, {
        text: "🚫 *This is an admin-only command*"
      }, { quoted: message });
    }

    // Check if the bot is an admin
    if (!isBotAdmins) {
      return reply("*Bot must be an admin first ❗*");
    }

    // Get the mentioned user or quoted participant
    const mentionedUsers = await mentionByTag;
    let targetUser = (await mentionedUsers) || message.msg.contextInfo.participant;

    if (!targetUser) {
      return reply("🚫 *Couldn't find any user in context*");
    }

    // Check if the user is already an admin
    const groupAdminsList = await getGroupAdmins(participants);
    if (groupAdminsList.includes(targetUser)) {
      return reply("*User is already an admin ✅*");
    }

    // Promote the user to admin
    await client.groupParticipantsUpdate(from, [targetUser], "promote");
    await client.sendMessage(from, {
      text: "*Promoted as an admin ✔️*"
    }, { quoted: message });

  } catch (error) {
    reply("🚫 *An error occurred!!*\n\n" + error);
    console.log(error);
  }
});

cmd({
  pattern: "demote",
  react: "🥏",
  alias: ["removeadmin"],
  desc: "To Demote Admin to Member",
  category: "group",
  use: ".demote",
  filename: __filename
}, async (bot, message, args, {
  from,
  quoted,
  body,
  isCmd,
  command,
  mentionByTag,
  args: cmdArgs,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isCreator,
  isDev,
  isAdmins,
  reply
}) => {
  try {
    // Check if command is used in a group
    if (!isGroup) {
      return reply("This is a Group only command.");
    }

    // Check if the sender is an admin
    if (!isAdmins) {
      if (!isMe) {
        return bot.sendMessage(from, { text: "🚫 *This is an admin-only command*" }, { quoted: message });
      }
    }

    // Check if the bot is an admin
    if (!isBotAdmins) {
      return reply("*Bot must be admin first ❗*");
    }

    // Get the mentioned user
    const mentionedUsers = await mentionByTag;
    let targetUser = (await mentionedUsers) || message.msg.contextInfo.participant;

    if (!targetUser) {
      return reply("🚫 *Couldn't find any user in context*");
    }

    // Check if the target user is an admin
    const currentGroupAdmins = await getGroupAdmins(participants);
    if (!currentGroupAdmins.includes(targetUser)) {
      return reply("*User is already not an admin ✅*");
    }

    // Demote the user
    await bot.groupParticipantsUpdate(from, [targetUser], 'demote');
    await bot.sendMessage(from, { text: "*User is no longer an admin ✔️*" }, { quoted: message });
  } catch (error) {
    reply("🚫 *An error occurred !!*\n\n" + error);
    console.error(error);
  }
});

cmd({
  pattern: "requests",
  desc: "View pending join requests",
  use: ".requests",
  react: '📝',
  category: "group",
  filename: __filename
}, async (bot, message, args, { from, isGroup, reply }) => {
  if (!isGroup) {
    return await reply("This command can only be used in groups.");
  }

  const botJid = bot.user.jid;
  const groupMetadata = await bot.groupMetadata(from);
  const isAdmin = groupMetadata.participants.some(participant => participant.jid === botJid && participant.admin);

  if (!isAdmin) {
    return await reply("I'm not an admin in this group.");
  }

  try {
    const pendingRequests = await bot.groupRequestParticipantsList(from);

    if (pendingRequests.length === 0) {
      return await reply("No pending join requests.");
    }

    let messageText = "Pending Join Requests:\n\n";
    pendingRequests.forEach((request, index) => {
      messageText += `${index + 1}. @${request.jid.split('@')[0]}\n`;
    });

    return await reply(messageText, {
      mentions: pendingRequests.map(request => request.jid)
    });
  } catch (error) {
    console.error("Error retrieving join requests:", error);
    return await reply("Failed to retrieve join requests. Please try again later.");
  }
});

cmd({
  pattern: "accept",
  desc: "Accept group join request(s)",
  use: ".accept <request numbers>",
  react: '✔️',
  category: "group",
  filename: __filename
}, async (bot, message, args, { from, isGroup, reply, match }) => {
  if (!isGroup) {
    return await reply("This command can only be used in groups.");
  }

  const userJid = bot.user.jid;
  const groupMetadata = await bot.groupMetadata(from);
  const isAdmin = groupMetadata.participants.some(participant => participant.jid === userJid && participant.admin);

  if (!isAdmin) {
    return await reply("I'm not an admin in this group.");
  }

  try {
    const joinRequests = await bot.groupRequestParticipantsList(from);

    if (joinRequests.length === 0) {
      return await reply("No pending join requests.");
    }

    if (!match) {
      return await reply("Provide the number(s) of the request(s) to accept, separated by commas.");
    }

    const requestIndices = match.split(',').map(num => parseInt(num.trim()) - 1);
    const validRequests = requestIndices.filter(index => index >= 0 && index < joinRequests.length);

    if (validRequests.length === 0) {
      return await reply("Invalid request number(s).");
    }

    for (let index of validRequests) {
      await bot.groupRequestParticipantsUpdate(from, [joinRequests[index].jid], "accept");
    }

    return await reply(`Accepted ${validRequests.length} join request(s).`);
  } catch (error) {
    console.error("Error accepting join requests:", error);

    await bot.sendMessage(from, {
      react: {
        text: '❌',
        key: message.key
      }
    });

    return await reply("Failed to accept join requests. Please try again later.");
  }
});

cmd({
  pattern: 'reject',
  desc: "Reject group join request(s)",
  use: ".reject <request numbers>",
  react: '❌',
  category: 'group',
  filename: __filename
}, async (client, message, args, { from, isGroup, reply, match }) => {
  if (!isGroup) {
    return await reply("This command can only be used in groups.");
  }

  const userJid = client.user.jid;
  const groupMetadata = await client.groupMetadata(from);
  const isAdmin = groupMetadata.participants.some(participant => 
    participant.jid === userJid && participant.admin
  );

  if (!isAdmin) {
    return await reply("I'm not an admin in this group.");
  }

  try {
    const pendingRequests = await client.groupRequestParticipantsList(from);

    if (pendingRequests.length === 0) {
      return await reply("No pending join requests.");
    }

    if (!match) {
      return await reply("Provide the number(s) of the request(s) to reject, separated by commas.");
    }

    const requestIndexes = match.split(',')
      .map(num => parseInt(num.trim()) - 1)
      .filter(index => index >= 0 && index < pendingRequests.length);

    if (requestIndexes.length === 0) {
      return await reply("_Invalid request number(s)._");
    }

    for (let index of requestIndexes) {
      await client.groupRequestParticipantsUpdate(from, [pendingRequests[index].jid], "reject");
    }

    return await reply(`_Rejected ${requestIndexes.length} join request(s)._`);
  } catch (error) {
    console.error("Error rejecting join requests:", error);

    await client.sendMessage(from, {
      react: {
        text: '❌',
        key: message.key
      }
    });

    return await reply("Failed to reject join requests. Please try again later.");
  }
});

cmd({
  pattern: "del",
  react: '⛔',
  alias: [','],
  desc: "delete message",
  category: "main",
  use: ".del",
  filename: __filename
}, async (client, chat, message, {
  from,
  l,
  quoted,
  body,
  isCmd,
  isDev,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isSachintha,
  isSavi,
  isSadas,
  isMani,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    const deleteMessage = {
      remoteJid: message.chat,
      fromMe: false,
      id: message.quoted.id,
      participant: message.quoted.sender
    };
    await client.sendMessage(message.chat, {
      delete: deleteMessage
    });
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

cmd({
  'pattern': 'leave',
  'react': '🔓',
  'alias': ["left", "kickme"],
  'desc': "To leave from the group",
  'category': 'group',
  'use': '.leave',
  'filename': __filename
}, async (client, message, args, {
  from,
  l,
  quoted,
  body,
  isCmd,
  command,
  argsArray,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isCreator,
  isDev,
  isAdmins,
  reply
}) => {
  try {
    if (!isGroup) {
      return reply("🚫 *This is Group command*");
    }
    if (!isMe) {
      return reply("🚫 *This is Group command*");
    }
    await client.sendMessage(from, {
      'text': "🔓 *Good Bye All*"
    }, {
      'quoted': message
    });
    await client.groupLeave(from);
  } catch (error) {
    reply("*Error !!*");
    console.log(error);
  }
});

cmd({
  'pattern': 'invite',
  'react': '🖇️',
  'alias': ["grouplink", "glink"],
  'desc': "To Get the Group Invite link",
  'category': "group",
  'use': ".invite",
  'filename': __filename
}, async (bot, message, chat, {
  from: groupId,
  l,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isCreator,
  isDev,
  isAdmins,
  reply
}) => {
  try {
    if (!isGroup) {
      return reply("🚫 *This is a Group command*");
    }
    if (!isBotAdmins) {
      return reply("🚫 *Bot must be an Admin first*");
    }
    if (!isAdmins) {
      if (!isMe) {
        return reply("🚫 *You must be an admin first*");
      }
    }
    const inviteCode = await bot.groupInviteCode(groupId);
    await bot.sendMessage(groupId, {
      'text': "🖇️ *Group Link*\n\nhttps://chat.whatsapp.com/" + inviteCode
    }, {
      'quoted': message
    });
  } catch (error) {
    reply("*Error !!*");
    console.log(error);
  }
});

cmd({
  pattern: "add2",
  desc: "Add a member to the group.",
  category: "group",
  react: '➕',
  filename: __filename
}, async (bot, chat, message, {
  from: groupId,
  quoted: quotedMessage,
  body: messageBody,
  isCmd: isCommand,
  command: commandName,
  args: argumentsList,
  q: query,
  isGroup: isGroupChat,
  sender: senderId,
  senderNumber: senderPhoneNumber,
  botNumber2: botSecondaryNumber,
  botNumber: botPrimaryNumber,
  pushname: senderName,
  isMe: isBotOwner,
  isOwner: isGroupOwner,
  groupMetadata: groupData,
  groupName: groupName,
  participants: groupParticipants,
  groupAdmins: groupAdmins,
  isBotAdmins: isBotAdmin,
  isAdmins: isAdmin,
  reply: sendReply
}) => {
  try {
    if (!isGroupChat) {
      return sendReply("*🚨 This command can only be used in a group.*");
    }
    if (!isBotAdmin) {
      return sendReply("*🚨 Please give me admin rights.*");
    }
    if (!isAdmin && !isBotOwner) {
      return sendReply("*🚨 Only group admins can use this command.*");
    }

    const phoneNumberToAdd = query.split(" ")[0];
    if (!phoneNumberToAdd) {
      return sendReply("Please provide a phone number to add.");
    }

    await bot.groupParticipantsUpdate(groupId, [`${phoneNumberToAdd}@s.whatsapp.net`], "add");
    await sendReply(`@${phoneNumberToAdd} has been added to the group.`, {
      mentions: [`${phoneNumberToAdd}@s.whatsapp.net`]
    });
  } catch (error) {
    console.error(error);
    sendReply(`Error: ${error.message}`);
  }
});

cmd({
  pattern: "end",
  desc: "Remove all members from the group (except bot and group creator).",
  category: "group",
  filename: __filename,
  react: "🚫"
}, async (botInstance, message, args, { 
  from, 
  isGroup, 
  isAdmins, 
  isOwner, 
  isBotAdmins, 
  isMe, 
  groupMetadata, 
  reply 
}) => {
  try {
      if (!isGroup) {
      return reply("This command can only be used in groups.");
    }
        if (!isOwner && !isAdmins) {
      return reply("This command can only be used by the bot owner.");
    }

    const groupOwnerId = groupMetadata.owner;
    const botId = botInstance.user.id;

    const membersToRemove = groupMetadata.participants.filter(participant => 
      participant.id !== groupOwnerId && participant.id !== botId
    );

    await botInstance.groupParticipantsUpdate(from, membersToRemove.map(member => member.id), "remove");
    reply("*🚫 All members have been removed from the group (except the bot and group creator).*");
  } catch (error) {
    console.error(error);
    reply("❌ Error: " + error);
  }
});

cmd({
  pattern: "tagadmin",
  desc: "Tags all the admins in the group.",
  category: "group",
  use: ".tagadmin",
  filename: __filename
}, async (bot, message, args, { from, isGroup, groupMetadata, groupAdmins, reply }) => {
  try {
    // Check if the command is being used in a group
    if (!isGroup) {
      return reply("This command is only for groups.");
    }

    // Check if there are any admins in the group
    if (groupAdmins.length === 0) {
      return reply("There are no admins in this group.");
    }

    // Construct a message tagging all admins
    let adminMessage = "*Tagging all admins in the group:*\n\n";
    for (let admin of groupAdmins) {
      adminMessage += `@${admin.split('@')[0]}\n`;
    }

    // Send the message to the group with mentions
    await bot.sendMessage(from, {
      text: adminMessage,
      mentions: groupAdmins
    }, {
      quoted: message
    });
  } catch (error) {
    console.error("Error tagging admins:", error);
    reply("An error occurred while trying to tag all admins. Please try again.");
  }
});

cmd({
    pattern: "mute",	
    alias: ["lock"],
    react: "♻️",
    desc: "mute group.",
    category: "group",
    filename: __filename,
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
if (!isOwner || !isAdmins) return;


if (!m.isGroup) return reply(mg.onlygroup);
if (!isBotAdmins) return reply(mg.needbotadmins);     
            await conn.groupSettingUpdate(m.chat, "announcement")
           const mass = await conn.sendMessage(m.chat, { text: '*Group muted*' }, { quoted: mek });
            return await conn.sendMessage(m.chat, { react: { text: '🔒', key: mass.key } });
} catch(e) {
console.log(e);
reply('*❗👻*')    
} 
})

cmd({
    pattern: "unmute",	
    alias: ["unlock"],
    react: "🔊",
    desc: "unmute group.",
    category: "group",
    filename: __filename,
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
if (!isOwner || !isAdmins) return;


if (!m.isGroup) return reply(mg.onlygroup);
if (!isBotAdmins) return reply(mg.needbotadmins);     
            await conn.groupSettingUpdate(m.chat, "not_announcement")
           const mass = await conn.sendMessage(m.chat, { text: '*Group unmuted*' }, { quoted: mek });
            return await conn.sendMessage(m.chat, { react: { text: '🔒', key: mass.key } });
} catch(e) {
console.log(e);
reply('*_❗👻_*')    
} 
})

cmd({
    pattern: "kick",
    react: "🚫",
    alias: [".."],
    desc: "Kicks replied/quoted user from group.",
    category: "group",
    filename: __filename,
    use: '<quote|reply|number>',
},           
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner ||  !isAdmins)return;
try {
    if (!m.isGroup) return reply(mg.onlygroup);
    if (!isBotAdmins) return reply(mg.needbotadmins);


const user = m.quoted.sender;
if (!user) return reply(mg.nouserforkick);
await conn.groupParticipantsUpdate(m.chat, [user], "remove");
reply(mg.userremoved);
} catch (e) {
reply('*successful_✓✓*')
l(e)
}
})

cmd({
  pattern: "tagall",
  desc: "Tags all members and admins in the group.",
  category: "group",
  react: "🏷️",
  use: ".tagall",
  filename: __filename
}, async (conn, mek, m, { from, isGroup, groupMetadata, participants, isOwner, isAdmins, groupAdmins, reply }) => {
  try {
    if (!isGroup) {
      return reply("This command can only be used in groups.");
    }
        if (!isOwner && !isAdmins) {
      return reply("This command can only be used by the bot owner.");
    }
    if (!participants || participants.length === 0) {
      return reply("There are no members in this group.");
    }
    let tagMessage = "*Tag All: 🏷️*\n\n";
    let mentions = [];

    for (let participant of participants) {
      const isAdmin = groupAdmins.includes(participant.id);
      tagMessage += `@${participant.id.split('@')[0]} ${isAdmin ? "(Admin 🕯️)" : ""}\n`;
      mentions.push(participant.id);
    }
    await conn.sendMessage(from, {
      text: tagMessage,
      mentions: mentions
    }, { quoted: mek });
  } catch (error) {
    console.error("Error tagging members and admins:", error);
    reply("An error occurred while trying to tag all members and admins. Please try again.");
  }
});

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

cmd({
    pattern: "opentime",
    react: "🔖",
    desc: "To open group to a time",
    category: "group",
    use: '.opentime',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
if (!isGroup) return reply(ONLGROUP)
if (!isAdmins) return reply(ADMIN)	
  if (args[1] == 'second') {
                    var timer = args[0] * `1000`
                } else if (args[1] == 'minute') {
                    var timer = args[0] * `60000`
                } else if (args[1] == 'hour') {
                    var timer = args[0] * `3600000`
                } else if (args[1] == 'day') {
                    var timer = args[0] * `86400000`
                } else {
                    return reply('*select:*\nsecond\nminute\nhour\n\n*example*\n10 second')
                }
                reply(`Open time ${q} starting from now`)
                setTimeout(() => {
                    var nomor = mek.participant
                    const open = `*OPEN TIME* THE GROUP WAS OPENED BY SUPUN-MD TO APPROVED ADMIN\n NOW MEMBERS CAN SEND MESSAGES 🔓`
                    conn.groupSettingUpdate(from, 'not_announcement')
                    reply(open)
                }, timer)
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "closetime",
    react: "🔖",
    desc: "To close group to a time",
    category: "group",
    use: '.closstime',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
if (!isGroup) return reply(ONLGROUP)
if (!isAdmins) return reply(ADMIN)	
                if (args[1] == 'second') {
                    var timer = args[0] * `1000`
                } else if (args[1] == 'minute') {
                    var timer = args[0] * `60000`
                } else if (args[1] == 'hour') {
                    var timer = args[0] * `3600000`
                } else if (args[1] == 'day') {
                    var timer = args[0] * `86400000`
                } else {
                    return reply('*select:*\nsecond\nminute\nhour\n\n*Example*\n10 second')
                }
                reply(`Close time ${q} starting from now`)
                setTimeout(() => {
                    var nomor = m.participant
                    const close = `*CLOSE TIME* GROUP CLOSED BY SUPUN-MD AT APPROVED ADMIN\nNOW ONLY ADMIN CAN SEND MESSAGES 🔐`
                    conn.groupSettingUpdate(from, 'announcement')
                    reply(close)
                }, timer)
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//==================================================================tagadmin=============================================
cmd({
    pattern: "tagadmin",
    alais:["tagadmins"],
    react: "🙀",
    desc: "Tags all the admins in the group.",
    category: "group",
    filename: __filename,
},           
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
        // Check if the command is used in a group
        if (!isGroup) return reply(`This command is only for groups.`);
        if (!isAdmins) return reply(`This command is only for group admin.`);
        
        // Fetch all group admins
        const admins = groupAdmins;
        if (admins.length === 0) {
            return reply('There are no admins in this group.');
        }
        // Create a message with all admin tags
        let adminTagMessage = '*TAGGING ALL ADMINS IN THE GROUP 🔳:*\n\n';
        for (let admin of admins) {
            adminTagMessage += `@${admin.split('@')[0]}\n`;  // Mention each admin by their number
        }
        // Send the message and tag the admins
        await conn.sendMessage(from, { text: adminTagMessage, mentions: admins }, { quoted: mek });
    } catch (e) {
        console.error('Error tagging admins:', e);
        reply('you are not an admin.');
    }
})

cmd({
    pattern: "add",
    react: "✅",
    alias: ["+"],
    desc: "Adds a user to the group using the provided number.",
    category: "group",
    filename: __filename,
    use: '<number>',
},           
async(conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner && !isAdmins) return reply('❌ *You are not authorized to use this command.*');
    if (!isGroup) return reply('❌ *This command can only be used in groups.*');
    if (!isBotAdmins) return reply('❌ *Bot needs admin privileges to add users.*');
    
    if (!args[0]) return reply('⚠️ *Please provide a number to add.*');
    
    let number = args[0].replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (number.startsWith('0')) {
        number = '94' + number.slice(1); // Replace '0' with country code
    } else if (!number.startsWith('94')) {
        return reply('⚠️ *Please provide a valid Sri Lankan number starting with 94.*');
    }
    
    const participant = `${number}@s.whatsapp.net`;

    try {
        await conn.groupParticipantsUpdate(from, [participant], 'add');
        reply(`✅ *Number ${number} added successfully to the group.*`);
    } catch (err) {
        reply(`❌ *Failed to add number ${number}.*\n*Reason:* ${err.message}`);
    }
});

cmd({
    pattern: "join",
    react: "✅",
    alias: ["connect"],
    desc: "Join a group using an invite link.",
    category: "group",
    filename: __filename,
    use: '<group-link>',
},           
async (conn, mek, m, { from, body, reply, isOwner }) => {
    const link = body.split(" ")[1];
    if (!link) return reply("Please provide a group link!");

    const regex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/;
    const match = link.match(regex);

    if (!match) return reply("Invalid group link. Please check again!");

    const inviteCode = match[1];

    try {
        const metadata = await conn.groupAcceptInvite(inviteCode);
        reply(`✅ Successfully joined the group: ${metadata.subject}`);
    } catch (error) {
        console.error("Join Group Error:", error);
        reply("Sorry, unable to join the group.");
    }
});
