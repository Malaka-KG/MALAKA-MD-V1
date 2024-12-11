const { cmd, commands } = require("../command");
const fg = require('api-dylux')
const yts = require("yt-search");
const { fetchJson } = require("../lib/functions");
const axios = require("axios");

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

//mp4

const ytmp4Command = {
  pattern: "ytmp4",
  desc: "Download YouTube videos as MP4.",
  react: '🎥',
  category: "download",
  filename: __filename
};

cmd(ytmp4Command, async (client, message, args, context) => {
  const {
    from,
    quoted,
    body,
    isCmd,
    command,
    args: commandArgs,
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
      return reply("Please provide a YouTube URL or title.");
    }

    const youtubeLink = convertYouTubeLink(q);
    const searchResults = await yts(youtubeLink);
    const videoDetails = searchResults.videos[0];
    const videoUrl = videoDetails.url;

    let messageText = `
      🎥 *MP4 Download Found!* 
      
      ➥ *Title:* ${videoDetails.title} 
      ➥ *Duration:* ${videoDetails.timestamp} 
      ➥ *Views:* ${videoDetails.views} 
      ➥ *Uploaded On:* ${videoDetails.ago} 
      ➥ *Link:* ${videoDetails.url} 
      
      🎬 *Enjoy the video brought to you by Queen Anju Bot!* 
      
      🔽 *To download send:*
      
      *Video File* 🎶
         1.1 *360*
         1.2 *480*
         1.3 *720*
         1.4 *1080*
       *Document File* 📂
         2.1 *360*
         2.2 *480*
         2.3 *720*
         2.4 *1080*
      
      > *Created with ❤️ by Janith Rashmika* 
      
      > *© 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝘽𝙊𝙏 - MD*  
      *💻 GitHub:* github.com/Mrrashmika/QUEEN_ANJU_MD
    `;

    let shortMessageText = `
      🎥 *MP4 Download Found!* 
      
      ➥ *Title:* ${videoDetails.title} 
      ➥ *Duration:* ${videoDetails.timestamp} 
      ➥ *Views:* ${videoDetails.views} 
      ➥ *Uploaded On:* ${videoDetails.ago} 
      ➥ *Link:* ${videoDetails.url} 
      
      🎬 *Enjoy the video brought to you by Queen Anju Bot!* 
    `;

    const imageDetails = {
      url: videoDetails.thumbnail
    };

    const contextInfo = {
      mentionedJid: ["94717775628@s.whatsapp.net"],
      groupMentions: [],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363299978149557@newsletter",
        newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
        serverMessageId: 999
      },
      externalAdReply: {
        title: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
        body: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
        mediaType: 1,
        sourceUrl: "https://github.com/Mrrashmika",
        thumbnailUrl: "https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg",
        renderLargerThumbnail: false,
        showAdAttribution: true
      }
    };

    const imageMessage = {
      image: imageDetails,
      caption: messageText,
      contextInfo: contextInfo
    };

    const sentMessage = await client.sendMessage(from, imageMessage);
    const messageId = sentMessage.key.id;

    client.ev.on("messages.upsert", async event => {
      const newMessage = event.messages[0];
      if (!newMessage.message) {
        return;
      }

      const newMessageText = newMessage.message.conversation || newMessage.message.extendedTextMessage?.text;
      const newMessageSender = newMessage.key.remoteJid;
      const isReplyToOriginalMessage = newMessage.message.extendedTextMessage && newMessage.message.extendedTextMessage.contextInfo.stanzaId === messageId;

      if (isReplyToOriginalMessage) {
        const reactionMessage = {
          react: {
            text: '⬇️',
            key: newMessage.key
          }
        };

        await client.sendMessage(newMessageSender, reactionMessage);

        let videoQuality;
        switch (newMessageText) {
          case "1.1":
            videoQuality = "360p";
            break;
          case "1.2":
            videoQuality = "480";
            break;
          case "1.3":
            videoQuality = "720";
            break;
          case "1.4":
            videoQuality = "1080";
            break;
          case "2.1":
            videoQuality = "360";
            break;
          case "2.2":
            videoQuality = "480";
            break;
          case "2.3":
            videoQuality = "720";
            break;
          case "2.4":
            videoQuality = "1080";
            break;
          default:
            return;
        }

        const downloadLink = await ytmp4(videoUrl, videoQuality);

        const confirmReactionMessage = {
          react: {
            text: '⬆️',
            key: newMessage.key
          }
        };

        await client.sendMessage(newMessageSender, confirmReactionMessage);

        const videoDetails = {
          url: downloadLink
        };

        const videoMessage = {
          video: videoDetails,
          caption: shortMessageText,
          contextInfo: contextInfo
        };

        await client.sendMessage(newMessageSender, videoMessage);
      }
    });
  } catch (error) {
    console.error(error);
    reply("There was an error processing your request.");
  }
});

