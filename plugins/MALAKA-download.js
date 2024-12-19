const { fetchJson } = require("../lib/functions");
const cheerio = require("cheerio");
const { downloadTiktok } = require('@mrnima/tiktok-downloader');
const { facebook } = require("@mrnima/facebook-downloader");
const { igdl } = require("ruhend-scraper");
const axios = require('axios');
const { cmd, commands } = require("../command");
const config = require('../config'); // Ensure your API key is in config
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js'); // request package.json "@dark-yasiya/yt-dl.js": "latest"
const apilink = 'https://www.dark-yasiya-api.site' // API LINK ( DO NOT CHANGE THIS!! )
const apkdl = require('../lib/apkdl')

cmd({
  pattern: 'fb',
  alias: ["facebook"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
}, async (bot, message, chat, options) => {
  try {
    const { from, q: url, reply } = options;

    // Validate URL
    if (!url || !url.startsWith("https://")) {
      return reply("Please provide a valid Facebook video URL.");
    }

    // React to the command
    await bot.sendMessage(from, { react: { text: '⏳', key: message.key } });

    // Fetch Facebook video details
    const videoData = await facebook(url);
    if (!videoData || !videoData.result) {
      return reply("Failed to fetch Facebook video details. Please try again.");
    }

    // Build options menu
    const caption = `
    *ᴍᴀʟᴀᴋᴀ-ᴍᴅ ꜰʙ⚬*⌛ᴅᴜʀᴀᴛɪᴏɴ*
    *Duration*: ${videoData.result.duration}
    ╭──────────────────❖
    │ © 𝙏𝙤 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙 𝙨𝙚𝙣𝙙: 🔢
    │
    │ ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴠɪᴅᴇᴏ ꜰɪʟᴇ 🎬      
    │
    │ _➀ *ꜱᴅ ᴍᴀʟᴀᴋᴀ-ᴍᴅ*
    │ _➁ *ʜᴅ ᴍᴀʟᴀᴋᴀ-ᴍᴅ*
    │ 
    │ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴅᴏᴄᴜᴍᴇɴᴛ 🎧
    │
    │ _➂ *ᴀᴜᴅɪᴏ*
    │ _➃ *ᴅᴏᴄᴜᴍᴇɴᴛ*
    │ _➄ *ᴠᴏɪᴄᴇ*
    ╰──────────────────❖
    > ᴍᴀʟᴀᴋᴀ-ᴍᴅ . . . 👩‍💻
    `;

    const menuMessage = await bot.sendMessage(from, {
      image: { url: videoData.result.thumbnail },
      caption,
    }, { quoted: message });

    // Listen for user response
    bot.ev.on("messages.upsert", async (update) => {
      const response = update.messages[0];
      if (!response.message) return;

      const userChoice = response.message.conversation || response.message.extendedTextMessage?.text;
      const isReply = response.message.extendedTextMessage?.contextInfo.stanzaId === menuMessage.key.id;

      if (isReply) {
        await bot.sendMessage(from, { react: { text: '⬇️', key: response.key } });

        const { links } = videoData.result;

        switch (userChoice) {
          case "1":
            await bot.sendMessage(from, { video: { url: links.SD }, caption: ">*ᴍᴀʟᴀᴋᴀ-ᴍᴅ SD video." });
            break;
          case "2":
            await bot.sendMessage(from, { video: { url: links.HD }, caption: ">*ᴍᴀʟᴀᴋᴀ-ᴍᴅ HD video." });
            break;
          case "3":
            await bot.sendMessage(from, { audio: { url: links.SD }, mimetype: "audio/mpeg" });
            break;
          case "4":
            await bot.sendMessage(from, {
              document: { url: links.SD },
              mimetype: "audio/mpeg",
              fileName: "Facebook_Audio.mp3",
              caption: "Here is your audio as a document.",
            });
            break;
          case "5":
            await bot.sendMessage(from, { audio: { url: links.SD }, mimetype: "audio/mp4", ptt: true });
            break;
          default:
            reply("Invalid choice. Please reply with a valid number.");
        }

        await bot.sendMessage(from, { react: { text: '⬆️', key: response.key } });
      }
    });

  } catch (error) {
    console.error(error);
    reply("An error occurred while processing your request. Please try again.");
  }
});

cmd({
  pattern: "tiktok",
  alias: ['tt'],
  react: '🎥',
  desc: "Download TikTok videos",
  category: "download",
  filename: __filename
}, async (bot, message, chat, options) => {
  try {
    const { from, q: url, reply } = options;

    // Validate URL
    if (!url || !url.startsWith("https://")) {
      return reply("Please provide a valid TikTok URL.");
    }

    // React to command
    chat.react('⬇️');

    // Fetch download links
    const videoData = await downloadTiktok(url);
    if (!videoData || !videoData.result) {
      return reply("Failed to fetch TikTok video details. Please try again.");
    }

    // Send options to user
    const caption = `
    *ᴍᴀʟᴀᴋᴀ-ᴍᴅ ᴛɪᴋᴛᴏᴋ⚬*⌛ᴛɪᴛʟᴇ*
    *Title*: ${videoData.result.title}
    ╭──────────────────❖
    │ © 𝙏𝙤 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙 𝙨𝙚𝙣𝙙: 🔢
    │
    │ ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴠɪᴅᴇᴏ ꜰɪʟᴇ 🎬      
    │
    │ _➀ *ꜱᴅ* ᴍᴀʟᴀᴋᴀ-ᴍᴅ*
    │ _➁ *ʜᴅ* ᴍᴀʟᴀᴋᴀ-ᴍᴅ*
    │ 
    │ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴅᴏᴄᴜᴍᴇɴᴛ 🎧
    │
    │ _➂ *ᴀᴜᴅɪᴏ* ᴍᴀʟᴀᴋᴀ-ᴍᴅ*
    │ 
    ╰──────────────────❖
    > ᴍᴀʟᴀᴋᴀ-ᴍᴅ . . . 👩‍💻
    `;
    const menuMessage = await bot.sendMessage(from, {
      image: { url: videoData.result.image },
      caption,
    });

    // Wait for user selection
    bot.ev.on("messages.upsert", async (update) => {
      const response = update.messages[0];
      if (!response.message) return;

      const userChoice = response.message.conversation || response.message.extendedTextMessage?.text;
      const isReply = response.message.extendedTextMessage?.contextInfo.stanzaId === menuMessage.key.id;

      if (isReply) {
        // Process user selection
        chat.react('⬇️');
        const { dl_link } = videoData.result;

        if (userChoice === '1') {
          await bot.sendMessage(from, { video: { url: dl_link.download_mp4_1 }, caption: "> ᴍᴀʟᴀᴋᴀ-ᴍᴅ SD video!" });
        } else if (userChoice === '2') {
          await bot.sendMessage(from, { video: { url: dl_link.download_mp4_2 }, caption: "> ᴍᴀʟᴀᴋᴀ-ᴍᴅ HD video!" });
        } else if (userChoice === '3') {
          await bot.sendMessage(from, { audio: { url: dl_link.download_mp3 }, mimetype: "audio/mpeg" });
        } else {
          reply("Invalid choice. Please reply with 1, 2, or 3.");
        }
        chat.react('⬆️');
      }
    });

  } catch (error) {
    console.error(error);
    reply("An error occurred. Please try again.");
  }
});

cmd({
  pattern: 'ig',
  alias: ["insta"],
  desc: "Download Instagram videos.",
  react: '🎥',
  category: "download",
  filename: __filename
}, async (_0x386562, _0x1b4817, _0x2d5654, {
  from: _0x2b1245,
  quoted: _0x35994d,
  q: _0x133e89,
  reply: _0x1bd856
}) => {
  try {
    // Validate URL
    if (!_0x133e89 || !/^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\//.test(_0x133e89)) {
      return _0x2d5654.reply("Please provide a valid Instagram link.");
    }
    
    _0x2d5654.react('⬇️');

    // Fetch video data
    let _0x46b060 = await igdl(_0x133e89);
    if (!_0x46b060.data || _0x46b060.data.length === 0) {
      return _0x2d5654.reply("No videos found for the provided link.");
    }

    // Send each video
    for (let video of _0x46b060.data) {
      if (!video.url) continue; // Skip if URL is missing
      _0x2d5654.react('⬆️');
      await _0x386562.sendMessage(_0x2b1245, {
        video: { url: video.url },
        mimetype: "video/mp4",
        caption: "> © ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·*"
      }, { quoted: _0x1b4817 });
    }

    _0x2d5654.react('✅');
  } catch (error) {
    console.error(error);
    _0x2d5654.reply("An error occurred while processing your request.");
  }
});

cmd({
  pattern: "baiscope",
  alias: ["movie2"],
  react: '📑',
  category: "download",
  desc: 'baiscope.lk',
  filename: __filename
}, async (message, response, context) => {
  const { from, q, reply } = context;

  try {
    // Ensure a search query is provided
    if (!q) {
      return await reply("*Please provide a search query! (e.g., Avatar)*");
    }

    // Fetch search results from baiscope.lk
    const searchUrl = `https://www.baiscope.lk/?s=${encodeURIComponent(q)}`;
    const searchResponse = await axios.get(searchUrl);
    const $ = cheerio.load(searchResponse.data);

    let results = [];

    $('article.elementor-post').each((index, element) => {
      const title = $(element).find("h5.elementor-post__title > a").text().trim();
      const episodeLink = $(element).find("h5.elementor-post__title > a").attr("href");
      const imgUrl = $(element).find(".elementor-post__thumbnail img").attr("src");

      if (title && episodeLink && imgUrl) {
        results.push({
          title: title,
          episodeLink: episodeLink,
          imgUrl: imgUrl
        });
      }
    });

    if (results.length === 0) {
      return await reply(`No results found for: ${q}`);
    }

    // Send search results to user
    let responseText = `📺 Search Results for *${q}:*\n\n`;
    results.forEach((result, index) => {
      responseText += `*${index + 1}.* ${result.title}\n🔗 Link: ${result.episodeLink}\n\n`;
    });

    const sentMessage = await message.sendMessage(from, { text: responseText }, { quoted: context });
    const messageId = sentMessage.key.id;

    // Listen for user's selection
    message.ev.on("messages.upsert", async (upsert) => {
      const incomingMessage = upsert.messages[0];
      if (!incomingMessage.message) return;

      const userResponse = incomingMessage.message.conversation || incomingMessage.message.extendedTextMessage?.text;
      const senderId = incomingMessage.key.remoteJid;
      const isReplyToBot = incomingMessage.message.extendedTextMessage && incomingMessage.message.extendedTextMessage.contextInfo.stanzaId === messageId;

      if (isReplyToBot) {
        const selectedIndex = parseInt(userResponse.trim());

        if (!isNaN(selectedIndex) && selectedIndex > 0 && selectedIndex <= results.length) {
          const selectedEpisode = results[selectedIndex - 1];
          const episodeResponse = await axios.get(selectedEpisode.episodeLink);
          const $episodePage = cheerio.load(episodeResponse.data);
          const downloadLink = $episodePage("a.dlm-buttons-button").attr('href');

          if (downloadLink) {
            await message.sendMessage(senderId, {
              image: { url: selectedEpisode.imgUrl },
              caption: `🎬 *${selectedEpisode.title}*\n🔗 Link: ${selectedEpisode.episodeLink}\n⬇️ Download will follow.`
            }, { quoted: incomingMessage });

            const filePath = path.join(__dirname, 'downloaded_episode.zip');
            const fileStream = fs.createWriteStream(filePath);
            const downloadResponse = await axios({
              url: downloadLink,
              method: "GET",
              responseType: "stream"
            });

            downloadResponse.data.pipe(fileStream);

            fileStream.on("finish", async () => {
              await message.sendMessage(senderId, {
                document: { url: filePath },
                mimetype: "application/zip",
                fileName: `${selectedEpisode.title}.zip`,
                caption: `*${selectedEpisode.title}*\n\n> ᴍᴀʟᴀᴋᴀ-ᴍᴅ ✻`
              }, { quoted: incomingMessage });
              fs.unlinkSync(filePath);
            });

            fileStream.on("error", async (error) => {
              console.error("Error downloading ZIP file:", error);
              await reply("*Error downloading the episode ZIP file.*");
            });
          } else {
            await reply("*Download link not found for the selected episode.*");
          }
        } else {
          await reply("*Invalid selection. Please choose a valid number.*");
        }
      }
    });
  } catch (error) {
    console.error(error);
    await reply("*An error occurred while scraping the data.*");
  }
});

cmd({
  pattern: "ginisisila",
  alias: ["cartoon"],
  react: "📑",
  category: "download",
  desc: "ginisisilacartoon.net",
  filename: __filename
}, async (_bot, _message, _quoted, { from, q, isDev, reply }) => {
  try {
    if (!q) {
      return await reply("*Please provide a search query! (e.g., Garfield)*");
    }

    const searchUrl = "https://ginisisilacartoon.net/search.php?q=" + encodeURIComponent(q);
    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);
    let results = [];

    $("div.inner-video-cell").each((index, element) => {
      const title = $(element).find("div.video-title > a").attr("title");
      const postedTime = $(element).find("div.posted-time").text().trim();
      const episodeLink = $(element).find("div.video-title > a").attr("href");
      const imageUrl = $(element).find("div.inner-video-thumb-wrapper img").attr("src");

      if (title && episodeLink) {
        results.push({
          title,
          postedTime,
          episodeLink: "https://ginisisilacartoon.net/" + episodeLink,
          imageUrl
        });
      }
    });

    if (results.length === 0) {
      return await reply("No results found for: " + q);
    }

    let resultMessage = `🔢 *Please reply with the number you want to select*\n\n📺 Search Results for *${q}:*\n\n`;
    results.forEach((item, index) => {
      resultMessage += `*${index + 1}.* ${item.title}\n🗓️ Posted: ${item.postedTime}\n🔗 Link: ${item.episodeLink}\n\n`;
    });

    const sentMessage = await _bot.sendMessage(from, { text: resultMessage }, { quoted: _quoted });
    const sentMessageId = sentMessage.key.id;

    _bot.ev.on("messages.upsert", async event => {
      const msg = event.messages[0];
      if (!msg.message) return;

      const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
      const isReply = msg.message.extendedTextMessage && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMessageId;

      if (isReply) {
        const selectedNumber = parseInt(text.trim());
        if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= results.length) {
          const selectedResult = results[selectedNumber - 1];
          const detailsMessage = `*🪄 Name:* ${selectedResult.title}\n⏳ *Date:* ${selectedResult.postedTime}\n📎 *Episode Link:* ${selectedResult.episodeLink}\n\n☘ *We are uploading the Movie/Episode you requested.*`;

          await _bot.sendMessage(from, {
            image: { url: selectedResult.imageUrl },
            caption: detailsMessage
          }, { quoted: msg });

          const episodeResponse = await axios.get(selectedResult.episodeLink);
          const episodePage = cheerio.load(episodeResponse.data);
          const videoSrc = episodePage("div#player-holder iframe").attr("src");

          if (videoSrc) {
            const apiUrl = "https://www.dark-yasiya-api.site/download/ginisisila?url=" + videoSrc;
            try {
              const apiResponse = await axios.get(apiUrl);
              const downloadLink = apiResponse.data.result.dl_link;

              if (downloadLink) {
                await _bot.sendMessage(from, {
                  document: { url: downloadLink },
                  mimetype: "video/mp4",
                  fileName: `Sadeesha | ${selectedResult.title}.mp4`,
                  caption: `${selectedResult.title} |  *SADEESHA CODER*\n\n> Laara-MD`
                }, { quoted: msg });
              } else {
                await reply("Failed to retrieve the download link for this episode.");
              }
            } catch (error) {
              console.error("Error fetching the download link:", error);
              await reply("An error occurred while trying to fetch the download link.");
            }
          } else {
            await reply("No downloadable link found for this episode.");
          }
        } else {
          await reply("Please reply with a valid number from the list.");
        }
      }
    });
  } catch (error) {
    await reply("*Error occurred while scraping!*");
    console.error(error);
  }
});

