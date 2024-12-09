

const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "alive",
    react: "🌐",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const cap = `
> *ALIVE_KD_PANTA_00*
*╭────────────────╮*
*📌𝗡𝗶𝗰𝗲 𝗧𝗼 𝗠𝗲𝗮𝘁 𝘆𝗼𝘂*
*╰────────────────╯*
⥈⥈⥈*𝚂𝚄𝙿𝙿𝙾𝚃 𝙶𝚁𝙾𝚄𝙿*⥈⥈⥈
*╭────────────────⊶* *https://chat.whatsapp.com/GvR2hfJ42mO9HNwuFJVax6*
*╰────────────────⊶*
*╭────────────────⊶*
*⭕Creator by ᴋᴀᴠɪꜱʜᴋᴀ)*
*⭕ᴋᴅ ᴘᴀɴᴛᴀ ᴀʟɪᴠᴇ*
*╰────────────────⊶*

*╭────────────────⊶*
*🤖: ᴏᴡɴᴇʀ :¢ontact👨‍💻*

*https://wa.me/+94776114551?text=ʜᴇʏ_𝚔𝚊𝚟𝚒𝚜𝚑𝚔𝚊*
*╰────────────────⊶*
*╭────────────────⊶*
> *KD_PANTA_00_MD *
*╰────────────────⊶*`

    
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: cap},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})





cmd({
    pattern: "menu",
    react: "🌐",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const cap = `
*👋Hellow Welcome MD*

*👿☠️_KD_PANTA_00_☠️👿*
*༺⃛⃛⛣༒╼╾╼╾╼╾╼╾╼╾༒⛣༻*

*WHATSAPP LINK :*
*https://chat.whatsapp.com/GvR2hfJ42mO9HNwuFJVax6*

*╭─────────────●●►*
*┋* 
*┋* _✅*ᴅᴏᴡɴʟᴏᴀᴅ ᴄᴏᴍᴍᴀɴᴅs❂*_
*┋* _✅*ᴍᴀɪɴ ᴄᴏᴍᴍᴀɴᴅs❂*_
*┋* _✅*ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅs❂*_
*┋* _✅*ɢʀᴏᴜᴘ ᴄᴏᴍᴍᴀɴᴅs❂*_
*┋* _✅*ᴄᴏɴᴠᴇʀᴛ ᴄᴏᴍᴍᴀɴᴅs❂*_
*┋* 
*╰─────────────●●►*

𝗣𝗥𝗜𝗙𝗜𝗫 [ . ]

*╭─────────────●●►*
*┋* *𝙼𝙴𝙽𝚄*
*┋* *𝙰𝙻𝙸𝚅𝙴*
*╰─────────────●●►*

*📲 𝚁𝚎𝚙𝚘 : https://github.com/KavishkaIroshanb/KD_PANTA_00/tree/main*

╭━❁ ═══ ❃•⇆•❃ ═══ ❁━╮
> *POWER_BY KD_PANTA_00*
╰━❁ ═══ ❃•⇆•❃ ═══ ❁━╯`
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: cap},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})

    