//mp3

const ytmp3Command = {
  pattern: "ytmp3",
  desc: "Download YouTube videos as MP3.",
  react: '🎵',
  category: "download",
  filename: __filename
};

cmd(ytmp3Command, async (client, message, chat, context) => {
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
      return reply("Please provide a YouTube URL or title.");
    }

    const youtubeLink = convertYouTubeLink(q);
    const searchResults = await yts(youtubeLink);
    const video = searchResults.videos[0];
    const videoUrl = video.url;

    let audioResponse = `
🎵 *MP3 Download Found!* 

➥ *Title:* ${video.title} 
➥ *Duration:* ${video.timestamp} 
➥ *Views:* ${video.views} 
➥ *Uploaded On:* ${video.ago} 
➥ *Link:* ${video.url} 

🎧 *Enjoy the audio brought to you by Queen Anju Bot!* 

🔽 *To download send:*

1. *Audio File* 🎶
2. *Document File* 📂

> *Created with ❤️ by Janith Rashmika* 

> *© 𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃 - MD*  
*💻 GitHub:* github.com/Mrrashmika/QUEEN_ANJU_MD
`;

    let videoResponse = `
🎥 *MP3 Download Found!* 

➥ *Title:* ${video.title} 
➥ *Duration:* ${video.timestamp} 
➥ *Views:* ${video.views} 
➥ *Uploaded On:* ${video.ago} 
➥ *Link:* ${video.url} 

🎬 *Enjoy the video brought to you by Queen Anju Bot!* 
`;

    const image = { url: video.thumbnail };
    const contextInfo = {
      mentionedJid: ["94717775628@s.whatsapp.net"],
      groupMentions: [],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {},
      externalAdReply: {}
    };

    contextInfo.forwardedNewsletterMessageInfo.newsletterJid = "120363299978149557@newsletter";
    contextInfo.forwardedNewsletterMessageInfo.newsletterName = "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃";
    contextInfo.forwardedNewsletterMessageInfo.serverMessageId = 999;
    contextInfo.externalAdReply.title = "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃";
    contextInfo.externalAdReply.body = "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃";
    contextInfo.externalAdReply.mediaType = 1;
    contextInfo.externalAdReply.sourceUrl = "https://github.com/Mrrashmika";
    contextInfo.externalAdReply.thumbnailUrl = "https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg";
    contextInfo.externalAdReply.renderLargerThumbnail = false;
    contextInfo.externalAdReply.showAdAttribution = true;

    const messageData = {
      image,
      caption: audioResponse,
      contextInfo
    };

    const sentMessage = await client.sendMessage(from, messageData);
    const messageId = sentMessage.key.id;

    client.ev.on("messages.upsert", async event => {
      const newMessage = event.messages[0];
      if (!newMessage.message) {
        return;
      }

      const conversation = newMessage.message.conversation || newMessage.message.extendedTextMessage?.text;
      const remoteJid = newMessage.key.remoteJid;
      const isReply = newMessage.message.extendedTextMessage && newMessage.message.extendedTextMessage.contextInfo.stanzaId === messageId;

      if (isReply) {
        const downReaction = {
          text: '⬇️',
          key: newMessage.key
        };

        const reactDown = {
          react: downReaction
        };

        await client.sendMessage(remoteJid, reactDown);

        const mp3Result = await ytmp3(videoUrl);
        const downloadLink = mp3Result.dl_link;

        const upReaction = {
          text: '⬆️',
          key: newMessage.key
        };

        const reactUp = {
          react: upReaction
        };

        await client.sendMessage(remoteJid, reactUp);

        if (conversation === '1') {
          const audioMessage = {
            audio: { url: downloadLink },
            mimetype: "audio/mpeg",
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
          };

          const quotedMessage = {
            quoted: newMessage
          };

          await client.sendMessage(remoteJid, audioMessage, quotedMessage);
        } else if (conversation === '2') {
          const documentMessage = {
            document: { url: downloadLink },
            mimetype: "audio/mp3",
            fileName: `${video.title}.mp3`,
            caption: videoResponse,
            contextInfo: {
              mentionedJid: ["94717775628@s.whatsapp.net"],
              groupMentions: [],
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363299978149557@newsletter",
                newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
                serverMessageId: 999
              },
              externalAdReply: {
                title: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
                body: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
                mediaType: 1,
                sourceUrl: "https://github.com/Mrrashmika",
                thumbnailUrl: "https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg",
                renderLargerThumbnail: false,
                showAdAttribution: true
              }
            }
          };

          await client.sendMessage(remoteJid, documentMessage);
        }

        const successReaction = {
          text: '✅',
          key: newMessage.key
        };

        const reactSuccess = {
          react: successReaction
        };

        await client.sendMessage(remoteJid, reactSuccess);

        console.log("Response sent successfully");
      }
    });
  } catch (error) {
    console.log(error);
    reply(`${error}`);
  }
});