cmd({
  pattern: 'gdrive',
  desc: "To download Gdrive files.",
  react: '🌐',
  category: "download",
  filename: __filename
}, async (message, response, context) => {
  const { from, quoted, body, q: query, reply } = context;

  try {
    // React to the message indicating the process has started
    await message.sendMessage(from, {
      react: {
        text: '⬇️',
        key: response.key
      }
    });

    // Check if a valid link is provided
    if (!query) {
      return reply("Please provide a valid link.");
    }

    // Fetch download URL from the API
    const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${query}&apikey=mnp3grlZ`;
    const apiResponse = await axios.get(apiUrl);
    const downloadUrl = apiResponse.data.result.downloadUrl;
    const mimeType = apiResponse.data.result.mimetype;
    const fileName = apiResponse.data.result.fileName;

    if (downloadUrl) {
      // React to the message indicating the process is uploading
      await message.sendMessage(from, {
        react: {
          text: '⬆️',
          key: response.key
        }
      });

      // Send the file to the user
      await message.sendMessage(from, {
        document: {
          url: downloadUrl
        },
        mimetype: mimeType,
        fileName: fileName,
        caption: "*© ᴍᴀʟᴀᴋᴀ-ᴍᴅ*\n\n> ᴅᴀʀᴋ-ᴀʟꜰʜᴀ-ʙᴏᴛ ✻"
      }, {
        quoted: response
      });

      // React to the message indicating the process is complete
      await message.sendMessage(from, {
        react: {
          text: '✅',
          key: response.key
        }
      });
    } else {
      // React to the message indicating an error occurred
      await message.sendMessage(from, {
        react: {
          text: '❌',
          key: response.key
        }
      });

      reply("Failed to retrieve the download link.");
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while processing your request.");
  }
});

//download fb

cmd({
    pattern: "fb2",
    desc: "To download facebook videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

 await conn.sendMessage(from, { text: '📥 *ᴍᴀʟᴀᴋᴀ-ᴍᴅ ιѕ ᴅᴏᴡɴʟᴏᴅɪɴɢ...* 📥' }, { quoted: mek });


  if (!args[0]) {
    return reply('*`Please give a waild Facebook link`*');
  }

  await m.react('🕒');
  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return reply('*`Error obtaining data.`*');
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return reply('*`No resalt found.`*');
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (error) {
    return reply('*`Error data loss.`*');
  }

  if (!data) {
    return reply('*`No data found.`*');
  }

  await m.react('✅');
  let video = data.url;
  let dev = '© 2024 𝘔𝘢𝘭𝘢𝘬𝘢 FB DOWNLOAD HD.'
  
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, caption: dev, fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: m });
  } catch (error) {
    return reply('*`Error download video.`*');
  await m.react('❌');
  }
}catch(e){
console.log(e)
  reply(`${e}`)
}
});

cmd({
    pattern: "song2",
    alias: ["mp3","ytsong"],
    react: "🎶",
    desc: "Download Youtube song",
    category: "download",
    use: '.song < Yt url or Name >',
    filename: __filename
},
async(conn, mek, m,{ from, prefix, quoted, q, reply }) => {
try{

if(!q) return await reply("Please give me Yt url or Name")
	
const yt = await ytsearch(q);
if(yt.results.length < 1) return reply("Results is not found !")

let yts = yt.results[0]  
const ytdl = await ytmp3(yts.url)
		
let ytmsg = `
╭─────────────────❖
│*SONG DOWNLOADER* 🎶
╰─────────────────❖
──────────────────❖
╭────────────────❖
│ ℹ️ *MALAKA-MD* 
│
│☍ ⦁ *TITLE :* ${yts.title}
│☍ ⦁ *AUTHOR :* ${yts.author.name}
│☍ ⦁ *RUNTIME :* ${yts.timestamp}
│☍ ⦁ *VIEWS :* ${yts.views}
╰────────────────❖
──────────────────❖
> ᴍᴀʟᴀᴋᴀ-ᴍᴅ . . . 👩‍💻
`
// SEND DETAILS
await conn.sendMessage(from, { image: { url: yts.thumbnail || yts.image || '' }, caption: `${ytmsg}`}, { quoted: mek });

// SEND AUDIO TYPE
await conn.sendMessage(from, { audio: { url: ytdl.download.url }, mimetype: "audio/mpeg" }, { quoted: mek })

// SEND DOC TYPE
await conn.sendMessage(from, { document: { url: ytdl.download.url }, mimetype: "audio/mpeg", fileName: ytdl.result.title + '.mp3', caption: `${ytdl.result.title}` }, { quoted: mek })


} catch (e) {
console.log(e)
reply(e)
}}
)

// FOLLOW US:  𝘔𝘈𝘓𝘈𝘒𝘈

cmd({
    pattern: "mfire",
    alias: ["mf","mediafire"],
    react: "🔥",
    desc: "",
    category: "download",
    use: '.mfire < mediafire url >',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply, q }) => {
try{
  
if(!q) return await reply("Please give me mediafire url");
  if(!q.includes('mediafire.com')) return await reply("This url is invalid");
  
const mfire = await fetchJson(`${apilink}/download/mfire?url=${q}`);
  
const msg = `
╭─────────────────❖
│🔥*MEDIAFIRE DOWNLOADER*🔥
╰─────────────────❖
──────────────────❖
╭────────────────❖
│ ℹ️ *MALAKA-MD* 
│
│☍ ⦁ *File Name* - ${mfire.result.fileName}
│☍ ⦁ *File Size* - ${mfire.result.size}
│☍ ⦁ *Upload Date and Time* - ${mfire.result.date}
╰────────────────❖
──────────────────❖
> ᴍᴀʟᴀᴋᴀ-ᴍᴅ . . . 👩‍💻
`
  
// SEND DETAILS
await conn.sendMessage( from, { image: { url: 'https://i.ibb.co/dPw1fHD/mfire.jpg' }, caption: msg }, { quoted: mek });

// SEND FILE
await conn.sendMessage(from, { document: { url: mfire.result.dl_link }, mimetype: mfire.result.fileType , fileName: mfire.result.fileName, caption: mfire.result.fileName }, { quoted: mek });

  
} catch (e) {
console.log(e)
reply('This url type is not working !!')
}
})

cmd({
    pattern: "tiktok2",
    alias: ["tt2","ttdown2"],
    react: "📥",
    desc: "",
    category: "download",
    use: '.tiktok < url >',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply, q }) => {
try{
  
if(!q) return await reply("Please give me tiktok url");
  if(!q.includes('tiktok.com')) return await reply("This url is invalid");
  
const tiktok = await fetchJson(`${apilink}/download/tiktok?url=${q}`);
  
const msg = `
╭─────────────────❖
│📥*TIKTOK DOWNLOADER*📥
╰─────────────────❖
──────────────────❖
╭────────────────❖
│ ℹ️ *MALAKA-MD* 
│
│☍ ⦁ *Title* - ${tiktok.result.title}
│☍ ⦁ *Author* - ${tiktok.result.author}
│☍ ⦁ *Duration* - ${tiktok.result.duration}
│☍ ⦁ *Views* - ${tiktok.result.views}
╰────────────────❖
──────────────────❖
> ᴍᴀʟᴀᴋᴀ-ᴍᴅ . . . 👩‍💻
`
  
// SEND DETAILS
await conn.sendMessage( from, { image: { url: tiktok.result.cover || '' }, caption: msg }, { quoted: mek });

// SEND WATER MARK VIDEO
await conn.sendMessage(from, { video: { url: tiktok.result.wmVideo }, mimetype: "video/mp4", caption: `${tiktok.result.title}WATERMARK VIDEO ✅` }, { quoted: mek });
  
// SEND HD VIDEO
await conn.sendMessage(from, { video: { url: tiktok.result.hdVideo }, mimetype: "video/mp4", caption: `${tiktok.result.title}NO-WATERMARK VIDEO ✅` }, { quoted: mek });
  
// SEND AUDIO
await conn.sendMessage(from, { audio: { url: tiktok.result.sound }, mimetype: "audio/mpeg" }, { quoted: mek });

  
} catch (e) {
console.log(e)
reply(e)
}
})

cmd({
    pattern: "xvideo",
    alias: ["xvdl","xvdown"],
    react: "🔞",
    desc: "Download xvideo.com porn video",
    category: "download",
    use: '.xvideo < text >',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply, q }) => {
try{

  if(!q) return await reply("Please give me few word !")
    
const xv_list = await fetchJson(`${apilink}/search/xvideo?q=${q}`)
if(xv_list.result.length < 0) return await reply("Not results found !")

const xv_info = await fetchJson(`${apilink}/download/xvideo?url=${xv_list.result[0].url}`)
    
  // FIRST VIDEO
  
const msg = `
╭─────────────────❖
│🔞*XVIDEO DOWNLOADER*🔞
╰─────────────────❖
 ──────────────────❖
╭────────────────❖
│ ℹ️ *DARK_ALFHA_MD* 
│
│☍ ⦁ *Title* - ${xv_info.result.title}
│☍ ⦁ *Views* - ${xv_info.result.views}
│☍ ⦁ *Like* - ${xv_info.result.like}
│☍ ⦁ *Deslike* - ${xv_info.result.deslike}
│☍ ⦁ *Size* - ${xv_info.result.size}
╰────────────────❖
──────────────────❖
> ᴍᴀʟᴀᴋᴀ-ᴍᴅ ʙʏ ᴅᴀʀᴋ-ᴀʟꜰʜᴀ-ʙᴏᴛ . . . 👩‍💻
`


await conn.sendMessage( from, { image: { url: xv_info.result.image || '' }, caption: msg }, { quoted: mek })

// XVIDEO
await conn.sendMessage(from, { video: { url: xv_info.result.dl_link }, mimetype: "video/mp4", fileName: xv_info.result.title, caption: xv_info.result.title }, { quoted: mek });

// SEND VIDEO
await conn.sendMessage(from, { document: { url: xv_info.result.dl_link }, mimetype: "video/mp4", fileName: xv_info.result.title, caption: xv_info.result.title }, { quoted: mek });


} catch (error) {
console.log(error)
reply(error)
}
})

// download apk whatsapp

cmd({
    pattern: "apk",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: 'Need apk link...' }, { quoted: mek } ) 
const data = await apkdl.download(q)
let listdata = `📚 Name : ${data.name}
📦 Developer : ${data.package}
⬆️ Last update : ${data.lastup}
📥 Size : ${data.size}`
await conn.sendMessage(from, { image: { url: data.icon }, caption: listdata }, { quoted: mek })
//if (data.size.includes('GB')) return await conn.sendMessage(from , { text: 'File size is too big...' }, { quoted: mek } )
//if (data.size.includes('MB') && data.size.replace(' MB','') > config.MAX_SIZE) return await conn.sendMessage(from , { text: 'File size is too big...' }, { quoted: mek } )
let sendapk = await conn.sendMessage(from , { document : { url : data.dllink } , mimetype : 'application/vnd.android.package-archive' , fileName : data.name + '.' + 'apk',caption: '' } , { quoted: mek })
await conn.sendMessage(from, { react: { text: '📁', key: sendapk.key }})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply('ERROR !!')
    console.log(e)
}
})

//xvideo

cmd({
  pattern: 'pussybdl',
  alias: ["dlpussyb", "pussybdown", "hentaivid"],
  desc: "Download adult videos from pussyboy.net.",
  category: "nsfw",
  react: "🔞",
  filename: __filename
}, async (bot, message, context, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  query,
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
    // React to the message with an emoji
    await context.react('🔞');

    // Construct the video URL
    const videoUrl = "https://www.pussyboy.net/porn/" + query + '/';

    // Fetch the webpage
    const response = await fetch(videoUrl);
    const html = await response.text();

    // Parse the HTML content
    const $ = cheerio.load(html);

    // Extract the video source URL
    const videoSource = $("body > div.container-xxl.videos > div.col-md-12.videos-detail > div.col-md-12.videos-details > div > video > source").attr("src");

    // Send the video as a message
    await bot.sendMessage(from, {
      video: { url: videoSource },
      mimetype: "video/mp4",
      caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚍 𝙱𝚢 🧚‍♂️⃝𝙼𝙰𝙻𝙰𝙺𝙰-𝙼𝙳 𝚅1💕⃟*"
    }, { quoted: message });
  } catch (error) {
    // Log the error and reply with the error message
    console.error(error);
    reply('Error: ' + error.message);
  }
});

const { sinhalaSub } = require("mrnima-moviedl");

cmd({
  pattern: "sinhalasub",
  alias: ["movie"],
  react: '📑',
  category: "download",
  desc: "Search movies on sinhalasub and get download links",
  filename: __filename
}, async (context, event, args, { from, q, reply }) => {
  try {
    if (!q) {
      return await reply("*Please provide a search query! (e.g., Deadpool)*");
    }

    const sinhalaSubApi = await sinhalaSub();
    const searchResults = await sinhalaSubApi.search(q);
    const topResults = searchResults.result.slice(0, 10);

    if (!topResults || topResults.length === 0) {
      return await reply(`No results found for: ${q}`);
    }

    let responseMessage = `📽️ *Search Results for* "${q}":\n\n`;
    topResults.forEach((result, index) => {
      responseMessage += `*${index + 1}.* ${result.title}\n🔗 Link: ${result.link}\n\n`;
    });

    const sentMessage = await context.sendMessage(from, { text: responseMessage }, { quoted: event });
    const messageId = sentMessage.key.id;

    context.ev.on("messages.upsert", async messageEvent => {
      const incomingMessage = messageEvent.messages[0];
      if (!incomingMessage.message) return;

      const userMessage = incomingMessage.message.conversation || incomingMessage.message.extendedTextMessage?.text;
      const isReplyToSentMessage = incomingMessage.message.extendedTextMessage && incomingMessage.message.extendedTextMessage.contextInfo.stanzaId === messageId;

      if (isReplyToSentMessage) {
        const selectedIndex = parseInt(userMessage.trim());
        if (!isNaN(selectedIndex) && selectedIndex > 0 && selectedIndex <= topResults.length) {
          const selectedMovie = topResults[selectedIndex - 1];
          const apiUrl = `https://api-site-2.vercel.app/api/sinhalasub/movie?url=${encodeURIComponent(selectedMovie.link)}`;
          try {
            const movieDetails = await axios.get(apiUrl);
            const downloadLinks = movieDetails.data.result.dl_links || [];

            if (downloadLinks.length === 0) {
              return await reply("No PixelDrain links found.");
            }

            let downloadMessage = `🎥 *${movieDetails.data.result.title}*\n\n`;
            downloadMessage += "*Available PixelDrain Download Links:*\n";
            downloadLinks.forEach((link, index) => {
              downloadMessage += `*${index + 1}.* ${link.quality} - ${link.size}\n🔗 Link: ${link.link}\n\n`;
            });

            const downloadSentMessage = await context.sendMessage(from, { text: downloadMessage }, { quoted: incomingMessage });
            const downloadMessageId = downloadSentMessage.key.id;

            context.ev.on('messages.upsert', async downloadMessageEvent => {
              const downloadIncomingMessage = downloadMessageEvent.messages[0];
              if (!downloadIncomingMessage.message) return;

              const downloadUserMessage = downloadIncomingMessage.message.conversation || downloadIncomingMessage.message.extendedTextMessage?.text;
              const isReplyToDownloadMessage = downloadIncomingMessage.message.extendedTextMessage && downloadIncomingMessage.message.extendedTextMessage.contextInfo.stanzaId === downloadMessageId;

              if (isReplyToDownloadMessage) {
                const downloadIndex = parseInt(downloadUserMessage.trim());
                if (!isNaN(downloadIndex) && downloadIndex > 0 && downloadIndex <= downloadLinks.length) {
                  const selectedLink = downloadLinks[downloadIndex - 1];
                  const fileId = selectedLink.link.split('/').pop();

                  await context.sendMessage(from, {
                    react: { text: '⬇️', key: event.key }
                  });

                  const fileUrl = `https://pixeldrain.com/api/file/${fileId}`;
                  await context.sendMessage(from, {
                    react: { text: '⬆', key: event.key }
                  });

                  await context.sendMessage(from, {
                    document: { url: fileUrl },
                    mimetype: "video/mp4",
                    fileName: `${movieDetails.data.result.title} - ${selectedLink.quality}.mp4`,
                    caption: `${movieDetails.data.result.title}\nQuality: ${selectedLink.quality}\nPowered by SinhalaSub`,
                    contextInfo: {
                      mentionedJid: [],
                      externalAdReply: {
                        title: movieDetails.data.result.title,
                        body: "Download powered by SinhalaSub",
                        mediaType: 1,
                        sourceUrl: selectedMovie.link,
                        thumbnailUrl: movieDetails.data.result.image
                      }
                    }
                  }, { quoted: downloadIncomingMessage });

                  await context.sendMessage(from, {
                    react: { text: '✅', key: event.key }
                  });
                } else {
                  await reply("Invalid selection. Please reply with a valid number.");
                }
              }
            });
          } catch (error) {
            console.error("Error fetching movie details:", error);
            await reply("An error occurred while fetching movie details. Please try again.");
          }
        } else {
          await reply("Invalid selection. Please reply with a valid number.");
        }
      }
    });
  } catch (error) {
    console.error("Error during search:", error);
    await reply("*An error occurred while searching!*");
  }
});

