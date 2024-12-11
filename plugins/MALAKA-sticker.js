//Created by malaka DARK_ALFHA_MD 🧑🏻‍💻

const axios = require('axios')
const {cmd , commands} = require('../command')
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter')
const googleTTS = require('google-tts-api')
const { getRandom } = require('../lib/functions')

var imgmsg = 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ 👩‍💻!'
var descg = 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ.'
//__________________________sticker____________________
cmd({
    pattern: 'sticker',
    react: '🤹‍♀️',
    alias: ['s', 'stic'],
    desc: descg,
    category: 'convert',
    use: '.sticker <Reply to image>',
    filename: __filename
}, async (conn, mek, m, { from, reply, isCmd, command, args, q, isGroup, pushname }) => {
    try {
        const isQuotedImage = m.quoted && (m.quoted.type === 'imageMessage' || (m.quoted.type === 'viewOnceMessage' && m.quoted.msg.type === 'imageMessage'))
        const isQuotedSticker = m.quoted && m.quoted.type === 'stickerMessage'

        if ((m.type === 'imageMessage') || isQuotedImage) {
            const nameJpg = getRandom('.jpg')
            const imageBuffer = isQuotedImage ? await m.quoted.download() : await m.download()
            await require('fs').promises.writeFile(nameJpg, imageBuffer)

            let sticker = new Sticker(nameJpg, {
                pack: pushname, // The pack name
                author: 'Sadeesha Coder', // The author name
                type: q.includes('--crop') || q.includes('-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                categories: ['🤩', '🎉'], // The sticker category
                id: '12345', // The sticker id
                quality: 75, // The quality of the output file
                background: 'transparent', // The sticker background color (only for full stickers)
            });

            const buffer = await sticker.toBuffer()
            return conn.sendMessage(from, { sticker: buffer }, { quoted: mek })
        } else if (isQuotedSticker) {
            const nameWebp = getRandom('.webp')
            const stickerBuffer = await m.quoted.download()
            await require('fs').promises.writeFile(nameWebp, stickerBuffer)

            let sticker = new Sticker(nameWebp, {
                pack: pushname, // The pack name
                author: 'Sadeesha Coder', // The author name
                type: q.includes('--crop') || q.includes('-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                categories: ['🤩', '🎉'], // The sticker category
                id: '12345', // The sticker id
                quality: 75, // The quality of the output file
                background: 'transparent', // The sticker background color (only for full stickers)
            });

            const buffer = await sticker.toBuffer();
            return conn.sendMessage(from, { sticker: buffer }, { quoted: mek })
        } else {
            return await reply(imgmsg)
        }
    } catch (e) {
        reply('Error !!')
        console.error(e)
    }
})

//____________________________TTS___________________________
cmd({
    pattern: "tts",
    desc: "download songs",
    category: "download",
    react: "👧",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Need some text.")
    const url = googleTTS.getAudioUrl(q, {
  lang: 'hi-IN',
  slow: false,
  host: 'https://translate.google.com',
})
await conn.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek })
    }catch(a){
reply(`${a}`)
}
})

cmd({
  pattern: "trt",
  desc: "Translate text between languages",
  react: '🌐',
  use: ".trt <language code> <text>",
  category: "convert",
  filename: __filename
}, async (client, message, chat, {
  from,
  q,
  reply
}) => {
  try {
    // Split the input text into language code and the text to be translated
    const input = q.split(" ");
    
    if (input.length < 2) {
      return reply("❗ Please provide a language code and text. Usage: .translate [language code] [text]");
    }

    const languageCode = input[0]; // The first part is the language code
    const textToTranslate = input.slice(1).join(" "); // The rest is the text to be translated
    
    // Construct the translation API URL
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${languageCode}`;
    
    // Get the translation response from the API
    const response = await axios.get(apiUrl);
    const translatedText = response.data.responseData.translatedText;
    
    // Format the translation result
    const translationInfo = `
🌍 *Translation* 🌍

🔤 *Original*: ${textToTranslate}
🔠 *Translated*: ${translatedText}
🌐 *Language*: ${languageCode.toUpperCase()}

`;

    return reply(translationInfo);
  } catch (error) {
    console.log(error);
    return reply("⚠️ An error occurred while translating the text. Please try again later.");
  }
});

cmd({
    pattern: "boom",
    desc: "Send a custom message any number of times (owner only).",
    category: "main",
    react: "💣",
    filename: __filename
},
async (conn, mek, m, { from, args, senderNumber, isOwner, reply }) => {
    try {
        if (!isOwner) {
            return reply('❌ This command is restricted to the owner only.');
        }
        const count = parseInt(args[0]) || 10;
        const customText = args.slice(1).join(' ') || 'Boom!';

        for (let i = 0; i < count; i++) {
            await conn.sendMessage(from, { text: customText });
        }
        reply(`✅ Sent ${count} messages.`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

