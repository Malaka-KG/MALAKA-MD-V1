const config = require("../config");
const {
  cmd,
  commands
} = require('../command');
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson
} = require("../lib/functions");
const {
  sinhalaSub
} = require("mrnima-moviedl");
const axios = require("axios");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
cmd({
  'pattern': "movie",
  'alias': ["movi", 'tests'],
  'use': ".movie <query>",
  'react': '🔎',
  'desc': "Moive downloader",
  'category': "movie",
  'filename': __filename
}, async (_0x2f6067, _0x357f6a, _0x3094eb, {
  from: _0x3cf68a,
  l: _0x5db9ed,
  quoted: _0x246261,
  body: _0x4919d1,
  isCmd: _0x2ca5d2,
  command: _0x637247,
  args: _0x4c2856,
  q: _0x11710e,
  isGroup: _0x1fa0dd,
  sender: _0x22d7f5,
  senderNumber: _0x50afa9,
  botNumber2: _0x151307,
  botNumber: _0x31d87e,
  pushname: _0x4de832,
  isMe: _0x7c3f78,
  isOwner: _0x97f415,
  groupMetadata: _0x32b590,
  groupName: _0x1c59e0,
  participants: _0x5a1c61,
  groupAdmins: _0x34c60a,
  isBotAdmins: _0x472968,
  isAdmins: _0x2d9ccb,
  reply: _0x5c09c6
}) => {
  try {
    let _0x33fd9a = await fetchJson("https://www.dark-yasiya-api.site/movie/sinhalasub/search?text=" + _0x11710e);
    if (_0x33fd9a.result.data.length < 0x1) {
      return await _0x2f6067.sendMessage(_0x3cf68a, {
        'text': "🚩 *I couldn't find anything :(*"
      }, {
        'quoted': _0x357f6a
      });
    }
    var _0x349873 = [];
    _0x33fd9a.result.data.map(_0x157d8a => {
      _0x349873.push({
        'buttonId': ".tsts " + _0x157d8a.link,
        'buttonText': {
          'displayText': '' + _0x157d8a.title
        },
        'type': 0x1
      });
    });
    const _0x5ba7dd = {
      'image': {
        'url': config.LOGO
      },
      'caption': "*🎥 DARK SHUTER MOVIE SEARCH 🎥*",
      'footer': config.FOOTER,
      'buttons': _0x349873,
      'headerType': 0x4
    };
    return await _0x2f6067.buttonMessage(_0x3cf68a, _0x5ba7dd, _0x357f6a);
  } catch (_0x4b3edc) {
    console.log(_0x4b3edc);
    await _0x2f6067.sendMessage(_0x3cf68a, {
      'text': "🚩 *Error !!*"
    }, {
      'quoted': _0x357f6a
    });
  }
});
cmd({
  'pattern': "tsts",
  'alias': ["mdv"],
  'use': ".moviedl <url>",
  'react': '🎥',
  'desc': "download movies from sinhalasub.lk",
  'filename': __filename
}, async (_0x4aba16, _0x391d76, _0x135970, {
  from: _0x131560,
  l: _0x2421d0,
  quoted: _0x53a477,
  body: _0x3de915,
  isCmd: _0x5df6d9,
  command: _0x35fbba,
  args: _0x5997e3,
  q: _0x5c1376,
  isGroup: _0xc67883,
  prefix: _0x1049a3,
  sender: _0x16b6f1,
  senderNumber: _0x13e392,
  botNumber2: _0x1ad01c,
  botNumber: _0x5b0f31,
  pushname: _0x707bcf,
  isMe: _0x4a4057,
  isOwner: _0xdbd76c,
  groupMetadata: _0x56fc51,
  groupName: _0x10afc0,
  participants: _0x2d5677,
  groupAdmins: _0x4a38a7,
  isBotAdmins: _0x3f1ef9,
  isAdmins: _0x465635,
  reply: _0x265002
}) => {
  try {
    if (!_0x5c1376) {
      return _0x265002("🚩 *Please give me a url*");
    }
    let _0x51bde0 = await fetchJson("https://www.dark-yasiya-api.site/movie/sinhalasub/movie?url=" + _0x5c1376);
    if (_0x51bde0.length < 0x1) {
      return await _0x4aba16.sendMessage(_0x131560, {
        'text': "🚩 *I couldn't find anything :(*"
      }, {
        'quoted': _0x391d76
      });
    }
    var _0x5198d1 = [];
    _0x5198d1.push({
      'buttonId': _0x1049a3 + "daqt " + _0x5c1376,
      'buttonText': {
        'displayText': "Details send"
      },
      'type': 0x1
    });
    _0x51bde0.result.data.dl_links.map(_0x270d94 => {
      _0x5198d1.push({
        'buttonId': _0x1049a3 + ("fit " + _0x270d94.link + '±' + _0x51bde0.result.data.title + " - " + _0x270d94.quality + " - " + _0x270d94.size),
        'buttonText': {
          'displayText': _0x270d94.size + " - " + _0x270d94.quality + " - " + _0x270d94.link
        },
        'type': 0x1
      });
    });
    const _0x2457f5 = "   *🎥 DARK SHUTER MOVIE DOWNLODER 🎥*\n \n*☘️ Tιтle   : " + _0x51bde0.result.data.title + "*\n\n*📆 Rᴇʟᴇᴀꜱᴇ ➜* _" + _0x51bde0.result.data.date + "_\n*⭐ Rᴀᴛɪɴɢ ➜* _" + _0x51bde0.result.data.imdbRate + "_\n*⏰ Rᴜɴᴛɪᴍᴇ ➜* _" + _0x51bde0.result.data.runtime + "_\n*🎭 Dɪʀᴇᴄᴛᴏʀ ➜* _" + _0x51bde0.result.data.subtitle_author + "_\n*🌎 Cᴏᴜɴᴛʀʏ ➜* _" + _0x51bde0.result.data.country + "_ \n\n*⛏️ මෙහි pixadrain.com link පමණක් ඇති ඒවා reply කරන්න.*\n\n*🎉 Follow our chanal :* *https://whatsapp.com/channel/0029VamYYhw2kNFiA46kfl3X*\n";
    const _0x16c4cd = {
      'image': {
        'url': _0x51bde0.result.data.images[0x0] || result.data.image
      },
      'caption': _0x2457f5,
      'footer': config.FOOTER,
      'buttons': _0x5198d1,
      'headerType': 0x4
    };
    return await _0x4aba16.buttonMessage(_0x131560, _0x16c4cd, _0x391d76);
  } catch (_0x1958ae) {
    console.log(_0x1958ae);
    await _0x4aba16.sendMessage(_0x131560, {
      'text': "🚩 *Error !!*"
    }, {
      'quoted': _0x391d76
    });
  }
});
cmd({
  'pattern': "mvkdd",
  'react': '🎥',
  'alias': ["online", "test", "bot"],
  'desc': "Check bot online or no.",
  'use': '.alive',
  'filename': __filename
}, async (_0xa2d238, _0x42d868, _0x598284, {
  from: _0x189394,
  prefix: _0x17a9f7,
  q: _0x1dcd57,
  pushname: _0x1dafbe,
  reply: _0x4c3b6d
}) => {
  try {
    if (!_0x1dcd57) {
      return await _0x4c3b6d("please give me text !..");
    }
    const _0x5ddcf6 = _0x1dcd57.split('±')[0x0];
    const _0x542f67 = _0x1dcd57.split('±')[0x1];
    const _0x2abf71 = await fetch(_0x5ddcf6);
    const _0x5a476c = await _0x2abf71.text();
    const _0x251d36 = cheerio.load(_0x5a476c);
    const _0x13f31b = [];
    _0x251d36("#link").each((_0x35f889, _0x3d8d2c) => {
      _0x13f31b.push(_0x251d36(_0x3d8d2c).attr("href"));
    });
    const _0x41b3c3 = [{
      'buttonId': _0x17a9f7 + "fit " + _0x13f31b + '±' + _0x542f67,
      'buttonText': {
        'displayText': "DOWNLOAD"
      },
      'type': 0x1
    }];
    const _0x328b02 = {
      'image': {
        'url': config.LOGO
      },
      'caption': "*DOWNLOAD MOVIE*",
      'footer': config.FOOTER,
      'buttons': _0x41b3c3,
      'headerType': 0x1
    };
    await _0xa2d238.buttonMessage(_0x189394, _0x328b02, _0x42d868);
  } catch (_0x472bb9) {
    console.log(_0x472bb9);
    _0x4c3b6d("*Error !!*");
  }
});
cmd({
  'pattern': 'mn',
  'react': '🎥',
  'alias': ["online", "test", "bot"],
  'desc': "Check bot online or no.",
  'use': ".alive",
  'filename': __filename
}, async (_0xd64a4d, _0x33ec9e, _0x24497e, {
  from: _0x359a86,
  prefix: _0x5d6e27,
  q: _0x8dab60,
  pushname: _0x4ee0a6,
  reply: _0x2c714f
}) => {
  try {
    if (!_0x8dab60) {
      return await _0x2c714f("please give me text !..");
    }
    const _0x2d433f = _0x8dab60.split('±')[0x1];
    const _0x5acc02 = [{
      'buttonId': _0x5d6e27 + "fit " + fhd + '±' + _0x2d433f,
      'buttonText': {
        'displayText': 'DOWNLOAD'
      },
      'type': 0x1
    }];
    const _0x517757 = {
      'image': {
        'url': "https://telegra.ph/file/091fc81528af5881cdf47.jpg"
      },
      'caption': "DOWNLOAD MOVIE\n",
      'footer': config.FOOTER,
      'buttons': _0x5acc02,
      'headerType': 0x1
    };
    await _0xd64a4d.buttonMessage(_0x359a86, _0x517757, _0x33ec9e);
  } catch (_0x5b6e41) {
    console.log(_0x5b6e41);
    _0x2c714f("*Error !!*");
  }
});
cmd({
  'pattern': "fit",
  'react': '📥',
  'dontAddCommandList': true,
  'filename': __filename
}, async (_0xdb3700, _0x31c9bd, _0x587cc4, {
  from: _0x30d850,
  q: _0x19b8d2,
  isMe: _0x70a578,
  reply: _0x1849fd
}) => {
  if (!_0x19b8d2) {
    return await _0x1849fd("*Please provide a direct URL!*");
  }
  try {
    const _0x2b3305 = _0x19b8d2.split('±')[0x0];
    const _0x18dce7 = _0x19b8d2.split('±')[0x1];
    const _0x4b59ba = _0x2b3305.split('https://pixeldrain.com/u/')[0x1];
    const _0x5de478 = "https://pixeldrain.com/api/file/" + _0x4b59ba;
    const _0x238d7c = _0x5de478.trim();
    const _0x540f43 = await axios.get(_0x238d7c, {
      'responseType': "arraybuffer"
    });
    const _0x2b3832 = Buffer.from(_0x540f43.data, "binary");
    const _0x176ac0 = {
      'document': _0x2b3832,
      'caption': _0x18dce7 + "\n     \n *ＤＡＲＫ ＳＨＵＴＥＲ ＭＤ Ｖ2*",
      'mimetype': 'video/mp4',
      'fileName': _0x18dce7 + "🎬DARK SHUTER🎬.mp4"
    };
    await _0xdb3700.sendMessage(config.JID, _0x176ac0);
    await _0xdb3700.sendMessage(_0x30d850, {
      'react': {
        'text': '✔️',
        'key': _0x31c9bd.key
      }
    });
  } catch (_0x1d3aec) {
    console.error("Error fetching or sending", _0x1d3aec);
    await _0xdb3700.sendMessage(_0x30d850, "*Error fetching or sending *", {
      'quoted': _0x31c9bd
    });
  }
});
cmd({
  'pattern': 'fetch',
  'react': '📥',
  'dontAddCommandList': true,
  'filename': __filename
}, async (_0x16cb35, _0x1e4a36, _0x239ea2, {
  from: _0x5bd801,
  q: _0x35e882,
  isMe: _0x3efd9c,
  reply: _0x3877a0
}) => {
  if (!_0x35e882) {
    return await _0x3877a0("*Please provide a direct URL!*");
  }
  try {
    const _0x4da8f1 = _0x35e882.trim();
    const _0x439e0b = await axios.get(_0x4da8f1, {
      'responseType': "arraybuffer"
    });
    const _0x3ea6f3 = Buffer.from(_0x439e0b.data, "binary");
    const _0x2956d1 = {
      'document': _0x3ea6f3,
      'caption': "*ＨＹＰＥＲ ＭＯＶＩＥ ＤＬ🎥*",
      'mimetype': "video/mp4",
      'fileName': "sadas.mp4"
    };
    await _0x16cb35.sendMessage(config.JID, _0x2956d1);
    await _0x16cb35.sendMessage(_0x5bd801, {
      'react': {
        'text': '✔️',
        'key': _0x1e4a36.key
      }
    });
  } catch (_0x58050f) {
    console.error("Error fetching or sending", _0x58050f);
    await _0x16cb35.sendMessage(_0x5bd801, "*Error fetching or sending *", {
      'quoted': _0x1e4a36
    });
  }
});
cmd({
  'pattern': "daqt",
  'alias': ["mdv"],
  'use': ".moviedl <url>",
  'react': '🎥',
  'desc': "download movies from sinhalasub.lk",
  'filename': __filename
}, async (_0x1ec3d4, _0x149da7, _0x2b338d, {
  from: _0x4cbb97,
  l: _0xa4335f,
  quoted: _0x1f893d,
  body: _0x2fb15d,
  isCmd: _0x3203e6,
  command: _0xa8d6d7,
  args: _0x34d184,
  q: _0x39b1e6,
  isGroup: _0x45efdb,
  prefix: _0x217d0a,
  sender: _0xe15995,
  senderNumber: _0x45b0db,
  botNumber2: _0x4a8ff,
  botNumber: _0x411d49,
  pushname: _0x16508c,
  isMe: _0x592abd,
  isOwner: _0x614490,
  groupMetadata: _0x13c1da,
  groupName: _0x36752e,
  participants: _0x1862e9,
  groupAdmins: _0x37c2e0,
  isBotAdmins: _0x5b7fd7,
  isAdmins: _0xf6e15,
  reply: _0x7e4ebb
}) => {
  try {
    if (!_0x39b1e6) {
      return _0x7e4ebb("🚩 *Please give me a url*");
    }
    let _0x2ba8f0 = await fetchJson("https://www.dark-yasiya-api.site/movie/sinhalasub/movie?url=" + _0x39b1e6);
    const _0x1a3006 = "   *🎥 DARK SHUTER MOVIE DOWNLODER 🎥*\n \n*☘️ Tιтle   : " + _0x2ba8f0.result.data.title + "*\n\n*📆 Rᴇʟᴇᴀꜱᴇ ➜* _" + _0x2ba8f0.result.data.date + "_\n*⭐ Rᴀᴛɪɴɢ ➜* _" + _0x2ba8f0.result.data.imdbRate + "_\n*⏰ Rᴜɴᴛɪᴍᴇ ➜* _" + _0x2ba8f0.result.data.runtime + "_\n*🎭 Dɪʀᴇᴄᴛᴏʀ ➜* _" + _0x2ba8f0.result.data.subtitle_author + "_\n*🌎 Cᴏᴜɴᴛʀʏ ➜* _" + _0x2ba8f0.result.data.country + "_ \n\n*🎉 Follow our chanal :* *https://whatsapp.com/channel/0029VamYYhw2kNFiA46kfl3X*\n";
    await _0x1ec3d4.sendMessage(config.JID, {
      'image': {
        'url': _0x2ba8f0.result.data.images[0x0] || result.data.image
      },
      'caption': _0x1a3006
    });
    await _0x1ec3d4.sendMessage(_0x4cbb97, {
      'react': {
        'text': '✔️',
        'key': _0x149da7.key
      }
    });
  } catch (_0x458ddb) {
    console.error("Error fetching or sending", _0x458ddb);
    await _0x1ec3d4.sendMessage(_0x4cbb97, "*Error fetching or sending *", {
      'quoted': _0x149da7
    });
  }
});
cmd({
  'pattern': 'tv',
  'alias': ['t', "tvs"],
  'use': ".movie <query>",
  'react': '🔎',
  'desc': "Download movies",
  'category': "movie",
  'filename': __filename
}, async (_0x837b16, _0x2e405f, _0x5e5078, {
  from: _0x4c60f5,
  l: _0x207010,
  quoted: _0x41eb16,
  body: _0x2eb448,
  isCmd: _0x38b2d0,
  command: _0x57543d,
  args: _0x2a0a18,
  q: _0x202b14,
  isGroup: _0xb59cd5,
  sender: _0xf1c8e4,
  senderNumber: _0x260786,
  botNumber2: _0x299dff,
  botNumber: _0x48da54,
  pushname: _0x44eb6c,
  isMe: _0x4ee80f,
  isOwner: _0x3128a4,
  groupMetadata: _0x51fcb7,
  groupName: _0x4a26d2,
  participants: _0x3ddebc,
  groupAdmins: _0x21020a,
  isBotAdmins: _0x4d738b,
  isAdmins: _0x4eb97e,
  reply: _0x3e8219
}) => {
  try {
    const _0x407ad5 = await sinhalaSub();
    if (!_0x202b14) {
      return _0x3e8219("🚩 *Please give me words to search*");
    }
    var _0x423403 = await _0x407ad5.search(_0x202b14);
    const _0x2a5ebe = _0x423403.result;
    if (_0x2a5ebe.length < 0x1) {
      return await _0x837b16.sendMessage(_0x4c60f5, {
        'text': "🚩 *I couldn't find anything :(*"
      }, {
        'quoted': _0x2e405f
      });
    }
    var _0xa10cb2 = [];
    _0x423403.result.map(_0x55598d => {
      _0xa10cb2.push({
        'buttonId': ".tvb " + _0x55598d.link,
        'buttonText': {
          'displayText': '' + _0x55598d.title
        },
        'type': 0x1
      });
    });
    const _0x2a4b05 = {
      'image': {
        'url': "https://telegra.ph/file/091fc81528af5881cdf47.jpg"
      },
      'caption': "乂 *S I N H A L A S U B - S E A R C H*",
      'footer': config.FOOTER,
      'buttons': _0xa10cb2,
      'headerType': 0x4
    };
    return await _0x837b16.buttonMessage(_0x4c60f5, _0x2a4b05, _0x2e405f);
  } catch (_0x53e7e9) {
    console.log(_0x53e7e9);
    await _0x837b16.sendMessage(_0x4c60f5, {
      'text': "🚩 *Error !!*"
    }, {
      'quoted': _0x2e405f
    });
  }
});
cmd({
  'pattern': "tvb",
  'alias': ["tvshows"],
  'use': ".tv <url>",
  'react': '🎥',
  'desc': "download movies from sinhalasub.lk",
  'filename': __filename
}, async (_0x3179fc, _0x523785, _0x2e1504, {
  from: _0x163d16,
  l: _0x1c17c1,
  quoted: _0x20d838,
  body: _0x2975a8,
  isCmd: _0xbbc187,
  command: _0x24b53f,
  args: _0x4d95b4,
  q: _0x3866f1,
  isGroup: _0x4a4203,
  sender: _0x3eaab3,
  senderNumber: _0x206a9a,
  botNumber2: _0x54f4ba,
  botNumber: _0x5d2a8c,
  pushname: _0x5738cf,
  isMe: _0x284727,
  isOwner: _0x158d81,
  prefix: _0x13a254,
  groupMetadata: _0x5a50f7,
  groupName: _0x419f31,
  participants: _0x2b74e2,
  groupAdmins: _0x57e5d4,
  isBotAdmins: _0x1a0d32,
  isAdmins: _0x2ac291,
  reply: _0x181f31
}) => {
  try {
    if (!_0x3866f1) {
      return _0x181f31("🚩 *Please give me a url*");
    }
    const _0x1c1a3f = await fetch(_0x3866f1);
    const _0x5ef0b6 = await _0x1c1a3f.text();
    const _0x4808ba = cheerio.load(_0x5ef0b6);
    const _0x153471 = [];
    _0x4808ba(".episodiotitle").each((_0x2cbbed, _0x2b8de3) => {
      _0x153471.push({
        'title': _0x4808ba(_0x2b8de3).find('a').text(),
        'link': _0x4808ba(_0x2b8de3).find('a').attr("href")
      });
    });
    console.log(_0x153471);
    if (_0x153471.length < 0x1) {
      return await _0x3179fc.sendMessage(_0x163d16, {
        'text': N_FOUND
      }, {
        'quoted': _0x523785
      });
    }
    var _0x1aa86a = [];
    var _0x1aa86a = [];
    _0x153471.map(_0x78ad73 => {
      _0x1aa86a.push({
        'buttonId': _0x13a254 + "fdl " + _0x78ad73.link,
        'buttonText': {
          'displayText': '' + _0x78ad73.title
        },
        'type': 0x1
      });
    });
    const _0x4762e2 = {
      'image': {
        'url': "https://telegra.ph/file/091fc81528af5881cdf47.jpg"
      },
      'caption': "*🎥 TV SHOWS DOWNLOADER 🎥*",
      'footer': config.FOOTER,
      'buttons': _0x1aa86a,
      'headerType': 0x4
    };
    return await _0x3179fc.buttonMessage(_0x163d16, _0x4762e2, _0x523785);
  } catch (_0x429559) {
    _0x181f31("*ERROR !!*");
    _0x1c17c1(_0x429559);
  }
});
cmd({
  'pattern': "detailss",
  'alias': ["dltestss"],
  'use': ".moviedl <url>",
  'react': '🎥',
  'desc': "download movies from sinhalasub.lk",
  'filename': __filename
}, async (_0x4d024d, _0x553abb, _0x4aa2af, {
  from: _0x2628bb,
  l: _0x518fe0,
  quoted: _0x45bc84,
  body: _0x1844cc,
  isCmd: _0x3030e3,
  command: _0x23d771,
  args: _0x436ded,
  q: _0x3fa475,
  isGroup: _0x2edeb1,
  sender: _0x175c82,
  senderNumber: _0x1b5194,
  botNumber2: _0x310a67,
  botNumber: _0x35d6a2,
  pushname: _0x437b8e,
  isMe: _0x5f4d13,
  isOwner: _0x16814f,
  groupMetadata: _0x32c9b7,
  groupName: _0x3327e5,
  participants: _0x50cc06,
  groupAdmins: _0x5c0d45,
  isBotAdmins: _0x3cbe88,
  isAdmins: _0x4c2c11,
  reply: _0x4a89eb
}) => {
  try {
    if (!_0x3fa475) {
      return _0x4a89eb("🚩 *Please give me a url*");
    }
    const _0x27fa8a = await axios.get(_0x3fa475);
    const _0x3512eb = cheerio.load(_0x27fa8a.data);
    const _0x14210a = _0x3512eb(".sheader").first();
    const _0x50160c = _0x14210a.find(".data .head h1").text();
    const _0x3b06e3 = _0x14210a.find(".extra .date").text().trim();
    const _0x496fc2 = _0x14210a.find(".extra .runtime").text().trim();
    const _0x8f61f1 = _0x3512eb('#info').first();
    const _0x57ec64 = _0x8f61f1.find("#repimdb strong").text().trim();
    const _0x475d4d = "*⦁⦂⦁━┉┉┉┉┉━━┉━━━┉━⦁⦂⦁*\n\n*☘️ Title :* *" + _0x50160c + "*\n\n*🖇️ Link :* *" + _0x3fa475 + "*\n\n*📅 Release :* *" + _0x3b06e3 + "*\n\n*🕰️ Duration :* *" + _0x496fc2 + "*\n\n*🏆 IMDD Rating :* *" + _0x57ec64 + "*\n";
    await _0x4d024d.sendMessage(config.JID, {
      'text': _0x475d4d
    });
    await _0x4d024d.sendMessage(config.JID, {
      'react': {
        'text': '✔️',
        'key': _0x553abb.key
      }
    });
  } catch (_0x1945aa) {
    console.error("Error fetching or sending", _0x1945aa);
    await _0x4d024d.sendMessage(_0x2628bb, "*Error fetching or sending *", {
      'quoted': _0x553abb
    });
  }
});
cmd({
  'pattern': "edit",
  'desc': "edit files",
  'alias': ['ed'],
  'category': 'movie',
  'use': ".edit hi & hi",
  'filename': __filename
}, async (_0x27fa00, _0x3ce93b, _0x1ce6c7, {
  from: _0x15fdde,
  l: _0x1adba6,
  quoted: _0x49074b,
  body: _0x3763ff,
  isCmd: _0x5a4174,
  command: _0x3efc9a,
  args: _0x227129,
  q: _0xcb6ede,
  isGroup: _0x326a9a,
  sender: _0x29711b,
  senderNumber: _0x4185af,
  botNumber2: _0x90831a,
  botNumber: _0x4869a5,
  pushname: _0x3a85a1,
  isMe: _0x35baed,
  isOwner: _0x52f2b6,
  groupMetadata: _0x299a27,
  groupName: _0x48676c,
  participants: _0x9370e1,
  groupAdmins: _0x3cef66,
  isBotAdmins: _0x5dee6b,
  isAdmins: _0x41678f,
  reply: _0x158bc1
}) => {
  if (!_0xcb6ede || !_0x1ce6c7.quoted) {
    _0x158bc1("*give me message ❌*");
  }
  const _0x1d3627 = _0xcb6ede.split('&')[0x0];
  const _0x33d3eb = _0xcb6ede.split('&')[0x1];
  let _0x51b2f6 = {
    key: _0x3ce93b.quoted?.["fakeObj"]?.["key"]
  };
  if (_0x3ce93b.quoted?.["documentWithCaptionMessage"]?.["message"]?.['documentMessage']) {
    let _0x2b3917 = _0x3ce93b.quoted.documentWithCaptionMessage.message.documentMessage.mimetype;
    const _0x4e5520 = require('mime-types');
    let _0x50d8f8 = _0x4e5520.extension(_0x2b3917);
    _0x3ce93b.quoted.documentWithCaptionMessage.message.documentMessage.fileName = _0x33d3eb + '.' + _0x50d8f8;
    _0x3ce93b.quoted.documentWithCaptionMessage.message.documentMessage.caption = _0x1d3627;
  }
  _0x51b2f6.message = _0x3ce93b.quoted;
  return _0x158bc1("*File edited ✅*");
});
