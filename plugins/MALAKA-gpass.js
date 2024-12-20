const {
  cmd,
  commands
} = require("../command");
const {
  readEnv
} = require('../lib/database');

cmd({
  'on': 'body'
}, async (message, quotedMessage, key, {
  from: fromId,
  body: messageBody,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply,
  sender
}) => {
  try {
    const badWords = ['wtf', "mia", "xxx", 'fuck', "sex", 'huththa', "pakaya", "ponnaya", 'hutto', 'lol'];
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }
    const lowerCaseMessageBody = messageBody.toLowerCase();
    const containsBadWord = badWords.some(word => lowerCaseMessageBody.includes(word));
    const envConfig = await readEnv();
    if (containsBadWord && envConfig.ANTI_BAD === "true") {
      await message.sendMessage(fromId, {
        'delete': quotedMessage.key
      }, {
        'quoted': quotedMessage
      });
      await message.sendMessage(fromId, {
        'text': "*🚫 ⚠️BAD WORDS NOT ALLOWED⚠️ 🚫*",
        'contextInfo': {
          'mentionedJid': ["94704243771@s.whatsapp.net"],
          'groupMentions': [],
          'forwardingScore': 1,
          'isForwarded': true,
          'forwardedNewsletterMessageInfo': {
            'newsletterJid': "🔎",
            'newsletterName': "ᴍᴀʟᴀᴋᴀ-ᴍᴅ ",
            'serverMessageId': 999
          },
          'externalAdReply': {
            'title': "MALAKA-MD",
            'body': "ꜱᴀᴅᴇᴇꜱʜᴀ ᴛʜᴀʀᴜᴍɪɴ",
            'mediaType': 1,
            'sourceUrl': 'https://github.com/Malaka-KG/MALAKA-MD-V1',
            'thumbnailUrl': 'https://raw.githubusercontent.com/Malaka-KG/MALAKA-MD/refs/heads/main/img/IMG-20241215-WA0139.jpg',
            'renderLargerThumbnail': false,
            'showAdAttribution': true
          }
        }
      }, {
        'quoted': quotedMessage
      });
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while processing the message.");
  }
});

const linkPatterns = [/https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi, /^https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9_-]+)$/];

cmd({
  'on': "body"
}, async (message, quotedMessage, key, {
  from: fromId,
  body: messageBody,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply
}) => {
  try {
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }
    const containsLink = linkPatterns.some(pattern => pattern.test(messageBody));
    const envConfig = await readEnv();
    if (containsLink && envConfig.ANTI_LINK === 'true') {
      await message.sendMessage(fromId, {
        'delete': quotedMessage.key
      }, {
        'quoted': quotedMessage
      });
      await message.sendMessage(fromId, {
        'text': "*⚠️ Links are not allowed in this group*\n@" + sender.split('@')[0] + " has been removed. 🚫",
        'mentions': [sender],
        'contextInfo': {
          'mentionedJid': ["94704243771@s.whatsapp.net"],
          'groupMentions': [],
          'forwardingScore': 1,
          'isForwarded': true,
          'forwardedNewsletterMessageInfo': {
            'newsletterJid': "🔎",
            'newsletterName': "ᴍᴀʟᴀᴋᴀ-ᴍᴅ ",
            'serverMessageId': 999
          },
          'externalAdReply': {
            'title': "MALAKA-MD",
            'body': "ꜱᴀᴅᴇᴇꜱʜᴀ ᴛʜᴀʀᴜᴍɪɴ",
            'mediaType': 1,
            'sourceUrl': 'https://github.com/Malaka-KG/MALAKA-MD-V1',
            'thumbnailUrl': "https://raw.githubusercontent.com/Malaka-KG/MALAKA-MD/refs/heads/main/img/IMG-20241215-WA0139.jpg",
            'renderLargerThumbnail': false,
            'showAdAttribution': true
          }
        }
      }, {
        'quoted': quotedMessage
      });
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while processing the message.");
  }
});
