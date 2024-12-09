const { cmd } = require('../command'); 
const fg = require('api-dylux'); 
const yts = require('yt-search'); 
const { facebook } = require('@mrnima/facebook-downloader');
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const formatViews = views => views >= 1_000_000_000 ? `${(views / 1_000_000_000).toFixed(1)}B` : views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M` : views >= 1_000 ? `${(views / 1_000).toFixed(1)}K` : views.toString(); 



cmd({ 
	pattern: "song", 
	desc: "Download songs", 
	category: "download", 
	filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => { 
	    try { 
		    if (!q) { 
	    await conn.sendPresenceUpdate('recording', from); 
			    await conn.sendMessage(from, { audio: { url: 'https://github.com/themiyadilann/DilaMD-Media/raw/main/voice/song.mp3' }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek }); return; } 
		    const search = await yts(q); 
		    const data = search.videos[0]; 
		    const url = data.url; 
		    let desc = `> *KD_PANTA_00 MD YTDL*\n\n🎶 *𝗧𝗶𝘁𝗹𝗲*: _${data.title}_\n👤 *𝗖𝗵𝗮𝗻𝗻𝗲𝗹*: _${data.author.name}_\n📝 *𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻*: _${data.description}_\n⏳ *𝗧𝗶𝗺𝗲*: _${data.timestamp}_\n⏱️ *𝗔𝗴𝗼*: _${data.ago}_\n👁️‍🗨️ *𝗩𝗶𝗲𝘄𝘀*: _${formatViews(data.views)}_\n🔗 *𝗟𝗶𝗻𝗸*: ${url}`; 
		    await conn.sendPresenceUpdate('typing', from); 
		    await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek }); 
		    let down = await fg.yta(url); 
		    let downloadUrl = down.dl_url; 
		    await conn.sendPresenceUpdate('recording', from); 
		    await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek }); 
		    await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: "> *KD_PANTA_00 MD YTDL*" }, { quoted: mek }); 
	    } catch (e) { 
		    console.log(e); 
		    reply(`Error: ${e.message}`); 
	    } }); 

cmd({ 
     pattern: "video", 
     desc: "Download videos", 
     category: "download", 
     filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => { 
	    try { 
		    if (!q) { 
			    await conn.sendPresenceUpdate('recording', from); 
			    await conn.sendMessage(from, { audio: { url: 'https://github.com/themiyadilann/DilaMD-Media/raw/main/voice/video.mp3' }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek }); 
			    return; 
		    } 
		    const search = await yts(q); 
		    const data = search.videos[0]; 
		    const url = data.url; 
		    let desc = `KD_PANTA_00 MD YTDL\n\n🎶 *𝗧𝗶𝘁𝗹𝗲*: _${data.title}_\n👤 *𝗖𝗵𝗮𝗻𝗻𝗲𝗹*: _${data.author.name}_\n📝 *𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻*: _${data.description}_\n⏳ *𝗧𝗶𝗺𝗲*: _${data.timestamp}_\n⏱️ *𝗔𝗴𝗼*: _${data.ago}_\n👁️‍🗨️ *𝗩𝗶𝗲𝘄𝘀*: _${formatViews(data.views)}_\n🔗 *𝗟𝗶𝗻𝗸*: ${url}`; 
		    await conn.sendPresenceUpdate('typing', from); 
		    await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek }); 
		    let down = await fg.ytv(url); 
		    let downloadUrl = down.dl_url; 
		    await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek }); 
		    await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: `${data.title}.mp4`, caption: "💻 *KD_PANTA_00 MD YTDL*" }, { quoted: mek }); 
	    } catch (e) { 
		    console.log(e); 
		    reply(`Error: ${e.message}`); 
	    } 
    });




cmd({
  pattern: "fb",
  react: '#️⃣',
  alias: ["fbdl","facebook"],
  desc: "",
  category: "download",
  use: '.fb <Fb video link>',
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!q) return await  reply()

 // let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`)
const result = await facebook(q)
const info = `
💢 *KD_PANTA_00-MD FB DOWNLOADER* 💢

*TIME :* ${result.result.duration}
*URL :* ${q}
`	
await conn.sendMessage(from, { image: { url:`${result.result.thumbnail}`}, caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { audio: { url: result.result.links.HD }, mimetype: "audio/mpeg" }, { quoted: mek })	
await conn.sendMessage(from, { video: { url: result.result.links.SD }, mimetype: "video/mp4", caption: `SD QUALITY\n\n> *POWERED by KD_PANTA_00-MD*` }, { quoted: mek })  
await conn.sendMessage(from, { video: { url: result.result.links.HD }, mimetype: "video/mp4", caption: `HD QUALITY\n\n> *POWERED by KD_PANTA_00-MD*` }, { quoted: mek })  	
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})



cmd({
    pattern: "tiktok",
    alias: ["ttdl","tt"],
    react: '🏷️',
    desc: "",
    category: "download",
    use: '.tiktok <Tiktok link>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply()
let data = await downloadTiktok(q);	
let msg = `
    🎟️ *KD_PANTA_00-MD TIKTOK DOWNLOADER* 🎟️

📌 *Please click what you want to select*

*Title* :- ${data.result.title}

*URL:* ${q}`	
await conn.sendMessage( from, { image: { url:`${data.result.image}`}, caption: msg }, { quoted: mek })	
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
await conn.sendMessage(from, { document: { url: q }, mimetype: 'audio/mpeg', fileName: 'TikTok Audio' + '.mp3',caption: "KD_PANTA_00" }, { quoted: mek })
await conn.sendMessage(from, { video: { url: data.result.dl_link.download_mp4_1}, mimetype: "video/mp4", caption: `SD QUALITY\n\n> *POWERED by KD_PANTA_00-MD*` }, { quoted: mek })	
await conn.sendMessage(from, { video: { url: data.result.dl_link.download_mp4_2 }, mimetype: "video/mp4", caption: `HD QUALITY\n\n> *POWERED by KD_PANTA_00-MD*` }, { quoted: mek })  
	
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})