//video4

const videoCommand = {
  pattern: "video4",
  desc: "To download videos.",
  react: '🎥',
  use: ".video < Text or Link >",
  category: "download",
  filename: __filename
};

cmd(videoCommand, async (client, message, args, context) => {
  const {
    prefix,
    from,
    quoted,
    body,
    isCmd,
    command,
    args: commandArgs,
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
    const replyMsg = (await fetchJson("https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json")).replyMsg;
    
    if (!q) {
      return reply(replyMsg.giveme);
    }

    let query = convertYouTubeLink(q);
    const searchResults = await yts(query);
    const video = searchResults.videos[0];
    const videoUrl = video.url;

    const details = (await axios.get("https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json")).data;
    let footerText = details.footer;

    const sections = [{
      title: "*`[1] Video File`* 🎶",
      rows: [
        { title: "   1.1", rowId: `${prefix}ytmp4 ${videoUrl} & 360p`, description: "Video `360` File 🎶" },
        { title: "   1.2", rowId: `${prefix}ytmp4 ${videoUrl} & 480p`, description: "Video `480` File 🎶" },
        { title: "   1.3", rowId: `${prefix}ytmp4 ${videoUrl} & 720p`, description: "Video `720` File 🎶" },
        { title: "   1.4", rowId: `${prefix}ytmp4 ${videoUrl} & 1080p`, description: "Video `1080` File 🎶" }
      ]
    }, {
      title: "*`[2] Document File`* 📂",
      rows: [
        { title: "   2.1", rowId: `${prefix}ytvdoc ${videoUrl} & 360p`, description: "Document `360` File 📂" },
        { title: "   2.2", rowId: `${prefix}ytvdoc ${videoUrl} & 480p`, description: "Document `480` File 📂" },
        { title: "   2.3", rowId: `${prefix}ytvdoc ${videoUrl} & 720p`, description: "Document `720` File 📂" },
        { title: "   2.4", rowId: `${prefix}ytvdoc ${videoUrl} & 1080p`, description: "Document `1080` File 📂" }
      ]
    }];

    const videoInfo = `
*📽️ASITHA-MD VIDEO-DOWNLOADER📽️*  
*|__________________________*
*|-ℹ️ 𝗧𝗶𝘁𝗹𝗲 :* ${video.title}
*|-🕘 𝗧𝗶𝗺𝗲 :* ${video.timestamp}
*|-📌 𝗔𝗴𝗼 :* ${video.ago}
*|-📉 𝗩𝗶𝗲𝘄𝘀 :* ${video.views}
*|-🔗 𝗟𝗶𝗻𝗸 :* ${video.url}
*|__________________________*
`;

    const imageDetails = { url: video.thumbnail };
    const listMessage = {
      caption: videoInfo,
      image: imageDetails,
      footer: footerText,
      title: '',
      buttonText: "*🔢 Reply below number*",
      sections: sections
    };

    const options = { quoted: message };
    return await client.replyList(from, listMessage, options);
  } catch (error) {
    reply("*ERROR !!*");
    console.error(error);
  }
});

