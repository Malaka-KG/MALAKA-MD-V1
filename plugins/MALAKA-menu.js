const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')


cmd({
  pattern: "menu",
  desc: "Commands panel",
  react: '📜',
  filename: __filename
}, async (bot, message, args, options) => {
  const { from, quoted, reply } = options;

  try {
    // Menu Text
    const menuText = `
╭═════════════════⚆
│ *Creator* : ᴍᴀʟᴀᴋᴀ-ᴍᴅ
│ *Version* : v0.1
│ *Uptime*  : ${runtime(process.uptime())}
│ *RAM Usage* : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
│ *Host Name* : ${require('os').hostname()}
╰═════════════════⚆
│🪀 *LIST MENU*
│   ───────
│ _1_ *❂ᴅᴏᴡɴʟᴏᴀᴅ menu❂*
│ _2_ *❂ᴏᴡɴᴇʀ menu❂*
│ _3_ *❂ɢʀᴏᴜᴘ ᴍᴇɴᴜ❂*
│ _4_ *❂ᴄᴏɴᴠᴇʀᴛ menu❂*
│ _5_ *❂ᴀɪ ᴍᴇɴᴜ❂*
│ _6_ *❂ᴍᴏᴠɪᴇ menu❂*
│ _7_ *❂ꜰᴜɴ menu❂*
│ _8_ *❂ʙᴜɢ menu❂*
╰═════════════════⚆
*🌸 Reply the Number you want to select*

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ 👩‍💻`;

    // Send Menu Message
    const sentMenuMessage = await bot.sendMessage(from, {
      image: { url: "https://i.ibb.co/PwTkwNQ/20241209-212640.jpg" },
      caption: menuText
    }, { quoted: message });

    const menuMessageId = sentMenuMessage.key.id;

    // Define responses for each option
    const menuResponses = {
'1': { imageCaption:
`╭═════════════════⚆
> ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ 👩‍💻
╰═════════════════⚆
╭═════════════════⚆
*🎶 .ꜱᴏɴɢ*
> (ʏᴏᴜᴛᴜʙᴇ ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅ)

*➁ .ꜱᴏɴɢ2*
> (ʏᴏᴜᴛᴜʙᴇ ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅ)

*🎶 .ʏᴛᴍᴘ3*
> (ʏᴏᴜᴛᴜʙᴇ ʏᴛᴍᴘ3 ᴅᴏᴡɴʟᴏᴀᴅ)

*📽️ .ᴠɪᴅᴇᴏ*
> ( ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ)

*➁ .ᴠɪᴅᴇᴏ2*
> ( ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ)

*📽️ .ʏᴛᴍᴘ4*
> ( ʏᴏᴜᴛᴜʙᴇ ʏᴛᴍᴘ4 ᴅᴏᴡɴʟᴏᴀᴅ)

*💸 .ꜰʙ*
> (ꜰʙ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ)

*➁ .ꜰʙ2*
> (ꜰʙ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ)

*💳 .ᴛɪᴋᴛᴏᴋ*
> (ᴛɪᴋᴛᴏᴋ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ)

*➁ .ᴛɪᴋᴛᴏᴋ2*
> (ᴛɪᴋᴛᴏᴋ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ)

*🕯️ .ɪɢ*
> (ɪɴᴛᴀɢʀᴀᴍ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ)

*📚 .ɢᴅʀɪᴠᴇ*
> (ɢᴏᴏɢᴇʟ ꜰɪʟᴇ ᴅᴏᴡʟᴏᴀᴅ)

*👾 .ᴀᴘᴋ*
> (ᴀᴘᴘ ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅ)

*🏷️ .ᴍꜰɪʀᴇ*
> (ᴍɪᴅɪᴀꜰɪʟᴇ ꜰɪʟᴇ ᴅᴏᴡɴʟᴏᴀᴅ)

*🔞 .xᴠɪᴅᴇᴏ*
> (ꜱᴇx ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ)

*🔞 .ᴘᴜꜱꜱʏʙᴅʟ*
> (ꜱᴇx ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ)
╰═════════════════○

> > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ 🌸` },

      '2': { imageCaption: 
`╭═════════════════⚆
> ᴏᴡɴᴇʀ ᴍᴇɴᴜ 👨‍💻
╰═════════════════⚆
╭═════════════════⚆
*⚙️ .ꜱᴇᴛᴛɪɴɢꜱ*
> (ʙᴏᴛ ꜱᴇᴛᴛɪɴɢꜱ ᴄʜᴀɴɢʀ)

*💥 .ʙᴏᴏᴍ*
> (ʙᴏᴏᴍ ᴍꜱɢ ꜱᴇɴᴅ)

*🧬 .ʀᴇꜱᴛᴀʀᴛᴇ*
> (ʙᴏᴛ ʀᴇꜱᴛᴀʀᴛᴇ)

*🔒 .ʙʟᴏᴄʟ*
> (ʙʟᴏᴄᴋ ᴄʜᴀᴛ)

*🔓 .ᴜɴʙʟᴏᴄᴋ*
> (ᴜɴʙʟᴏᴄᴋ ᴄʜᴀᴛ)

*🪠 .ᴄʟᴇᴀʀᴄʜᴀᴛꜱ*
> (ᴄʜᴀᴛ ᴄʟᴇᴀʀ)

*🫧 .ᴊɪᴅ*
> (ᴄʜᴀᴛ ᴊɪᴅ)

*🪬 .ɢᴊɪᴅ*
> (ɢʀᴏᴜᴘ ᴊɪᴅꜱ)

*🪪 .ꜰᴜʟᴘᴘ*
> (ꜱᴇᴛ ᴘʀᴏꜰɪʟᴇ ᴘʜᴏᴛᴏ)

*🕯️ .ʟᴇᴀᴠᴇ*
> (ɢʀᴏᴜᴘ ʟᴇᴀᴠᴇ)

*👩‍💻 .ᴏᴡɴᴇʀ*
> (ɢʀᴏᴜᴘ ᴏᴡɴᴇʀ)

╰═════════════════⚆

> > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ 🌸` },

      '3': { imageCaption: 
`╭═════════════════⚆
> ɢʀᴏᴜᴘ ᴍᴇɴᴜ 👥
╰═════════════════⚆
╭═════════════════⚆
*👤 .ᴀᴅᴅ*
> (ɢʀᴏᴜᴘ ᴍᴀᴍᴍʙᴜꜱ ᴀᴅᴅ)

*🚪 .ɪɴᴠɪᴛᴇ*
> (ɪɴᴠɪᴛᴇ ᴛᴏ ɢʀᴏᴜᴘ)

*🔫 .ᴋɪᴄᴋ*
> (ɢʀᴏᴜᴘ ᴍᴀᴍʙᴜꜱᴇ ᴋɪᴄᴋ)

*🎲 .ᴀᴘᴘʀᴏᴠᴇ*
> (ɢʀᴏᴜᴘ ᴍᴀᴍʙᴜꜱᴇ ᴀᴘᴘʀᴏᴠᴇ)

*❌ .ʀᴇᴊᴇᴄᴛ*
> (ɢʀᴏᴜᴘ ᴀᴘᴘʀᴏᴠᴇ ʀᴇᴊᴇᴄᴛ)

*🏆 .ᴘʀᴏᴍᴏᴛᴇ*
> (ɢʀᴏᴜᴘ ᴀᴅᴍɪɴ ꜱᴇᴛ)

*🎭 .ᴅᴇᴍᴏᴛᴇ*
> (ɢʀᴏᴜᴘ ᴀᴅᴍɪɴ ʀᴇᴍᴏᴠᴇ)

*🔕 .ᴍᴜᴛᴇ*
> (ɢʀᴏᴜᴘ ᴀᴅᴍɪɴ ᴏɴʟɪ ꜱᴇᴛ)

*🔊 .ᴅᴇʟ*
> (ɢʀᴏᴜᴘ ᴍꜱɢ ᴅᴇʟ)

*🔊 .ᴜɴᴍᴜᴛᴇ*
> (ɢʀᴏᴜᴘ ᴄʜᴀᴛ ᴏᴘᴇɴ)

*👑 .ᴛᴀɢᴀᴅᴍɪɴ*
> (ɢʀᴏᴜᴘ ᴀᴅᴍɪɴ ᴛᴀɢ.)

*🏷️ .ᴛᴀɢᴀʟʟ*
> (ɢʀᴏᴜᴘ ᴀʟʟ ᴛᴀɢ.)

*👁️ .ʀᴇQᴜᴇꜱᴛꜱ*
> (ɢʀᴏᴜᴘ ʀᴇQᴜᴇꜱᴛꜱ.)

*⚰️ .ᴇɴᴅ*
> (ɢʀᴏᴜᴘ ᴇɴᴅ.)

*🔓 .ᴏᴘᴇɴᴛɪᴍᴇ*
> (ɢʀᴏᴜᴘ ᴏᴘᴇɴᴛɪᴍᴇ.)

*🔇 .ᴄʟᴏꜱᴇᴛɪᴍᴇ*
> (ɢʀᴏᴜᴘ ᴄʟᴏꜱᴇᴛɪᴍᴇ.)

*👥 .ᴛᴀɢᴀᴅᴍɪɴ*
> (ɢʀᴏᴜᴘ ᴛᴀɢᴀᴅᴍɪɴ.)

╰═════════════════⚆

> > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ 💮` },

      '4': { imageCaption: 
`╭═════════════════⚆
> ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ 🌀
╰═════════════════⚆
╭═════════════════⚆
*🚀 .ꜱᴛɪᴄᴋᴇʀ*
> (ɪᴍɢ ᴛᴏ ᴄᴏɴᴠᴇʀᴛ ꜱᴛɪᴄᴋᴇʀ)

*🌐 .ᴛʀᴛ*
> (ʟᴀɴɢᴜᴀɢᴇ ᴛʀᴀɴꜱʟᴀᴛᴇʀ)
╰═════════════════⚆

> > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ 🌸` },

      '5': { imageCaption: 
`╭═════════════════⚆
> ᴀɪ ᴍᴇɴᴜ 🌀
╰═════════════════⚆
╭═════════════════⚆
*👩‍💻 .ᴀɪ*
> (ᴀɪ ᴍᴇɴᴜ)

╰═════════════════⚆

> > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ 🌸` },

      '6': { imageCaption: 
`╭═════════════════⚆
> ᴍᴏᴠɪᴇ >ꜱɪɴʜᴀʟᴀꜱᴜʙ 🎬
╰═════════════════⚆
╭═════════════════⚆
*🎬 .ꜱɪɴʜᴀʟᴀꜱᴜʙ >ᴍᴏᴠɪᴇ ᴍᴇɴᴜ*
> (ꜱɪɴʜᴀʟᴀꜱᴜʙ ᴍᴏᴠɪᴇ)

*📽️ .ɢɪɴɪꜱɪꜱɪʟᴀ >ᴄᴀʀᴛᴏᴏɴ ᴍᴇɴᴜ*
> (ɢɪɴɪꜱɪꜱɪʟᴀ ᴍᴏᴠɪᴇ)

*🔎 .ᴍᴏᴠɪᴇ2 >ꜱᴇᴀʀᴄʜ ᴍᴇɴᴜ*
> (ᴍᴏᴠɪᴇ2 ꜱᴇᴀʀᴄʜ)


╰═════════════════⚆

> > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ 🌸` },

      '7': { imageCaption: 
"Tools Menu 🌀" },

      '8': { imageCaption: 
"Extras Menu 🧬" },
    };

    // Listen for replies to the menu message
    bot.ev.on("messages.upsert", async event => {
      const newMessage = event.messages[0];
      if (!newMessage.message) return;

      const userReply = newMessage.message.conversation || newMessage.message.extendedTextMessage?.text;
      const isReplyToMenu = newMessage.message.extendedTextMessage?.contextInfo?.stanzaId === menuMessageId;

      if (isReplyToMenu) {
        const response = menuResponses[userReply];
        if (response) {
          // Send image response
          await bot.sendMessage(from, {
            image: { url: "https://i.ibb.co/PwTkwNQ/20241209-212640.jpg" },
            caption: response.imageCaption
          }, { quoted: newMessage });
        } else {
          // Handle invalid input
          await bot.sendMessage(from, {
            text: "Invalid option! Please reply with a valid number."
          }, { quoted: newMessage });
        }
      }
    });
  } catch (error) {
    console.error(error);
    reply(`Error: ${error.message}`);
  }
});            