// Command to fetch movie details
cmd({
    pattern: "movie2",
    desc: "Fetch detailed information about a movie.",
    category: "utility",
    react: "🎞️",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const movieName = args.join(' ');
        if (!movieName) {
            return reply("📽️ Please provide the name of the movie.");
        }

        const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.Response === "False") {
            return reply("! Movie not found.");
        }

        const movieInfo = `
*🎬 🧚‍♂️⃝𝙼𝙰𝙻𝙰𝙺𝙰-𝙼𝙳💕⃟* 🎬*

*ᴛɪᴛʟᴇ:* ${data.Title}
*ʏᴇᴀʀ:* ${data.Year}
*ʀᴀᴛᴇᴅ:* ${data.Rated}
*ʀᴇʟᴇᴀꜱᴇᴅ:* ${data.Released}
*ʀᴜɴᴛɪᴍᴇ:* ${data.Runtime}
*ɢᴇɴʀᴇ:* ${data.Genre}
*ᴅɪʀᴇᴄᴛᴏʀ:* ${data.Director}
*ᴡʀɪᴛᴇʀ:* ${data.Writer}
*ᴀᴄᴛᴏʀꜱ:* ${data.Actors}
*ʟᴀɴɢᴜᴀɢᴇ:* ${data.Language}
*ᴄᴏᴜɴᴛʀʏ:* ${data.Country}
*ᴀᴡᴀʀᴅꜱ:* ${data.Awards}
*ɪᴍᴅʙ ʀᴀᴛɪɴɢ:* ${data.imdbRating}

> POWERED BY 🧚‍♂️⃝𝙼𝙰𝙻𝙰𝙺𝙰-𝙼𝙳💕⃟*
`;

        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}\n> CREATED BY MALAKA-MD`
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message}`);
    }
});

cmd({
    pattern: `movie8`,
    react: "📥",
    description: "movie downloader",
    use: ".movie kgf",
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
    if (!q) { return await reply('*Please provide a direct URL!*')}
    try {

const data0 = await fetchJson(`https://vajiraapi-089fa316ec80.herokuapp.com/movie/sinhalasub/search?text=${q}`);   

const data1 = data0.result.data[0].link
console.log(data1)

const data = await fetchJson(`https://vajiraapi-089fa316ec80.herokuapp.com/movie/sinhalasub/movie?url=${data1}`);   	    
const data2 = data.result.data.pixeldrain_dl[2].link
console.log(data2)
    
const cap = `        
Title : ${data.result.data.title}
Date : ${data.result.data.date}
Country : ${data.result.data.country}
`	    
await conn.sendMessage(from, { image: { url: data.result.data.image}, caption: cap } , { quoted: mek })


	    
        const message = {
            document: await getBuffer(data2),
	    caption: `${data.result.data.pixeldrain_dl[2].size}\n*🎬 VAJIRA MD TEAM MOVIEDL 🎬*`,
            mimetype: "video/mp4",
            fileName: `${data.result.data.title}.mp4`,
        };


	    
        await conn.sendMessage(from, message );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});

