const { cmd, commands } = require("../command");
const fg = require('api-dylux')
const yts = require("yt-search");
const { fetchJson } = require("../lib/functions");
const axios = require("axios");
const {
  ytmp3,
  ytmp4
} = require("../lib/ytdl");

// YouTube MP4 download function
async function ytmp4(url, format) {
  try {
    if (!url || !format) {
      throw new Error("URL and format parameters are required.");
    }

    const resolution = parseInt(format.replace('p', ''), 10); // Convert format (e.g. '720p') to an integer (720)
    const requestParams = {
      button: 1,
      start: 1,
      end: 1,
      format: resolution,
      url: url
    };

    const requestHeaders = {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      Origin: 'https://loader.to',
      Referer: 'https://loader.to',
      'Sec-Ch-Ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
      'Sec-Ch-Ua-Mobile': '?1',
      'Sec-Ch-Ua-Platform': '"Android"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
    };

    const downloadResponse = await axios.get('https://ab.cococococ.com/ajax/download.php', {
      params: requestParams,
      headers: requestHeaders
    });

    const downloadId = downloadResponse.data.id;

    // Check download progress
    const checkProgress = async () => {
      const progressParams = { id: downloadId };
      try {
        const progressResponse = await axios.get('https://p.oceansaver.in/ajax/progress.php', {
          params: progressParams,
          headers: requestHeaders
        });
        const { progress, download_url, text } = progressResponse.data;

        // If download is finished, return the download URL, otherwise retry after 1 second
        return text === 'Finished' ? download_url : (await new Promise(resolve => setTimeout(resolve, 1000)), checkProgress());
      } catch (error) {
        throw new Error('Error in progress check: ' + error.message);
      }
    };

    return await checkProgress();
  } catch (error) {
    console.error('Error:', error);
    return { error: error.message };
  }
}

module.exports = { ytmp4 };

// Function to extract YouTube video ID from URL
function extractYouTubeId(link) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = link.match(regex);
  return match ? match[1] : null;
}

// Function to convert partial YouTube links to full URL
function convertYouTubeLink(link) {
  const videoId = extractYouTubeId(link);
  if (videoId) {
    return 'https://www.youtube.com/watch?v=' + videoId;
  }
  return link;
}

// Command handler for downloading songs
cmd({
  pattern: 'song',
  alias: 'play21',
  desc: 'To download songs.',
  react: '🎵',
  category: 'download',
  filename: __filename
}, async (bot, message, args, context) => {
  const {
    from, quoted, body, isCmd, command, args: commandArgs, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
  } = context;

  try {
    if (!q) {
      return reply('Please provide a URL or title.');
    }

    // Convert partial link to full YouTube link if necessary
    const searchQuery = convertYouTubeLink(q);
    const searchResults = await yts(searchQuery);
    const video = searchResults.videos[0];
    const videoUrl = video.url;

    let messageText = `
 ╭─────────────────────❖
 │𝘔𝘈𝘓𝘈𝘒𝘈 SONG DOWNLOADING 
 ╰─────────────────────❖
 ──────────────────❖
╭────────────────❖
│ ℹ️ *MALAKA-MD* 
│
│☍ ⦁ *Title:* ${video.title} 
│☍ ⦁ *Duration:* ${video.timestamp}
│☍ ⦁ *Views:* ${video.views} 
│☍ ⦁ *Uploaded On:* ${video.ago} 
╰────────────────❖
❖──────────────────❖
╭──────────────────❖
│ © 𝙏𝙤 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙 𝙨𝙚𝙣𝙙: 🔢
│
│ *➀*  ᴀᴜᴅɪᴏ ꜰɪʟᴇ 🎶
│──────────────────❖
│ *➁*  ᴅᴏᴄᴜᴍᴇɴᴛ ꜰɪʟᴇ 📂
⁠⁠⁠⁠╰──────────────────❖
> ᴍᴀʟᴀᴋᴀ-ᴍᴅ . . . 👩‍💻
    `;
    // Send initial message with video details and options
    const sentMessage = await bot.sendMessage(from, {
      image: { url: video.thumbnail },
      caption: messageText
    }, { quoted: message });

    const sentMessageId = sentMessage.key.id;

    bot.ev.on('messages.upsert', async (newMessage) => {
      const userResponse = newMessage.messages[0];
      if (!userResponse.message) return;

      const userText = userResponse.message.conversation || userResponse.message.extendedTextMessage?.text;
      const userChatId = userResponse.key.remoteJid;

      const isReplyToOriginal = userResponse.message.extendedTextMessage && userResponse.message.extendedTextMessage.contextInfo.stanzaId === sentMessageId;
      if (isReplyToOriginal) {
        await bot.sendMessage(userChatId, { react: { text: '⬇️', key: userResponse.key } });

        const downloadResponse = await fetchJson(`https://www.dark-yasiya-api.site/download/ytmp3?url=${videoUrl}`);
        const downloadUrl = downloadResponse.result.dl_link;

        // Delete the original message
        await bot.sendMessage(userChatId, { delete: sentMessage.key });
        await bot.sendMessage(userChatId, { react: { text: '⬆️', key: userResponse.key } });

        // Handle user response to download either audio or document
        if (userText === '1') {
          await bot.sendMessage(userChatId, {
            audio: { url: downloadUrl },
            mimetype: 'audio/mpeg',
            contextInfo: {
              externalAdReply: {
                title: video.title,
                body: video.videoId,
                mediaType: 1,
                sourceUrl: video.url,
                thumbnailUrl: video.thumbnail,
                renderLargerThumbnail: true,
                showAdAttribution: true
              }
            }
          }, { quoted: userResponse });
          await bot.sendMessage(userChatId, { react: { text: '✅', key: userResponse.key } });
        } else if (userText === '2') {
          await bot.sendMessage(userChatId, {
            document: { url: downloadUrl },
            mimetype: 'audio/mp3',
            fileName: `${video.title}.mp3`,
            caption: "\n*© Created by ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·*\n "
          }, { quoted: userResponse });
          await bot.sendMessage(userChatId, { react: { text: '✅', key: userResponse.key } });
        }
      }
    });
  } catch (error) {
    console.log(error);
    reply('' + error);
  }
});

