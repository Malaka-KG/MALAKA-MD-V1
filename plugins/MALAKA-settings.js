const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")


cmd({
    pattern: "settings",
    alias: ["setting"],
    desc: "settings the bot",
    category: "owner",
    react: "⚙",
    filename: __filename


},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        let desc = `
┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃⚙ MALAKA-MD BOT SETTINGS ⚙
┃━━━━━━━━━━━━━━━━━━━━━━━┃
┣━💼 Work Mode : 𝙿𝚄𝙱𝙻𝙸𝙲🌎/𝙿𝚁𝙸𝚅𝙰𝚃𝙴/𝙸𝙽𝙱𝙾𝚇/𝙶𝚁𝙾𝚄𝙿
┣━🔊 Auto Voice : ♻ 𝙾𝙽/𝙾𝙵𝙵
┣━📝 Auto Status : ♻ 𝙾𝙽/𝙾𝙵𝙵
┣━📋 Auto sticker : ♻ 𝙾𝙽/𝙾𝙵𝙵
┣━⌨ Auto reply : ♻ 𝙾𝙽/𝙾𝙵𝙵
┃━━━━━━━━━━━━━━━━━━━━━━━┃
┃🔗 CUSTOMIZE YOUR SETTINGS ⤵
┗━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃     🔧 OPTIONS MENU 🔧
┃━━━━━━━━━━━━━━━━━━━━━━━┃

┣━ WORK MODE ⤵
┃   ┣ 1.1 🔹 Public Work
┃   ┣ 1.2 🔹 Private Work
┃   ┣ 1.3 🔹 Group Only
┃   ┗ 1.4 🔹 Inbox Only

┣━ AUTO VOICE ⤵
┃   ┣ 2.1 🔊 Auto Voice On
┃   ┗ 2.2 🔕 Auto Voice Off

┣━ AUTO STATUS SEEN ⤵
┃   ┣ 3.1 👁‍🗨 Auto Read Status On
┃   ┗ 3.2 👁❌ Auto Read Status Off

┣━ AUTO STICKER ⤵
┃   ┣ 4.1 📰 Auto sticker On
┃   ┗ 4.2 ❌ Auto sticker Off

┣━ AUTO REPLY ⤵
┃   ┣ 5.1 ✍ Auto reply On
┃   ┗ 5.2 ✍❌ Auto reply Off

┣━ AUTO_REACT ⤵
┃   ┣ 6.1 👩‍💻 Auto react On
┃   ┗ 6.2 ❌ Auto react Off

┣━ HEART_REACT ⤵
┃   ┣ 7.1 🍁 Auto react On
┃   ┗ 7.2 ❌ Auto react Off

┣━ OWNER_REACT ⤵
┃   ┣ 8.1 🌸 Auto react On
┃   ┗ 8.2 ❌ Auto react Off
┃
┣━ WELCOME_SET ⤵
┃   ┣ 9.1 🌸 Auto react On
┃   ┗ 9.2 ❌ Auto react Off
┃
┣━ WELCOME_ALERT ⤵
┃   ┣ 10.1 🌸 Auto react On
┃   ┗ 10.2 ❌ Auto react Off
┃
┣━ WELCOME ⤵
┃   ┣ 11.1 🌸 Auto react On
┃   ┗ 11.2 ❌ Auto react Off
┃
┣━ ALLOWS_ONLINE ⤵
┃   ┣ 12.1 🌸 Auto react On
┃   ┗ 12.2 ❌ Auto react Off
┃
┣━ ANTI_LINK ⤵
┃   ┣ 13.1 🌸 Auto react On
┃   ┗ 13.2 ❌ Auto react Off
┃
┣━ ANTI_BAD ⤵
┃   ┣ 14.1 🌸 Auto react On
┃   ┗ 14.2 ❌ Auto react Off
┃
┗━━━━━━━━━━━━━━━━━━━━━━━┛
> *© ᴍᴀʟᴀᴋᴀ-ᴍᴅ *`;

        const vv = await conn.sendMessage(from, { image: { url: "https://i.ibb.co/PwTkwNQ/20241209-212640.jpg"}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.1':
                        reply(".update MODE:public" );
                        reply(".restart");
                        break;
                    case '1.2':               
                        reply(".update MODE:private");
                        reply(".restart");
                        break;
                    case '1.3':               
                          reply(".update MODE:group");
                        reply(".restart");
                      break;
                    case '1.4':     
                        reply(".update MODE:inbox");
                        reply(".restart");
                      break;
                    case '2.1':     
                        reply(".update AUTO_VOICE:true");
                        reply(".restart");
                        break;
                    case '2.2':     
                        reply(".update AUTO_VOICE:false");
                        reply(".restart");
                    break;
                    case '3.1':    
                        reply(".update AUTO_READ_STATUS:true");
                        reply(".restart");
                    break;
                    case '3.2':    
                        reply(".update AUTO_READ_STATUS:false");
                        reply(".restart");
                    break;                    
                    case '4.1':    
                        reply(".update AUTO_STICKER:true");
                        reply(".restart");
                    break;
                    case '4.2':    
                        reply(".update AUTO_STICKER:false");
                        reply(".restart");
                    break;                                        
                    case '5.1':    
                        reply(".update AUTO_REPLY:true");
                        reply(".restart");
                    break;
                    case '5.2':    
                        reply(".update AUTO_REPLY:false");
                        reply(".restart");
                    break;
                    case '6.1':    
                        reply(".update AUTO_REACT:true");
                        reply(".restart");
                    break;
                    case '6.2':    
                        reply(".update AUTO_REACT:false");
                        reply(".restart");
                    break;
                    case '7.1':    
                        reply(".update HEART_REACT:true");
                        reply(".restart");
                    break;
                    case '7.2':    
                        reply(".update HEART_REACT:false");
                        reply(".restart");
                    break;
                    case '8.1':    
                        reply(".update OWNER_REACT:true");
                        reply(".restart");
                    break;
                    case '8.2':    
                        reply(".update OWNER_REACT:false");
                        reply(".restart");
                    break;
                    case '9.1':    
                        reply(".update WELCOME_SET:true");
                        reply(".restart");
                    break;
                    case '9.2':    
                        reply(".update WELCOME_SET:false");
                        reply(".restart");
                    break;
                    case '10.1':    
                        reply(".update WELCOME_ALERT:true");
                        reply(".restart");
                    break;
                    case '10.2':    
                        reply(".update WELCOME_ALERT:false");
                        reply(".restart");
                    break;
                    case '11.1':    
                        reply(".update WELCOME:true");
                        reply(".restart");
                    break;
                    case '11.2':    
                        reply(".update WELCOME:false");
                        reply(".restart");
                    break;
                    case '12.1':    
                        reply(".update ALLOWS_ONLINE:true");
                        reply(".restart");
                    break;
                    case '12.2':    
                        reply(".update ALLOWS_ONLINE:false");
                        reply(".restart");
                    break;
                    case '13.1':    
                        reply(".update ANTI_LINK:true");
                        reply(".restart");
                    break;
                    case '13.2':    
                        reply(".update ANTI_LINK:false");
                        reply(".restart");
                    break;
                    case '14.1':    
                        reply(".update ANTI_BAD:true");
                        reply(".restart");
                    break;
                    case '14.2':    
                        reply(".update ANTI_BAD:false");
                        reply(".restart");
                    break;

            
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
