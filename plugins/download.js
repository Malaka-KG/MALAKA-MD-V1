const{fetchJson}=require('../lib/functions');
const config=require('../config');
const{cmd}=require('../command');
const sensitiveData=require('../lib/scrap');


let baseUrl;(async()=>{try{let baseUrlGet=await fetchJson(sensitiveData.baseUrlPath);baseUrl=baseUrlGet.api}catch(error){console.error('Failed to fetch base URL:',error)}})();const yourName=sensitiveData.nameSignature;cmd({pattern:"fb",alias:["facebook"],desc:"Download FB videos",category:"download",filename:__filename},async(conn,mek,m,{from,q,reply})=>{try{if(!q||!q.startsWith("https://"))return reply(sensitiveData.linkRequestMessage);let data=await fetchJson(`${baseUrl}/api/fdown?url=${q}`);reply("*Downloading... 📥*");if(data.data.hd)await conn.sendMessage(from,{video:{url:data.data.hd},mimetype:"video/mp4",caption:`📺 FB HD VIDEO 🚀✨🎥\n\n ${yourName}`},{quoted:mek});if(data.data.sd)await conn.sendMessage(from,{video:{url:data.data.sd},mimetype:"video/mp4",caption:`📱 FB SD VIDEO 🎬⚡📥\n\n ${yourName}`},{quoted:mek})}catch(e){console.error(e);reply(`Error: ${e.message}`)}});cmd({pattern:"tiktok",alias:["tt"],desc:"Download TikTok videos",category:"download",filename:__filename},async(conn,mek,m,{from,q,reply})=>{try{if(!q||!q.startsWith("https://"))return reply(sensitiveData.linkRequestMessage);let data=await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`);reply("*Downloading... 📥*");if(data.data.no_wm)await conn.sendMessage(from,{video:{url:data.data.no_wm},mimetype:"video/mp4",caption:`🚀 NO-WATERMARK KD_PANTA_00 TIKTOK DOWNLOADER 🎵✨📥\n\n ${yourName}`},{quoted:mek});if(data.data.wm)await conn.sendMessage(from,{video:{url:data.data.wm},mimetype:"video/mp4",caption:`${sensitiveData.watermarkMessage}\n\n ${yourName}`},{quoted:mek});if(data.data.audio)await conn.sendMessage(from,{audio:{url:data.data.audio},mimetype:"audio/mpeg"},{quoted:mek})}catch(e){console.error(e);reply(`Error: ${e.message}`)}});






	
cmd({
    pattern: "img",
    react: '👾',
    desc: 'to down images',
    category: "",
    use: '.im',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
    if (!q) throw `Example: ${prefix + command} Bike`

    let gis = require('g-i-s')
    gis(q, async (error, result) => {
        if (error) {
            console.error('Error fetching images:', error);
		
            return reply('Error fetching images. Please try again later.')
        }

        const topImages = result.slice(0, 5); // Extract top 5 images

        for (let i = 0; i < topImages.length; i++) {
            const imageUrl = topImages[i].url
          let Message = {
              image: { url: imageUrl },caption: `*-------「 KD_PANTA_00 MD GIMAGE SEARCH 」-------*\n🤠 *Query* : ${q}\n\n🔗 *Image ${i + 1} Url* : ${imageUrl}`,
           }

//let senda = await conn.sendMessage(from, { document: {url: imageUrl },fileName: 'image' + '.jpg', mimetype: 'image/jpeg' ,caption: `*-------「 VAJIRA MD GIMAGE SEARCH 」-------*\n🤠 *Query* : ${q}\n\n🔗 *Image ${i + 1} Url* : ${imageUrl}`,}, { quoted: mek })  
		
            conn.sendMessage(from, Message, { quoted: mek })
        }
    })
} catch (e) {
l(e)
}
})