cmd({
    pattern: "system",
    alias: ["status","botinfo"],
    desc: "Check up time , ram usage and more",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `
───────────────────
_*⚙️ 🧚‍♂️⃝𝙼𝙰𝙻𝙰𝙺𝙰-𝙼𝙳 𝚅1💕⃟* ⚙️*_
───────────────────

┌────────────────
│❖ *Uptime:*  ${runtime(process.uptime())}
│❖ *Ram usage:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
│❖ *HostName:* ${os.hostname()}
│❖ *Owner:* 𝙼𝙰𝙻𝙰𝙺𝙰-𝙼𝙳
└────────────────

> 𝙼𝙰𝙻𝙰𝙺𝙰-𝙼𝙳 𝚅1  
`
return reply(`${status}`)

}catch(e){
console.log(e)
reply(`${e}`)

}
})

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "main",
    react: "👋",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let des = `*👋 Hello ${pushname} I'm alive now*
*😉🇱🇰 I'm 𝗜 MALAKA-MD Whatsapp Bot* ✓

> *Version:* 8.0.0
> *Ram usage:* 43.46MB / 15981MB
> *Runtime:* 3 hours, 7 minutes, 35 seconds
> *HostName:* fv-az984-882

*🪀 MALAKA-MD WHATSAPP BOT

`

return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: des},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd(
  {
    pattern: "restart",
    desc: "Restart the bot",
    category: "owner",
    react: "💢",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
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
      reply,
    }
  ) => {
    try {
      const { exec } = require("child_process");
      reply("Restarting...");
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Sleep function
      exec("pm2 restart all", (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          reply(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          reply(`Stderr: ${stderr}`);
          return;
        }
        console.log(`Stdout: ${stdout}`);
        reply("Bot restarted successfully.");
      });
    } catch (e) {
      console.error(e);
      reply(`An error occurred: ${e.message}`);
    }
  }
);


cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "❤️‍🩹",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '𝗣𝗶𝗻𝗴𝗶𝗻𝗴...' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `⏰ 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝗧𝗶𝗺𝗲 : ${ping}ms` }, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