//==========video download============================
cmd({
  pattern: 'video',
  desc: "To download videos.",
  react: '🎥',
  category: "download",
  filename: __filename
}, async (client, message, _, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    // Check if URL or title is provided
    if (!q) {
      return reply("Please give me a URL or title.");
    }

    // Convert input to YouTube link format
    q = convertYouTubeLink(q);

    // Search for the YouTube video
    const searchResults = await yts(q);
    const video = searchResults.videos[0];
    const videoUrl = video.url;

    // Construct the details message
    let detailsMessage = `
      ╭─────────────────❖
      │VIDEO DOWNLOADING
      ╰─────────────────❖
       ──────────────────❖
      ╭────────────────❖
      │ ℹ️ *MALAKA-MD* 
      │
      │☍ ⦁ *Title:* ${video.title}
      │☍ ⦁ *Duration:* ${video.timestamp}
      │☍ ⦁ *Views:* ${video.views}
      │☍ ⦁ *Uploaded On:* ${video.ago}
      ╰────────────────❖  
       ──────────────────❖
      ╭──────────────────
      │ © 𝙏𝙤 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙 𝙨𝙚𝙣𝙙: 🔢
      │
      │ ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴠɪᴅᴇᴏ ꜰɪʟᴇ 📽️
      │ _➀.➀ 360ᴘ
      │ _➀.➁ 480ᴘ
      │ _➀.➂ 720ᴘ
      │ _➀.➃ 1080ᴘ
      │ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴅᴏᴄᴜᴍᴇɴᴛ 📂
      │ _➁.➀ 360ᴘ
      │ _➁.➁ 480ᴘ
      │ _➁.➂ 720ᴘ
      │ _➁.➃ 1080ᴘ
      ╰──────────────────❖
     > © ᴍᴀʟᴀᴋᴀ-ᴍᴅ . . . 👩‍💻
    `;

    // Send the image with the details message
    const sentMessage = await client.sendMessage(from, {
      image: { url: video.thumbnail },
      caption: detailsMessage
    });

    const messageId = sentMessage.key.id;

    // Listen for further messages in the conversation
    client.ev.on("messages.upsert", async upsert => {
      const receivedMessage = upsert.messages[0];
      if (!receivedMessage.message) {
        return;
      }

      const text = receivedMessage.message.conversation || receivedMessage.message.extendedTextMessage?.text;
      const chatId = receivedMessage.key.remoteJid;
      const isReply = receivedMessage.message.extendedTextMessage && receivedMessage.message.extendedTextMessage.contextInfo.stanzaId === messageId;

      if (isReply) {
        // React to the message
        await client.sendMessage(chatId, {
          react: {
            text: '⬇️',
            key: receivedMessage.key
          }
        });

        // Download and send the video based on the user's choice
        let resolution = '';
        switch (text) {
          case "1.1":
            resolution = "360p";
            break;
          case "1.2":
            resolution = "480p";
            break;
          case "1.3":
            resolution = "720p";
            break;
          case "1.4":
            resolution = "1080p";
            break;
          case "2.1":
            resolution = "360";
            break;
          case "2.2":
            resolution = "480";
            break;
          case "2.3":
            resolution = "720";
            break;
          case "2.4":
            resolution = "1080";
            break;
          default:
            return;
        }

        const videoUrlWithResolution = await ytmp4(videoUrl, resolution);

        await client.sendMessage(chatId, {
          react: {
            text: '⬆️',
            key: receivedMessage.key
          }
        });

        if (text.startsWith("1.")) {
          await client.sendMessage(chatId, {
            video: { url: videoUrlWithResolution },
            caption: "\n* © ᴍᴀʟᴀᴋᴀ-ᴍᴅ . . . 👩‍💻*\n"
          }, {
            quoted: receivedMessage
          });
        } else {
          await client.sendMessage(chatId, {
            document: { url: videoUrlWithResolution },
            mimetype: "video/mp4",
            fileName: `${video.title}.mp4`,
            caption: "\n* © ᴍᴀʟᴀᴋᴀ-ᴍᴅ . . . 👩‍💻 *\n"
          }, {
            quoted: receivedMessage
          });
        }

        await client.sendMessage(chatId, {
          react: {
            text: '✅',
            key: receivedMessage.key
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    reply('' + error);
  }
});

//download ys

cmd({
    pattern: "yts",
    alias: ["youtubesearch", "ytsearch"],
    desc: "Search for YouTube videos",
    category: "search",
    react: "🔍",
    filename: __filename,
    use: '<search query>'
},
async (conn, mek, m, { from, args, reply }) => {
    if (!args[0]) return reply('Please provide a search query !');

    const query = args.join(' ');

    try {
        const results = await yts(query);

        if (!results.videos.length) {
            return reply('No videos found for the given query.');
        }

        let response = '*YouTube Search Results:*\n\n';
        results.videos.slice(0, 20).forEach((video, index) => {
            response += `${index + 1}. *${video.title}*\n`;
            response += `   Channel: ${video.author.name}\n`;
            response += `   Duration: ${video.duration.timestamp}\n`;
            response += `   Views: ${formatNumber(video.views)}\n`;
            response += `   Uploaded: ${video.ago}\n`;
            response += `   Link: ${video.url}\n\n`;
        });

        response += `\nShowing top 20 results for "${query}"\n`;
        response += `To watch, click on the video link or use the command:\n`;

        await conn.sendMessage(from, { text: response }, { quoted: mek });
    } catch (error) {
        console.error('Error in YouTube search:', error);
        reply('❌ An error occurred while searching YouTube. Please try again later.');
    }
});

// Helper function to format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

//video2

cmd({
  pattern: "video2",
  alias: ["video2", "ytmp2"],
  desc: "Download video",
  category: "download",
  react: '🎬',
  filename: __filename
}, async (bot, message, options, {
  from,
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
  isAdmins,
  reply
}) => {
  try {
    if (!q) {
      return reply("*Please provide a link or a name💫*");
    }
    
    // Search YouTube for the query
    const searchResults = await yts(q);
    const video = searchResults.videos[0]; // Get the first video
    const videoUrl = video.url;
    
    // Create message with video details
    let caption = `
    ╭─────────────────❖
    │VIDEO2 DOWNLOADING
    ╰─────────────────❖
       ──────────────────❖
      ╭────────────────❖
      │ ℹ️ *MALAKA-MD* 
      │
      │☍ ⦁ *Title:* ${video.title}
      │☍ ⦁ *Duration:* ${video.timestamp}
      │☍ ⦁ *Views:* ${video.views}
      │☍ ⦁ *Uploaded On:* ${video.ago}
      ╰────────────────❖  
     > *© 𝙿𝚘𝚠𝚎𝚛𝚍 𝙱𝚢 🧚‍♂️⃝𝙼𝙰𝙻𝙰𝙺𝙰-𝙼𝙳 𝚅1💕⃟*
    `;

    // Send video thumbnail as an image
    await bot.sendMessage(from, {
      image: { url: video.thumbnail },
      caption: caption
    }, { quoted: message });

    // Download the video
    const downloadResult = await fg.ytv(videoUrl);
    const videoDownloadUrl = downloadResult.dl_url;

    // Send the video file
    await bot.sendMessage(from, {
      video: { url: videoDownloadUrl },
      mimetype: "video/mp4"
    }, { quoted: message });

    // Send the video as a document
    await bot.sendMessage(from, {
      document: { url: videoDownloadUrl },
      mimetype: "video/mp4",
      fileName: `${video.title}.mp4`,
      caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚍 𝙱𝚢 𝙼𝙰𝙻𝙰𝙺𝙰-𝙼𝙳 🎬"
    }, { quoted: message });

    // React to the completion
    await options.react('✅');
  } catch (error) {
    reply(`${error}`);
  }
});

// Utility function
function hi() {
  console.log("Hello World!");
}
hi();

//video3

const videoCommand = {
  pattern: "video3",
  desc: "To download videos.",
  react: '🎥',
  category: "download",
  filename: __filename
};

cmd(videoCommand, async (bot, message, chat, context) => {
  const {
    from,
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
    isAdmins,
    reply
  } = context;

  try {
    if (!q) {
      return reply("Please give me a URL or title.");
    }

    const query = convertYouTubeLink(q);
    const searchResult = await yts(query);
    const video = searchResult.videos[0];
    const videoURL = video.url;

    const videoInfo = `
⫷⦁[ * VIDEO3 DOWNLOADING * ]⦁⫸

🎥 *Video Found!*

➥ *Title:* ${video.title}
➥ *Duration:* ${video.timestamp}
➥ *Views:* ${video.views}
➥ *Uploaded On:* ${video.ago}
➥ *Link:* ${video.url}

🎬 *Enjoy the video brought to you by Queen Anju Bot!*

🔽 *To download, send:*
1.1 *360p Video*
1.2 *480p Video*
1.3 *720p Video*
1.4 *1080p Video*

*🧚‍♂️⃝𝙼𝙰𝙻𝙰𝙺𝙰-𝙼𝙳 𝚅1💕⃟**`;

    const videoDetailsMessage = {
      image: { url: video.thumbnail },
      caption: videoInfo,
      contextInfo: {
        externalAdReply: {
          title: "MALAKA-MD",
          body: "GitHub Repository",
          sourceUrl: "https://github.com/Mrrashmika",
          thumbnailUrl: "https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/main/LOGOS/logo.jpg",
          mediaType: 1
        }
      }
    };

    const sentMessage = await bot.sendMessage(from, videoDetailsMessage);
    const messageId = sentMessage.key.id;

    bot.ev.on("messages.upsert", async (update) => {
      const newMessage = update.messages[0];
      if (!newMessage?.message) return;

      const userInput = newMessage.message.conversation || newMessage.message.extendedTextMessage?.text;
      const isReplyToBotMessage = newMessage.message.extendedTextMessage?.contextInfo?.stanzaId === messageId;

      if (isReplyToBotMessage) {
        if (userInput.startsWith("1.")) {
          const resolution = userInput === "1.1" ? "360p" :
                             userInput === "1.2" ? "480p" :
                             userInput === "1.3" ? "720p" :
                             "1080p";

          const downloadLink = await ytmp4(videoURL, resolution);

          const downloadMessage = {
            video: { url: downloadLink },
            caption: `🎥 *${resolution} Video* downloaded successfully!`,
            contextInfo: videoDetailsMessage.contextInfo
          };

          await bot.sendMessage(from, downloadMessage);
        }
      }
    });
  } catch (error) {
    console.error(error);
    reply("An error occurred while processing your request.");
  }
});

const _0x1f4754 = {
  pattern: "ytmp3",
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x1f4754, async (_0x47c60d, _0xc4860a, _0x15c110, {
  from: _0x1fefdf,
  q: _0x54220f,
  reply: _0x29b9a4
}) => {
  try {
    const _0x2eaebc = {
      text: '📥',
      key: _0xc4860a.key
    };
    const _0x37435f = {
      react: _0x2eaebc
    };
    await _0x47c60d.sendMessage(_0x1fefdf, _0x37435f);
    const _0x2f8ab8 = {
      text: "*Need link...*"
    };
    const _0x18302e = {
      quoted: _0xc4860a
    };
    if (!_0x54220f) {
      return await _0x47c60d.sendMessage(_0x1fefdf, _0x2f8ab8, _0x18302e);
    }
    let _0x589e2d = await fg.yta(_0x54220f);
    const _0x44a80d = {
      url: _0x589e2d.dl_url
    };
    const _0xfd60a2 = {
      quoted: _0xc4860a
    };
    let _0x2f9aff = await _0x47c60d.sendMessage(_0x1fefdf, {
      'audio': _0x44a80d,
      'mimetype': "audio/mpeg",
      'fileName': _0x589e2d.title + '.' + "mp3"
    }, _0xfd60a2);
    const _0x15f613 = {
      text: '📁',
      key: _0x2f9aff.key
    };
    const _0x14a7ee = {
      react: _0x15f613
    };
    await _0x47c60d.sendMessage(_0x1fefdf, _0x14a7ee);
    const _0x3c4234 = {
      text: '✔',
      key: _0xc4860a.key
    };
    const _0x5450c3 = {
      react: _0x3c4234
    };
    await _0x47c60d.sendMessage(_0x1fefdf, _0x5450c3);
  } catch (_0x59cfaf) {
    _0x29b9a4("*ERROR !!*");
    l(_0x59cfaf);
  }
});
const _0x341400 = {
  pattern: "ytmp4",
  use: ".ytmp3 <yt url>",
  react: '🎧',
  desc: "Download yt song.",
  category: "download",
  filename: __filename
};
cmd(_0x341400, async (_0x1465c1, _0x4cbde1, _0x3372ff, {
  from: _0x3d59d7,
  l: _0x3fdfbf,
  quoted: _0x3490d3,
  body: _0x1b6f0f,
  isCmd: _0xd7587e,
  command: _0x328def,
  args: _0x190d03,
  q: _0x878f41,
  isGroup: _0x5e1e0c,
  sender: _0x363c74,
  senderNumber: _0x2e0e6b,
  botNumber2: _0x2563e3,
  botNumber: _0x2c5c30,
  pushname: _0x4e9a09,
  isMe: _0x5deeaf,
  isOwner: _0x4b0c53,
  groupMetadata: _0x20d2ac,
  groupName: _0xb0884a,
  participants: _0x35bf05,
  groupAdmins: _0x42ff64,
  isBotAdmins: _0x53ed00,
  isAdmins: _0x5d2d5f,
  reply: _0x3cc11b
}) => {
  try {
    if (!ytreg(_0x878f41)) {
      return await _0x3cc11b(urlneed);
    }
    const _0x55e9dd = _0x878f41.split(" & ")[0];
    const _0x46c01a = _0x878f41.split(" & ")[1];
    if (!_0x55e9dd) {
      return _0x3cc11b(msr.url);
    }
    if (!_0x55e9dd.includes("https://youtube.com/watch?v=")) {
      return await _0x3cc11b();
    }
    let _0x5ab8a2 = await ytmp4('' + _0x55e9dd, '' + _0x46c01a);
    const _0x181915 = {
      text: '⬆',
      key: _0x4cbde1.key
    };
    const _0x5b70e8 = {
      react: _0x181915
    };
    await _0x1465c1.sendMessage(_0x3d59d7, _0x5b70e8);
    const _0x4c526e = {
      url: _0x5ab8a2
    };
    const _0x23159f = {
      video: _0x4c526e,
      mimetype: "video/mp4"
    };
    const _0x3b6e77 = {
      quoted: _0x4cbde1
    };
    await _0x1465c1.sendMessage(_0x3d59d7, _0x23159f, _0x3b6e77);
    const _0x3ca205 = {
      text: '✔',
      key: _0x4cbde1.key
    };
    const _0x448c83 = {
      react: _0x3ca205
    };
    await _0x1465c1.sendMessage(_0x3d59d7, _0x448c83);
  } catch (_0x379c99) {
    console.log(_0x379c99);
    _0x3cc11b('' + _0x379c99);
  }
});
