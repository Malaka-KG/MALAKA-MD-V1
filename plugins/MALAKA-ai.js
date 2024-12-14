const config = require('../config');
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
const axios = require('axios');
cmd({
  'pattern': "movie2",
  'react': '🔎',
  'category': 'movie',
  'desc': "Moive downloader",
  'filename': __filename
}, async (_0x469696, _0x3bec33, _0x57ce89, {
  from: _0x171262,
  q: _0x4cc6e5,
  prefix: _0x740f76,
  isMe: _0x12c9f6,
  reply: _0x519da7
}) => {
  try {
    if (!_0x4cc6e5) {
      return await _0x519da7("*please give me text !..*");
    }
    let _0xd2c78e = await fetchJson('https://rest-api-dark-shan.vercel.app/download/cinesubz-search?q=' + _0x4cc6e5 + "&apikey=annapojira2000@");
    if (_0xd2c78e.length < 0x1) {
      return await _0x469696.sendMessage(_0x171262, {
        'text': "erro !"
      }, {
        'quoted': _0x57ce89
      });
    }
    var _0x462cb8 = [];
    _0xd2c78e.data.map(_0x26f47b => {
      _0x462cb8.push({
        'buttonId': _0x740f76 + ("cinedl " + _0x26f47b.link),
        'buttonText': {
          'displayText': '' + _0x26f47b.title
        },
        'type': 0x1
      });
    });
    const _0x3df5e1 = {
      'image': {
        'url': config.LOGO
      },
      'caption': "*🎥 DARK SHUTER MOVIE SEARCH 🎥*",
      'footer': config.FOOTER,
      'buttons': _0x462cb8,
      'headerType': 0x4
    };
    return await _0x469696.buttonMessage(_0x171262, _0x3df5e1, _0x57ce89);
  } catch (_0x211b97) {
    console.log(_0x211b97);
    await _0x469696.sendMessage(_0x171262, {
      'text': "🚩 *Error !!*"
    }, {
      'quoted': _0x57ce89
    });
  }
});
cmd({
  'pattern': "cinedl",
  'react': '🎥',
  'desc': "moive downloader",
  'filename': __filename
}, async (_0x431c2d, _0xa87dcd, _0x479358, {
  from: _0x48a6ea,
  q: _0x5c557f,
  isMe: _0x22e160,
  prefix: _0x57abc2,
  reply: _0x926e74
}) => {
  try {
    if (!_0x5c557f) {
      return await _0x926e74("*please give me text !..*");
    }
    let _0x54560d = await fetchJson("https://rest-api-dark-shan.vercel.app/download/cinesubz-dl?q=" + _0x5c557f + '&apikey=annapojira2000@');
    let _0x21b214 = await fetchJson("https://rest-api-dark-shan.vercel.app/download/cinesubz-dl-2?q=" + _0x5c557f + '&apikey=annapojira2000@');
    let _0x5bbbfe = '☘️' + _0x54560d.data.title + "\n\n📅 𝚁𝚎𝚕𝚎𝚊𝚜𝚎 : " + _0x54560d.data.date + "\n🌎 𝙲𝚘𝚞𝚗𝚝𝚛𝚢 : " + _0x54560d.data.country + "\n🕰 𝙳𝚞𝚛𝚊𝚝𝚒𝚘𝚗 : " + _0x54560d.data.duration + "\n🏆 IMDB Rating : " + _0x54560d.data.rating + "\n";
    if (_0x21b214.length < 0x1) {
      return await _0x431c2d.sendMessage(_0x48a6ea, {
        'text': "erro !"
      }, {
        'quoted': _0x479358
      });
    }
    var _0x30dd6d = [];
    _0x30dd6d.push({
      'buttonId': _0x57abc2 + "cdetails " + _0x5c557f,
      'buttonText': {
        'displayText': "Details send"
      },
      'type': 0x1
    });
    _0x21b214.data.map(_0x42b89d => {
      _0x30dd6d.push({
        'buttonId': _0x57abc2 + ("cdl " + _0x42b89d.alternativeLinks + '&' + _0x54560d.data.title + " - " + _0x42b89d.quality),
        'buttonText': {
          'displayText': _0x42b89d.size + " - " + _0x42b89d.quality
        },
        'type': 0x1
      });
    });
    const _0x18c69c = {
      'image': {
        'url': _0x54560d.data.image
      },
      'caption': _0x5bbbfe,
      'footer': config.FOOTER,
      'buttons': _0x30dd6d,
      'headerType': 0x4
    };
    return await _0x431c2d.buttonMessage(_0x48a6ea, _0x18c69c, _0x479358);
  } catch (_0x49a7c7) {
    console.log(_0x49a7c7);
    await _0x431c2d.sendMessage(_0x48a6ea, {
      'text': "🚩 *Error !!*"
    }, {
      'quoted': _0x479358
    });
  }
});
cmd({
  'pattern': "cdl",
  'react': '📥',
  'dontAddCommandList': true,
  'filename': __filename
}, async (_0x5689f6, _0x3462b9, _0x4531b2, {
  from: _0x5f418d,
  q: _0x4920ba,
  isMe: _0x543f8,
  reply: _0x5734d5
}) => {
  if (!_0x4920ba) {
    return await _0x5734d5("*Please provide a direct URL!*");
  }
  try {
    const _0x21184a = _0x4920ba.split('&')[0x0];
    const _0x84569b = _0x4920ba.split('&')[0x1];
    let _0x482e28 = await fetchJson("https://rest-api-dark-shan.vercel.app/download/cinesubz-dl-3?q=" + _0x21184a + '&apikey=annapojira2000@');
    const _0x1f5849 = '' + _0x482e28.data.DIRECT_LINK;
    const _0x1e4af1 = _0x1f5849.trim();
    const _0x136934 = await axios.get(_0x1e4af1, {
      'responseType': 'arraybuffer'
    });
    const _0x3b9048 = Buffer.from(_0x136934.data, "binary");
    const _0x234454 = {
      'document': _0x3b9048,
      'caption': "*🎞️ Name :* " + _0x84569b + "\n\n*🎥 Size :* " + _0x482e28.data.FILE.SIZE + "\n\n*ＤＡＲＫ ＳＨＵＴＥＲ ＭＤ Ｖ2*",
      'mimetype': "video/mp4",
      'fileName': _0x84569b + ".mp4"
    };
    await _0x5689f6.sendMessage(config.JID, _0x234454);
    await _0x5689f6.sendMessage(_0x5f418d, {
      'react': {
        'text': '✔️',
        'key': _0x3462b9.key
      }
    });
  } catch (_0x4e30bf) {
    console.error("Error fetching or sending", _0x4e30bf);
    await _0x5689f6.sendMessage(_0x5f418d, "*Error fetching or sending *", {
      'quoted': _0x3462b9
    });
  }
});
cmd({
  'pattern': "cdetails",
  'react': '🎥',
  'desc': "moive downloader",
  'filename': __filename
}, async (_0x2499de, _0x27dca0, _0x5724d4, {
  from: _0x388f67,
  q: _0x49aeef,
  isMe: _0x1829c9,
  reply: _0x2011ba
}) => {
  try {
    if (!_0x49aeef) {
      return await _0x2011ba("*please give me text !..*");
    }
    let _0xbcdd83 = await fetchJson("https://rest-api-dark-shan.vercel.app/download/cinesubz-dl?q=" + _0x49aeef + "&apikey=annapojira2000@");
    let _0x2a0a1c = "*❖ ━━━━━━━━━━━━━━━━ ❖*\n\n*`🎞️ Title ➨`*  *" + _0xbcdd83.data.title + "*\n\n*`📅 Release ➨`* *" + _0xbcdd83.data.date + "*\n\n*`🌐 Country ➨`* *" + _0xbcdd83.data.country + "*\n\n*`⏰ Duration ➨`*  *" + _0xbcdd83.data.duration + "*\n\n*`👑 Rate ➨`* *" + _0xbcdd83.data.rating + "*\n\n*`🗒️Description ➨`*  *" + _0xbcdd83.data.description + "*\n\n*🎉 Follow our chanal :* *https://whatsapp.com/channel/0029VamYYhw2kNFiA46kfl3X*\n";
    await _0x2499de.sendMessage(config.JID, {
      'image': {
        'url': _0xbcdd83.data.image
      },
      'caption': _0x2a0a1c
    });
    await _0x2499de.sendMessage(_0x388f67, {
      'react': {
        'text': '✔️',
        'key': _0x5724d4.key
      }
    });
  } catch (_0x37ded8) {
    console.error("Error fetching or sending", _0x37ded8);
    await _0x2499de.sendMessage(_0x388f67, "*Error fetching or sending *", {
      'quoted': _0x5724d4
    });
  }
});
cmd({
  'pattern': 'forward',
  'react': '',
  'alias': ['f'],
  'desc': "forward msgs",
  'category': "owner",
  'filename': __filename
}, async (_0x56432a, _0x3a7c4e, _0x5b62bc, {
  from: _0x37fac7,
  l: _0x88e0fa,
  prefix: _0x43df0f,
  quoted: _0x1bce7a,
  body: _0x10d386,
  isCmd: _0x2d12e5,
  command: _0x22c2fe,
  args: _0x3cbbe0,
  q: _0x36f920,
  isGroup: _0x3a0ae4,
  sender: _0x3187ec,
  senderNumber: _0x61bf64,
  botNumber2: _0x206c59,
  botNumber: _0x1b73c9,
  pushname: _0x37f16a,
  isIsuru: _0x595e9f,
  isTharu: _0x204a78,
  isOwner: _0x563df5,
  isSupporters: _0x5382a8,
  groupMetadata: _0x5b4efa,
  groupName: _0x583e5e,
  participants: _0xa8db63,
  groupAdmins: _0x1fd0f8,
  isBotAdmins: _0x371710,
  isAdmins: _0xe721dc,
  reply: _0x53c5f6
}) => {
  if (!_0x36f920 || !_0x5b62bc.quoted) {
    return _0x53c5f6("*Please give me a Jid and Quote a Message to continue.*");
  }
  let _0x16e5cd = _0x36f920.split(',').map(_0x1fa4fc => _0x1fa4fc.trim());
  if (_0x16e5cd.length === 0x0) {
    return _0x53c5f6("*Provide at least one Valid Jid. ⁉️*");
  }
  let _0x27524d = {
    'key': _0x3a7c4e.quoted?.['fakeObj']?.['key']
  };
  if (_0x3a7c4e.quoted.documentWithCaptionMessage?.["message"]?.["documentMessage"]) {
    let _0x4c31e8 = _0x3a7c4e.quoted.documentWithCaptionMessage.message.documentMessage;
    const _0x4950ca = require('mime-types');
    let _0x2b01a4 = _0x4950ca.extension(_0x4c31e8.mimetype) || "file";
    _0x4c31e8.fileName = _0x4c31e8.fileName || "file." + _0x2b01a4;
  }
  _0x27524d.message = _0x3a7c4e.quoted;
  let _0x144916 = [];
  for (let _0x24e03b of _0x16e5cd) {
    try {
      await _0x56432a.forwardMessage(_0x24e03b, _0x27524d, false);
      _0x144916.push(_0x24e03b);
    } catch (_0x389104) {
      console.log(e);
    }
  }
  if (_0x144916.length > 0x0) {
    return _0x53c5f6("*Message Forwarded*\n\n" + _0x144916.join("\n"));
  } else {
    console.log(e);
  }
});
cmd({
  'pattern': "forward2",
  'desc': "forward msgs",
  'alias': ['fo'],
  'category': 'owner',
  'use': ".forward2 < Jid address 1, Jid address 2, ...>",
  'filename': __filename
}, async (_0x36cd61, _0x4287c1, _0x1afeab, {
  from: _0x54548c,
  l: _0x2d3b5d,
  quoted: _0x5d6834,
  body: _0x454e11,
  isCmd: _0x309997,
  command: _0x39fb72,
  args: _0x1801c2,
  q: _0x1c4f34,
  isGroup: _0x3a3b08,
  sender: _0x3efacd,
  senderNumber: _0x55107f,
  botNumber2: _0x1d4680,
  botNumber: _0x4ce0b2,
  pushname: _0x50d6bd,
  isMe: _0x318f55,
  isOwner: _0x91a562,
  groupMetadata: _0x2b2fcb,
  groupName: _0x57a87f,
  participants: _0x781529,
  groupAdmins: _0x414d5d,
  isBotAdmins: _0x38eb8f,
  isAdmins: _0x41c537,
  reply: _0x5e004a
}) => {
  if (!_0x91a562) {
    return _0x5e004a("*Owner Only ❌*");
  }
  if (!_0x1c4f34 || !_0x1afeab.quoted) {
    return _0x5e004a("*Provide the message and JID(s) ❌*");
  }
  let _0x353336 = _0x1c4f34.split(',').map(_0x37ce2f => _0x37ce2f.trim());
  if (_0x353336.length === 0x0) {
    return _0x5e004a("*Provide at least one valid JID ❌*");
  }
  let _0x578ead = {
    key: _0x4287c1.quoted?.['fakeObj']?.['key']
  };
  if (_0x4287c1.quoted?.["documentWithCaptionMessage"]?.["message"]?.["documentMessage"]) {
    let _0x4b6712 = _0x4287c1.quoted.documentWithCaptionMessage.message.documentMessage.mimetype;
    const _0x51f327 = require("mime-types");
    let _0x5e4017 = _0x51f327.extension(_0x4b6712);
    _0x4287c1.quoted.documentWithCaptionMessage.message.documentMessage.fileName = _0x4287c1.quoted.documentWithCaptionMessage.message.documentMessage.caption + '.' + _0x5e4017;
  }
  _0x578ead.message = _0x4287c1.quoted;
  let _0x70cc60 = [];
  for (let _0x4ecc71 of _0x353336) {
    try {
      await _0x36cd61.forwardMessage(_0x4ecc71, _0x578ead, false);
      _0x70cc60.push(_0x4ecc71);
    } catch (_0x2c358b) {
      console.log("Failed to forward to " + _0x4ecc71 + ':', _0x2c358b);
    }
  }
  return _0x70cc60.length > 0x0 ? _0x5e004a("*Message successfully forwarded to:*\n\n" + _0x70cc60.join("\n")) : _0x5e004a("*Failed to forward to all provided JIDs ❌*");
});
