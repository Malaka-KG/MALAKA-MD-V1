const config = require('../config')
const {cmd , commands} = require('../lib/command')
const { fetchJson } = require('../lib/functions')

const config = {
  pattern: "bard",
  alias: ["bardai", "gbard", "googlebard", "googleai", "ai"],
  react: '👾',
  desc: desct,
  category: "search",
  use: ".bard ha",
  filename: __filename
};

cmd(config, async (context, args, utils, {
  from,
  l,
  prefix,
  quoted,
  body,
  isCmd,
  command,
  args: cmdArgs,
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
      return reply(needus);
    }
    
    let apiData = await fetchJson("https://gist.githubusercontent.com/vihangayt0/7dbb65f6adfe21538f7febd13982569a/raw/apilis.json");
    let users = apiData.users;
    let randomUser = users[Math.floor(Math.random() * users.length)];
    
    const response = await fetchJson(`${apiData.xz}api/bard?text=${q}&apikey=${randomUser}`);
    return await reply(response.content);
  } catch (error) {
    try {
      const fallbackResponse = await fetchJson(`https://api.akuari.my.id/ai/gbard?chat=${q}`);
      return await reply(fallbackResponse.respon);
    } catch (fallbackError) {
      reply(cantf);
      l(fallbackError);
    }
  }
});
