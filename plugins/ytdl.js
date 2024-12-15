(function (_0x4e5274, _0x1cb94e) {
  const _0x5bc8fb = _0x4e5274();
  while (true) {
    try {
      const _0x4b0623 = -parseInt(_0x1a54(768, 0x235)) / 1 + -parseInt(_0x1a54(489, 0x34a)) / 2 + parseInt(_0x1a54(1507, 0x60e)) / 3 + parseInt(_0x1a54(918, 0x25f)) / 4 * (-parseInt(_0x1a54(1495, 0x719)) / 5) + parseInt(_0x1a54(747, 0x164)) / 6 * (parseInt(_0x1a54(954, 0x209)) / 7) + parseInt(_0x1a54(563, 0x506)) / 8 * (-parseInt(_0x1a54(1662, 0x94e)) / 9) + parseInt(_0x1a54(873, 0x392)) / 10 * (parseInt(_0x1a54(1078, 0x451)) / 11);
      if (_0x4b0623 === _0x1cb94e) {
        break;
      } else {
        _0x5bc8fb.push(_0x5bc8fb.shift());
      }
    } catch (_0x164c25) {
      _0x5bc8fb.push(_0x5bc8fb.shift());
    }
  }
})(_0x5664, 661433);
const config = require("../config");
const l = console.log;
const {
  cmd,
  commands
} = require("../command");
const {
  ytmp3,
  ytmp4
} = require("../lib/ytdl");
const dl = require("@bochilteam/scraper");
const yts = require("yt-search");
const fg = require("api-dylux");
var request = require("request");
var cheerio = require("cheerio");
let soundcloud = async _0x32c876 => {
  return new Promise((_0xf3281f, _0x327648) => {
    const _0x34233d = {
      method: "POST",
      url: "https://www.klickaud.co/download.php",
      headers: {},
      formData: {}
    };
    _0x34233d.headers["content-type"] = "application/x-www-form-urlencoded";
    _0x34233d.formData.value = _0x32c876;
    _0x34233d.formData["2311a6d881b099dc3820600739d52e64a1e6dcfe55097b5c7c649088c4e50c37"] = "710c08f2ba36bd969d1cbc68f59797421fcf90ca7cd398f78d67dfd8c3e554e3";
    request(_0x34233d, async function (_0x44f14b, _0x2527ee, _0x5a415b) {
      if (_0x44f14b) {
        throw new Error(_0x44f14b);
      }
      const _0x2825be = cheerio.load(_0x5a415b);
      _0xf3281f({
        'judul': _0x2825be("#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)").text(),
        'download_count': _0x2825be("#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(3)").text(),
        'thumb': _0x2825be("#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(1) > img").attr("src"),
        'link': _0x2825be("#dlMP3").attr("onclick").split("downloadFile('")[1].split("',")[0]
      });
    });
  });
};
let axios = require("axios");
async function ssearch(_0x2299f2) {
  let _0x428434 = await axios.get("https://m.soundcloud.com/search?q=" + encodeURIComponent(_0x2299f2), {
    'headers': {
      'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
    }
  });
  let _0x11e308 = cheerio.load(_0x428434.data);
  let _0x4f1aae = [];
  _0x11e308("div > ul > li > div").each(function (_0x2738b1, _0x4b4400) {
    let _0xf97949 = _0x11e308(_0x4b4400).find('a').attr("aria-label");
    let _0x1ea991 = "https://m.soundcloud.com" + _0x11e308(_0x4b4400).find('a').attr("href");
    let _0x40551f = _0x11e308(_0x4b4400).find("a > div > div > div > picture > img").attr("src");
    let _0x1a82b1 = _0x11e308(_0x4b4400).find("a > div > div > div").eq(1).text();
    let _0x13fd63 = _0x11e308(_0x4b4400).find("a > div > div > div > div > div").eq(0).text();
    let _0x4a781c = _0x11e308(_0x4b4400).find("a > div > div > div > div > div").eq(1).text();
    let _0x312441 = _0x11e308(_0x4b4400).find("a > div > div > div > div > div").eq(2).text();
    const _0x1ddb11 = {
      title: _0xf97949,
      url: _0x1ea991,
      thumb: _0x40551f,
      artist: _0x1a82b1,
      views: _0x13fd63,
      release: _0x312441,
      timestamp: _0x4a781c
    };
    _0x4f1aae.push(_0x1ddb11);
  });
  return {
    'status': _0x428434.status,
    'creator': "Caliph",
    'result': _0x4f1aae
  };
}
function ytreg(_0x26b983) {
  const _0x1011e8 = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;
  return _0x1011e8.test(_0x26b983);
}
function extractYouTubeId(_0x131507) {
  const _0x3d594b = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const _0x1afbd2 = _0x131507.match(_0x3d594b);
  return _0x1afbd2 ? _0x1afbd2[1] : null;
}
function convertYouTubeLink(_0x10c517) {
  const _0x68ca2d = extractYouTubeId(_0x10c517);
  if (_0x68ca2d) {
    return "https://www.youtube.com/watch?v=" + _0x68ca2d;
  }
  return _0x10c517;
}
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
  getsize,
  jsonformat
} = require("../lib/functions");
var descv = '';
if (config.LANG === 'SI') {
  descv = "Youtube වෙතින් videos බාගත කරයි.";
} else {
  descv = "Download videos from Youtube.";
}
var descs = '';
if (config.LANG === 'SI') {
  descs = "Youtube වෙතින් songs බාගත කරයි.";
} else {
  descs = "Download songs from Youtube.";
}
var descyt = '';
if (config.LANG === 'SI') {
  descyt = "Youtube වෙතින් video සහ songs බාගත කරයි.";
} else {
  descyt = "Download videos and songs from Youtube.";
}
var descsh = '';
if (config.LANG === 'SI') {
  descsh = "Youtube search බාගත කරයි.";
} else {
  descsh = "Search and get details from youtube.";
}
var N_FOUND = '';
if (config.LANG === 'SI') {
  N_FOUND = "*මට කිසිවක් සොයාගත නොහැකි විය :(*";
} else {
  N_FOUND = "*I couldn't find anything :(*";
}
var urlneed = '';
function _0x491748(_0xcada8d, _0x54889a, _0x457e68, _0x14c25f, _0x44ab5b) {
  return _0x1a54(_0x44ab5b - 0xe7, _0x457e68);
}
if (config.LANG === 'SI') {
  urlneed = "*කරුණාකර Youtube url එකක් ලබා දෙන්න*";
} else {
  urlneed = "*Please give me youtube url..*";
}
var urlneed1 = '';
if (config.LANG === 'SI') {
  urlneed1 = "එය soundcloud වෙතින් songs බාගත කරයි.";
} else {
  urlneed1 = "It downloads songs from soundcloud.";
}
var imgmsg = '';
if (config.LANG === 'SI') {
  imgmsg = "```කරුණාකර වචන කිහිපයක් ලියන්න!```";
} else {
  imgmsg = "```Please write a few words!```";
}
var sizetoo = '';
if (config.LANG === 'SI') {
  sizetoo = "_This file size is too big_\n ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​  *මෙම file එක upload කිරීමට මෙම bot host වෙන platform එකේ bandwith එක ප්‍රමානවත් නැත !*";
} else {
  sizetoo = "_This file size is too big_\n​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ *The bandwidth of the platform where this bot is hosted is not enough to upload this file!*";
}
const _0x54b336 = {
  pattern: "song4",
  desc: "Download songs",
  category: "download",
  filename: __filename
};
cmd(_0x54b336, async (_0x5b44da, _0x28f41b, _0x4e4cc6, {
  from: _0x3f42ab,
  q: _0x74046c,
  reply: _0x4821f2
}) => {
  try {
    if (!_0x74046c) {
      await _0x5b44da.sendPresenceUpdate("recording", _0x3f42ab);
      const _0x48c858 = {
        url: "https://github.com/themiyadilann/DilaMD-Media/raw/main/voice/song.mp3"
      };
      const _0xdc798e = {
        audio: _0x48c858,
        mimetype: "audio/mpeg",
        ptt: true
      };
      const _0x454770 = {
        quoted: _0x28f41b
      };
      await _0x5b44da.sendMessage(_0x3f42ab, _0xdc798e, _0x454770);
      return;
    }
    const _0x47e62c = await yts(_0x74046c);
    const _0x1ceeb3 = _0x47e62c.videos[0];
    const _0x11f122 = _0x1ceeb3.url;
    let _0x4631f3 = "> VAJIRA MD YTDL\n\n🎶 *𝗧𝗶𝘁𝗹𝗲*: _" + _0x1ceeb3.title + "_\n👤 *𝗖𝗵𝗮𝗻𝗻𝗲𝗹*: _" + _0x1ceeb3.author.name + "_\n📝 *𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻*: _" + _0x1ceeb3.description + "_\n⏳ *𝗧𝗶𝗺𝗲*: _" + _0x1ceeb3.timestamp + "_\n⏱️ *𝗔𝗴𝗼*: _" + _0x1ceeb3.ago + "_\n👁️‍🗨️ *𝗩𝗶𝗲𝘄𝘀*: _" + (_0x1ceeb3.views >= 1000000000 ? (_0x1ceeb3.views / 1000000000).toFixed(1) + 'B' : _0x1ceeb3.views >= 1000000 ? (_0x1ceeb3.views / 1000000).toFixed(1) + 'M' : _0x1ceeb3.views >= 1000 ? (_0x1ceeb3.views / 1000).toFixed(1) + 'K' : _0x1ceeb3.views.toString()) + "_\n🔗 *𝗟𝗶𝗻𝗸*: " + _0x11f122;
    await _0x5b44da.sendPresenceUpdate("typing", _0x3f42ab);
    const _0x133b63 = {
      url: _0x1ceeb3.thumbnail
    };
    const _0x3afcec = {
      image: _0x133b63,
      caption: _0x4631f3
    };
    const _0x3c0bf2 = {
      quoted: _0x28f41b
    };
    await _0x5b44da.sendMessage(_0x3f42ab, _0x3afcec, _0x3c0bf2);
    let _0x25729e = await fg.yta(_0x11f122);
    let _0x4982c4 = _0x25729e.dl_url;
    await _0x5b44da.sendPresenceUpdate("recording", _0x3f42ab);
    const _0x5e6611 = {
      url: _0x4982c4
    };
    const _0x45f87f = {
      audio: _0x5e6611,
      mimetype: "audio/mpeg"
    };
    const _0x286a1b = {
      quoted: _0x28f41b
    };
    await _0x5b44da.sendMessage(_0x3f42ab, _0x45f87f, _0x286a1b);
    const _0x66695b = {
      url: _0x4982c4
    };
    const _0x310a80 = {
      document: _0x66695b,
      mimetype: "audio/mpeg",
      fileName: _0x1ceeb3.title + ".mp3",
      caption: "💻 *VAJIRA MD YTDL*"
    };
    const _0x1e1891 = {
      quoted: _0x28f41b
    };
    await _0x5b44da.sendMessage(_0x3f42ab, _0x310a80, _0x1e1891);
  } catch (_0xb9419f) {
    console.log(_0xb9419f);
    _0x4821f2("Error: " + _0xb9419f.message);
  }
});
const _0x5c7cde = {
  pattern: "video4",
  desc: "Download videos",
  category: "download",
  filename: __filename
};
cmd(_0x5c7cde, async (_0x557cd5, _0x2e92de, _0xc35fef, {
  from: _0x298a59,
  q: _0x4aa99c,
  reply: _0x28e5e1
}) => {
  try {
    if (!_0x4aa99c) {
      await _0x557cd5.sendPresenceUpdate("recording", _0x298a59);
      const _0x42c37c = {
        url: "https://github.com/themiyadilann/DilaMD-Media/raw/main/voice/video.mp3"
      };
      const _0x8f3b71 = {
        audio: _0x42c37c,
        mimetype: "audio/mpeg",
        ptt: true
      };
      const _0x539404 = {
        quoted: _0x2e92de
      };
      await _0x557cd5.sendMessage(_0x298a59, _0x8f3b71, _0x539404);
      return;
    }
    const _0x55121e = await yts(_0x4aa99c);
    const _0x4d05a7 = _0x55121e.videos[0];
    const _0x355b0d = _0x4d05a7.url;
    let _0x22675f = "VAJIRA MD YTDL\n\n🎶 *𝗧𝗶𝘁𝗹𝗲*: _" + _0x4d05a7.title + "_\n👤 *𝗖𝗵𝗮𝗻𝗻𝗲𝗹*: _" + _0x4d05a7.author.name + "_\n📝 *𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻*: _" + _0x4d05a7.description + "_\n⏳ *𝗧𝗶𝗺𝗲*: _" + _0x4d05a7.timestamp + "_\n⏱️ *𝗔𝗴𝗼*: _" + _0x4d05a7.ago + "_\n👁️‍🗨️ *𝗩𝗶𝗲𝘄𝘀*: _" + (_0x4d05a7.views >= 1000000000 ? (_0x4d05a7.views / 1000000000).toFixed(1) + 'B' : _0x4d05a7.views >= 1000000 ? (_0x4d05a7.views / 1000000).toFixed(1) + 'M' : _0x4d05a7.views >= 1000 ? (_0x4d05a7.views / 1000).toFixed(1) + 'K' : _0x4d05a7.views.toString()) + "_\n🔗 *𝗟𝗶𝗻𝗸*: " + _0x355b0d;
    await _0x557cd5.sendPresenceUpdate("typing", _0x298a59);
    const _0x5987bb = {
      url: _0x4d05a7.thumbnail
    };
    const _0x26d3ca = {
      image: _0x5987bb,
      caption: _0x22675f
    };
    const _0x39e34e = {
      quoted: _0x2e92de
    };
    await _0x557cd5.sendMessage(_0x298a59, _0x26d3ca, _0x39e34e);
    let _0x9bf1b0 = await fg.ytv(_0x355b0d);
    let _0x5657ad = _0x9bf1b0.dl_url;
    const _0x234701 = {
      url: _0x5657ad
    };
    const _0x1dad5e = {
      video: _0x234701,
      mimetype: "video/mp4"
    };
    const _0x177fa3 = {
      quoted: _0x2e92de
    };
    await _0x557cd5.sendMessage(_0x298a59, _0x1dad5e, _0x177fa3);
    const _0x4dde07 = {
      url: _0x5657ad
    };
    const _0x1bf5bd = {
      document: _0x4dde07,
      mimetype: "video/mp4",
      fileName: _0x4d05a7.title + ".mp4",
      caption: "💻 *VAJIRA MD YTDL*"
    };
    const _0x4ca8a5 = {
      quoted: _0x2e92de
    };
    await _0x557cd5.sendMessage(_0x298a59, _0x1bf5bd, _0x4ca8a5);
  } catch (_0x18e578) {
    console.log(_0x18e578);
    _0x28e5e1("Error: " + _0x18e578.message);
  }
});
const _0x4b06c7 = {
  pattern: "play3",
  react: '📱',
  desc: urlneed1,
  category: "download",
  use: ".soundcloud lelena",
  filename: __filename
};
cmd(_0x4b06c7, async (_0x365fd3, _0x4f6da0, _0x5d4590, {
  from: _0x368e8d,
  prefix: _0x4e8eac,
  l: _0x1e92b2,
  quoted: _0xed38be,
  body: _0x135443,
  isCmd: _0x1ea0a9,
  command: _0x4e6dc7,
  args: _0x28d9ad,
  q: _0x2b679e,
  isGroup: _0x1da931,
  sender: _0x5710c4,
  senderNumber: _0x518eaa,
  botNumber2: _0x2b3e64,
  botNumber: _0x536c3e,
  pushname: _0xbfe60a,
  isMe: _0x5ba246,
  isOwner: _0x305988,
  groupMetadata: _0x245364,
  groupName: _0x231721,
  participants: _0x117cad,
  groupAdmins: _0x128528,
  isBotAdmins: _0xdcc35e,
  isAdmins: _0x44f1a7,
  reply: _0x33e3e5
}) => {
  try {
    const _0x4ea9ba = {
      text: imgmsg
    };
    const _0x58a07a = {
      quoted: _0x4f6da0
    };
    if (!_0x2b679e) {
      return await _0x365fd3.sendMessage(_0x368e8d, _0x4ea9ba, _0x58a07a);
    }
    const _0x28d5d1 = await ssearch(_0x2b679e);
    const _0x2cc2d9 = _0x28d5d1.result;
    const _0x38cfa5 = {
      text: N_FOUND
    };
    const _0x1d8506 = {
      quoted: _0x4f6da0
    };
    if (_0x2cc2d9.length < 1) {
      return await _0x365fd3.sendMessage(_0x368e8d, _0x38cfa5, _0x1d8506);
    }
    var _0x279d43 = [];
    for (var _0x2af0cd = 0; _0x2af0cd < _0x2cc2d9.length; _0x2af0cd++) {
      if (_0x2cc2d9[_0x2af0cd].thumb && !_0x2cc2d9[_0x2af0cd].views.includes("Follow")) {
        _0x279d43.push({
          'title': _0x2af0cd + 0,
          'description': _0x2cc2d9[_0x2af0cd].title + " | " + _0x2cc2d9[_0x2af0cd].artist + " | " + _0x2cc2d9[_0x2af0cd].views + " | " + _0x2cc2d9[_0x2af0cd].release + " | " + _0x2cc2d9[_0x2af0cd].timestamp,
          'rowId': _0x4e8eac + "selectaud3 " + _0x2cc2d9[_0x2af0cd].url
        });
      }
    }
    const _0x150da3 = {
      title: "_[Result from m.soundcloud.com]_",
      rows: _0x279d43
    };
    const _0x48a9e9 = [_0x150da3];
    const _0x1cb5a9 = {
      text: "[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]\n\n   *SOUNDCLOUD DOWNLOADER*\n\n*📱 Entered Name:* " + _0x2b679e,
      footer: config.FOOTER,
      title: "Result from m.soundcloud.com 📲",
      buttonText: "*🔢 Reply below number*",
      sections: _0x48a9e9
    };
    const _0x2807b5 = {
      quoted: _0x4f6da0
    };
    await _0x365fd3.replyList(_0x368e8d, _0x1cb5a9, _0x2807b5);
  } catch (_0x5c3347) {
    _0x33e3e5("*ERROR !!*");
    _0x1e92b2(_0x5c3347);
  }
});
const _0x37064a = {
  alias: ["selectaud3"],
  filename: __filename
};
cmd(_0x37064a, async (_0x490032, _0x2160d4, _0x286251, {
  from: _0x2fd769,
  l: _0x93da2f,
  quoted: _0x377b55,
  prefix: _0x250d26,
  body: _0x4ba1be,
  isCmd: _0x39c366,
  command: _0x338634,
  args: _0x2af24d,
  q: _0x2d9056,
  isGroup: _0x4b3099,
  sender: _0x46d464,
  senderNumber: _0x5285f7,
  botNumber2: _0x11fcd5,
  botNumber: _0x38bddc,
  pushname: _0x4413f4,
  isMe: _0x47da14,
  isOwner: _0x5e126f,
  groupMetadata: _0x53becb,
  groupName: _0x2c6836,
  participants: _0x1fd273,
  groupAdmins: _0x3a8719,
  isBotAdmins: _0x4490ce,
  isAdmins: _0x12940a,
  reply: _0xa55c38
}) => {
  try {
    const _0x54b499 = [{
      'title': '',
      'rows': [{
        'title': '1',
        'rowId': _0x250d26 + "soundaud " + _0x2d9056,
        'description': "Normal type song 🎶"
      }, {
        'title': '2',
        'rowId': _0x250d26 + "sounddoc " + _0x2d9056,
        'description': "Document type song 📁"
      }]
    }];
    const _0x1f3871 = {
      text: "[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]\n\n  *SELECT VIDEO QUALITY*",
      footer: config.FOOTER,
      title: '',
      buttonText: "*🔢 Reply below number*",
      sections: _0x54b499
    };
    const _0x5cd885 = {
      quoted: _0x2160d4
    };
    return await _0x490032.replyList(_0x2fd769, _0x1f3871, _0x5cd885);
  } catch (_0x167834) {
    _0xa55c38("*ERROR !!*");
    _0x93da2f(_0x167834);
  }
});
const _0xf30a82 = {
  pattern: "sounddoc"
};
function _0x211e9d(_0x4cfa47, _0x35ccb4, _0x255c64, _0x427433, _0x3477fb) {
  return _0x1a54(_0x4cfa47 + 0xf4, _0x35ccb4);
}
_0xf30a82.dontAddCommandList = true;
_0xf30a82.filename = __filename;
cmd(_0xf30a82, async (_0x2e25f7, _0x5f4831, _0x488dee, {
  from: _0xe28fa4,
  l: _0x1822b7,
  quoted: _0x3f4f97,
  body: _0x503c4b,
  isCmd: _0x4d1172,
  command: _0x5b2bd5,
  args: _0x54331b,
  q: _0x572895,
  isGroup: _0xbc97c3,
  sender: _0x2cb502,
  senderNumber: _0x712744,
  botNumber2: _0x2cefbb,
  botNumber: _0x103099,
  pushname: _0x382db0,
  isMe: _0x26c172,
  isOwner: _0x1b9291,
  groupMetadata: _0x3331f1,
  groupName: _0x14405a,
  participants: _0x1309ff,
  groupAdmins: _0x573131,
  isBotAdmins: _0x49768c,
  isAdmins: _0x2dd3c3,
  reply: _0x26c7c0
}) => {
  try {
    const _0x3804f3 = {
      text: '📥',
      key: _0x5f4831.key
    };
    const _0x5b13be = {
      react: _0x3804f3
    };
    await _0x2e25f7.sendMessage(_0xe28fa4, _0x5b13be);
    const _0x50a4c1 = {
      text: "*Need link...*"
    };
    const _0x525b6b = {
      quoted: _0x5f4831
    };
    if (!_0x572895) {
      return await _0x2e25f7.sendMessage(_0xe28fa4, _0x50a4c1, _0x525b6b);
    }
    const _0x445be3 = await soundcloud(_0x572895);
    let _0x141770 = "*📚 Name :* " + _0x445be3.judul + "\n*📺 Down Count :* " + _0x445be3.download_count;
    const _0x2a779e = {
      url: _0x445be3.thumb
    };
    const _0x6d4c98 = {
      image: _0x2a779e,
      caption: _0x141770
    };
    const _0x58c272 = {
      quoted: _0x5f4831
    };
    await _0x2e25f7.sendMessage(_0xe28fa4, _0x6d4c98, _0x58c272);
    const _0x55b64c = {
      url: _0x445be3.link
    };
    const _0x582bf8 = {
      quoted: _0x5f4831
    };
    let _0x1d42b2 = await _0x2e25f7.sendMessage(_0xe28fa4, {
      'document': _0x55b64c,
      'mimetype': "audio/mpeg",
      'fileName': _0x445be3.judul + '.' + "mp3"
    }, _0x582bf8);
    const _0x2354ef = {
      text: '📁',
      key: _0x1d42b2.key
    };
    const _0x50d061 = {
      react: _0x2354ef
    };
    await _0x2e25f7.sendMessage(_0xe28fa4, _0x50d061);
    const _0x5daf48 = {
      text: '✔',
      key: _0x5f4831.key
    };
    const _0x4146d3 = {
      react: _0x5daf48
    };
    await _0x2e25f7.sendMessage(_0xe28fa4, _0x4146d3);
  } catch (_0x405d8c) {
    _0x26c7c0("*ERROR !!*");
    _0x1822b7(_0x405d8c);
  }
});
const _0x9a1c5e = {
  pattern: "soundaud",
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x9a1c5e, async (_0x1825a2, _0x53b4d1, _0xa1a7e8, {
  from: _0x568c20,
  l: _0x2358a3,
  quoted: _0x508677,
  body: _0x37bcf7,
  isCmd: _0x5ebc26,
  command: _0x4af07c,
  args: _0x1a94b5,
  q: _0x54bffc,
  isGroup: _0x6f6835,
  sender: _0x155b5d,
  senderNumber: _0x548837,
  botNumber2: _0x531047,
  botNumber: _0x280f84,
  pushname: _0x23fabd,
  isMe: _0x4face6,
  isOwner: _0x53bb02,
  groupMetadata: _0x28470a,
  groupName: _0x23b159,
  participants: _0x2619ff,
  groupAdmins: _0x592bf9,
  isBotAdmins: _0x561159,
  isAdmins: _0x4b93ea,
  reply: _0x1558a2
}) => {
  try {
    const _0x2c253a = {
      text: '📥',
      key: _0x53b4d1.key
    };
    const _0x1b387f = {
      react: _0x2c253a
    };
    await _0x1825a2.sendMessage(_0x568c20, _0x1b387f);
    const _0x4aef93 = {
      text: "*Need link...*"
    };
    const _0x458d36 = {
      quoted: _0x53b4d1
    };
    if (!_0x54bffc) {
      return await _0x1825a2.sendMessage(_0x568c20, _0x4aef93, _0x458d36);
    }
    const _0x168888 = await soundcloud(_0x54bffc);
    let _0x3825c3 = "*📚 Name :* " + _0x168888.judul + "\n*📺 Down Count :* " + _0x168888.download_count;
    const _0x739059 = {
      url: _0x168888.thumb
    };
    const _0x148ca3 = {
      image: _0x739059,
      caption: _0x3825c3
    };
    const _0x2458b6 = {
      quoted: _0x53b4d1
    };
    await _0x1825a2.sendMessage(_0x568c20, _0x148ca3, _0x2458b6);
    const _0x5ca478 = {
      url: _0x168888.link
    };
    const _0x145b49 = {
      quoted: _0x53b4d1
    };
    let _0x1b878a = await _0x1825a2.sendMessage(_0x568c20, {
      'audio': _0x5ca478,
      'mimetype': "audio/mpeg",
      'fileName': _0x168888.judul + '.' + "mp3"
    }, _0x145b49);
    const _0x5dc794 = {
      text: '📁',
      key: _0x1b878a.key
    };
    const _0x16ecca = {
      react: _0x5dc794
    };
    await _0x1825a2.sendMessage(_0x568c20, _0x16ecca);
    const _0x55c12f = {
      text: '✔',
      key: _0x53b4d1.key
    };
    const _0x3c77c3 = {
      react: _0x55c12f
    };
    await _0x1825a2.sendMessage(_0x568c20, _0x3c77c3);
  } catch (_0x149d8d) {
    _0x1558a2("*ERROR !!*");
    _0x2358a3(_0x149d8d);
  }
});
function _0x1a54(_0x2a7327, _0x596a0a) {
  const _0x3aac55 = _0x5664();
  _0x1a54 = function (_0x28e9bd, _0x2d0634) {
    _0x28e9bd = _0x28e9bd - 473;
    let _0x4c7857 = _0x3aac55[_0x28e9bd];
    return _0x4c7857;
  };
  return _0x1a54(_0x2a7327, _0x596a0a);
}
const _0x280c93 = {
  pattern: "yts",
  alias: ["ytsearch"],
  use: ".yts lelena",
  react: '🔎',
  desc: descsh
};
function _0x2ab001(_0x3e4956, _0x397b0b, _0x3e0e2b, _0x51c403, _0x26de82) {
  return _0x1a54(_0x51c403 - 0x8c, _0x3e0e2b);
}
_0x280c93.category = "search";
function _0x587c28(_0x190f46, _0x1f8c8e, _0xc73aba, _0x4221c2, _0x574a25) {
  return _0x1a54(_0x4221c2 + 0x292, _0x1f8c8e);
}
_0x280c93.filename = __filename;
cmd(_0x280c93, async (_0x2d6d89, _0x35c461, _0x410f13, {
  from: _0x249692,
  l: _0x232323,
  quoted: _0x274c4c,
  body: _0x4d411e,
  isCmd: _0x50b7da,
  command: _0x1f3d10,
  args: _0x269436,
  q: _0x1b01a6,
  isGroup: _0x3a6a5f,
  sender: _0x3b5711,
  senderNumber: _0x1fbea7,
  botNumber2: _0x1a5c2a,
  botNumber: _0x9d9bc8,
  pushname: _0xea90fc,
  isMe: _0x1b7db1,
  isOwner: _0x4f14df,
  groupMetadata: _0x527c86,
  groupName: _0x5b4263,
  participants: _0x1053e7,
  groupAdmins: _0x55bcc6,
  isBotAdmins: _0x23d85f,
  isAdmins: _0x1efd51,
  reply: _0x538db6
}) => {
  try {
    if (!_0x1b01a6) {
      return await _0x538db6(imgmsg);
    }
    if (isUrl(_0x1b01a6) && !ytreg(_0x1b01a6)) {
      return await _0x538db6(imgmsg);
    }
    try {
      let _0x4d23ca = require("yt-search");
      var _0x7b9989 = await _0x4d23ca(_0x1b01a6);
    } catch (_0x28ccec) {
      _0x232323(_0x28ccec);
      const _0x9f427b = {
        text: "*Error !!*"
      };
      const _0x45c519 = {
        quoted: _0x35c461
      };
      return await _0x2d6d89.sendMessage(_0x249692, _0x9f427b, _0x45c519);
    }
    var _0x5d7139 = '';
    _0x7b9989.all.map(_0x439948 => {
      _0x5d7139 += " *🖲️" + _0x439948.title + "*\n🔗 " + _0x439948.url + "\n\n";
    });
    const _0x6b84a5 = {
      text: _0x5d7139
    };
    const _0x420101 = {
      quoted: _0x35c461
    };
    await _0x2d6d89.sendMessage(_0x249692, _0x6b84a5, _0x420101);
  } catch (_0x1178e5) {
    _0x232323(_0x1178e5);
    _0x538db6("*Error !!*");
  }
});
const _0x36c678 = {
  pattern: 'yt',
  use: ".yt [song name or link]",
  react: '🎬',
  desc: descyt,
  category: "download",
  filename: __filename
};
cmd(_0x36c678, async (_0x4164e6, _0xe38cc5, _0x543125, {
  from: _0x6fd9df,
  prefix: _0x400632,
  l: _0x2f4534,
  quoted: _0xb3a7aa,
  body: _0x98b864,
  isCmd: _0x33b0c5,
  command: _0x4564d4,
  args: _0x176263,
  q: _0x9b50de,
  isGroup: _0x479b77,
  sender: _0x282eeb,
  senderNumber: _0xeb080c,
  botNumber2: _0x3b51e6,
  botNumber: _0x288487,
  pushname: _0x26b59e,
  isMe: _0x4f2e0a,
  isOwner: _0x516a32,
  groupMetadata: _0xc22238,
  groupName: _0x16275e,
  participants: _0x453e79,
  groupAdmins: _0x32cdd9,
  isBotAdmins: _0x5c332,
  isAdmins: _0x4107e8,
  reply: _0xa77099
}) => {
  try {
    if (!_0x9b50de) {
      return await _0xa77099(imgmsg);
    }
    if (isUrl(_0x9b50de) && !ytreg(_0x9b50de)) {
      return await _0xa77099(imgmsg);
    }
    if (isUrl(_0x9b50de) && _0x9b50de.includes("/shorts")) {
      const _0x15d0d0 = [{
        'title': '',
        'rows': [{
          'title': '1',
          'rowId': _0x400632 + "selectaud " + _0x9b50de,
          'description': "DOWNLOAD SONG 🎙️"
        }, {
          'title': '2',
          'rowId': _0x400632 + "selectvid " + _0x9b50de,
          'description': "DOWNLOAD VIDEO 🎞️"
        }]
      }];
      const _0x37cdd0 = {
        text: "*🎬📥VAJIRA-MD YT DOWNLOADER*\n\n*✏️ ʀᴇꜱᴜʟᴛ:*\n*🎭 ʀᴇǫᴜᴇꜱᴛᴇʀ:*\n\n*◯──────────────────────────────────◯*_",
        footer: "*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*",
        buttonText: "🔢 Reply below number,",
        sections: _0x15d0d0
      };
      const _0x2e4bca = {
        quoted: _0xe38cc5
      };
      return await _0x4164e6.replyList(_0x6fd9df, _0x37cdd0, _0x2e4bca);
    }
    if (ytreg(_0x9b50de)) {
      const _0xaba445 = [{
        'title': '',
        'rows': [{
          'title': '1',
          'rowId': _0x400632 + "ytdocs " + _0x9b50de,
          'description': "DOWNLOAD SONG 🎙️"
        }, {
          'title': '2',
          'rowId': _0x400632 + "ytdocv " + _0x9b50de,
          'description': "DOWNLOAD VIDEO 🎞️"
        }]
      }];
      const _0x2881f5 = {
        text: "*🎬📥VAJIRA-MD YT DOWNLOADER*\n\n*✏️ ʀᴇꜱᴜʟᴛ:*\n*🎭 ʀᴇǫᴜᴇꜱᴛᴇʀ:*\n\n*◯──────────────────────────────────◯*_",
        footer: "*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*",
        buttonText: "🔢 Reply below number,",
        sections: _0xaba445
      };
      const _0xc5bf71 = {
        quoted: _0xe38cc5
      };
      return await _0x4164e6.replyList(_0x6fd9df, _0x2881f5, _0xc5bf71);
    }
    let _0x563deb = require("yt-search");
    let _0x4822ee = await _0x563deb(_0x9b50de);
    let _0x1f43eb = _0x4822ee.videos[0];
    const _0x3fbdc1 = "*🎬📥VAJIRA-MD YT DOWNLOADER*\n\n*🎼 ꜱᴏɴɢ ɴᴀᴍᴇ: " + _0x1f43eb.title + "*\n*🎻 ᴄʜᴀɴɴᴇʟ: " + _0x1f43eb.author.name + "*\n\n*◯──────────────────────────────────◯*_";
    const _0x5dca2e = [{
      'title': '',
      'rows': [{
        'title': '1',
        'rowId': _0x400632 + "selectaud " + _0x1f43eb.url,
        'description': "DOWNLOAD SONG 🎙️"
      }, {
        'title': '2',
        'rowId': _0x400632 + "selectvid " + _0x1f43eb.url,
        'description': "DOWNLOAD VIDEO 🎞️"
      }]
    }];
    const _0x2acb70 = {
      url: _0x1f43eb.thumbnail
    };
    const _0x5cf393 = {
      image: _0x2acb70,
      caption: _0x3fbdc1,
      footer: config.FOOTER,
      title: '',
      buttonText: "*🔢 Reply below number*",
      sections: _0x5dca2e
    };
    const _0x17822c = {
      quoted: _0xe38cc5
    };
    return await _0x4164e6.replyList(_0x6fd9df, _0x5cf393, _0x17822c);
  } catch (_0x2c8d49) {
    _0xa77099("*ERROR !!*");
    _0x2f4534(_0x2c8d49);
  }
});
const _0x440cdf = {
  pattern: "video8",
  alias: ["ytvideo"],
  use: ".video lelena",
  react: "📽️",
  desc: descv,
  category: "download",
  filename: __filename
};
cmd(_0x440cdf, async (_0x92fbfc, _0x117bb8, _0x3af72e, {
  from: _0x2715ce,
  prefix: _0x408a8c,
  l: _0x490df0,
  quoted: _0x540b90,
  body: _0x73fe99,
  isCmd: _0x1c239d,
  command: _0x418e06,
  args: _0x3e5298,
  q: _0x5c4e14,
  isGroup: _0x35a254,
  sender: _0x5c81b1,
  senderNumber: _0x59eb50,
  botNumber2: _0xa43608,
  botNumber: _0x30fcfb,
  pushname: _0x5204f9,
  isMe: _0x3fdbe0,
  isOwner: _0x32b04d,
  groupMetadata: _0x3c2ded,
  groupName: _0x4aff69,
  participants: _0x2a50f4,
  groupAdmins: _0x5c7459,
  isBotAdmins: _0x1182f0,
  isAdmins: _0x45828d,
  reply: _0x5a128c
}) => {
  try {
    if (!_0x5c4e14) {
      return await _0x5a128c(imgmsg);
    }
    if (isUrl(_0x5c4e14) && !ytreg(_0x5c4e14)) {
      return await _0x5a128c(imgmsg);
    }
    if (isUrl(_0x5c4e14) && _0x5c4e14.includes("/shorts")) {
      const _0x4c56c9 = [{
        'title': "*[1] NORMAL QUALITY 🎶*",
        'rows': [{
          'title': "    1.1",
          'rowId': _0x408a8c + "240p " + _0x5c4e14,
          'description': "```240p```"
        }, {
          'title': "    1.2",
          'rowId': _0x408a8c + "360p " + _0x5c4e14,
          'description': "```320p```"
        }, {
          'title': "    1.3",
          'rowId': _0x408a8c + "480p " + _0x5c4e14,
          'description': "```480p```"
        }, {
          'title': "    1.4",
          'rowId': _0x408a8c + "720p " + _0x5c4e14,
          'description': "```720p```"
        }, {
          'title': "    1.5",
          'rowId': _0x408a8c + "1080p " + _0x5c4e14,
          'description': "```1080p```"
        }]
      }, {
        'title': "*[2] DOCUMENT QUALITY 📂*",
        'rows': [{
          'title': "    2.1",
          'rowId': _0x408a8c + "24p " + _0x5c4e14,
          'description': "```240p```"
        }, {
          'title': "    2.2",
          'rowId': _0x408a8c + "36p " + _0x5c4e14,
          'description': "```360p```"
        }, {
          'title': "    2.3",
          'rowId': _0x408a8c + "48p " + _0x5c4e14,
          'description': "```480p```"
        }, {
          'title': "    2.4",
          'rowId': _0x408a8c + "72p " + _0x5c4e14,
          'description': "```720p```"
        }, {
          'title': "    2.5",
          'rowId': _0x408a8c + "108p " + _0x5c4e14,
          'description': "```1080p```"
        }]
      }];
      const _0x176d9c = {
        url: config.LOGO
      };
      const _0x3634ca = {
        caption: "[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]\n\n   *SELECT VIDEO TYPE*",
        image: _0x176d9c,
        footer: config.FOOTER,
        title: '',
        buttonText: "*🔢 Reply below number*",
        sections: _0x4c56c9
      };
      const _0x4fa1ad = {
        quoted: _0x117bb8
      };
      return await _0x92fbfc.replyList(_0x2715ce, _0x3634ca, _0x4fa1ad);
    }
    if (ytreg(_0x5c4e14)) {
      const _0x30ef58 = [{
        'title': "*[1] NORMAL QUALITY 🎶*",
        'rows': [{
          'title': "    1.1",
          'rowId': _0x408a8c + "240p " + _0x5c4e14,
          'description': "```240p```"
        }, {
          'title': "    1.2",
          'rowId': _0x408a8c + "360p " + _0x5c4e14,
          'description': "```320p```"
        }, {
          'title': "    1.3",
          'rowId': _0x408a8c + "480p " + _0x5c4e14,
          'description': "```480p```"
        }, {
          'title': "    1.4",
          'rowId': _0x408a8c + "720p " + _0x5c4e14,
          'description': "```720p```"
        }, {
          'title': "    1.5",
          'rowId': _0x408a8c + "1080p " + _0x5c4e14,
          'description': "```1080p```"
        }]
      }, {
        'title': "*[2] DOCUMENT QUALITY 📂*",
        'rows': [{
          'title': "    2.1",
          'rowId': _0x408a8c + "24p " + _0x5c4e14,
          'description': "```240p```"
        }, {
          'title': "    2.2",
          'rowId': _0x408a8c + "36p " + _0x5c4e14,
          'description': "```360p```"
        }, {
          'title': "    2.3",
          'rowId': _0x408a8c + "48p " + _0x5c4e14,
          'description': "```480p```"
        }, {
          'title': "    2.4",
          'rowId': _0x408a8c + "72p " + _0x5c4e14,
          'description': "```720p```"
        }, {
          'title': "    2.5",
          'rowId': _0x408a8c + "108p " + _0x5c4e14,
          'description': "```1080p```"
        }]
      }];
      const _0x2a4b6e = {
        text: "[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]\n*SELECT VIDEO TYPE*",
        footer: config.FOOTER,
        buttonText: "🔢 Reply below number,",
        sections: _0x30ef58
      };
      const _0x1f7beb = {
        quoted: _0x117bb8
      };
      return await _0x92fbfc.replyList(_0x2715ce, _0x2a4b6e, _0x1f7beb);
    }
    let _0x7fda6a = require("yt-search");
    let _0x34fbfd = await _0x7fda6a(_0x5c4e14);
    let _0xdfe437 = _0x34fbfd.videos[0];
    const _0x2351a4 = "📽️ *ᴠᴀᴊɪʀᴀ-ᴍᴅ ᴠɪᴅᴇᴏ-ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*📽️\n\n┌──────────────────\n\n*ℹ️ Title:* " + _0xdfe437.title + "\n*👁️‍🗨️ Views:* " + _0xdfe437.views + "\n*🕘 Duration:* " + _0xdfe437.timestamp + "\n*🔗 Url:* " + _0xdfe437.url + " \n\n└──────────────────";
    const _0x2f243c = [{
      'title': "*[1] NORMAL QUALITY 🎶*",
      'rows': [{
        'title': "    1.1",
        'rowId': _0x408a8c + "240p " + _0xdfe437.url,
        'description': "```240p```"
      }, {
        'title': "    1.2",
        'rowId': _0x408a8c + "360p " + _0xdfe437.url,
        'description': "```320p```"
      }, {
        'title': "    1.3",
        'rowId': _0x408a8c + "480p " + _0xdfe437.url,
        'description': "```480p```"
      }, {
        'title': "    1.4",
        'rowId': _0x408a8c + "720p " + _0xdfe437.url,
        'description': "```720p```"
      }, {
        'title': "    1.5",
        'rowId': _0x408a8c + "1080p " + _0xdfe437.url,
        'description': "```1080p```"
      }]
    }, {
      'title': "*[2] DOCUMENT QUALITY 📂*",
      'rows': [{
        'title': "    2.1",
        'rowId': _0x408a8c + "24p " + _0xdfe437.url,
        'description': "```240p```"
      }, {
        'title': "    2.2",
        'rowId': _0x408a8c + "36p " + _0xdfe437.url,
        'description': "```360p```"
      }, {
        'title': "    2.3",
        'rowId': _0x408a8c + "48p " + _0xdfe437.url,
        'description': "```480p```"
      }, {
        'title': "    2.4",
        'rowId': _0x408a8c + "72p " + _0xdfe437.url,
        'description': "```720p```"
      }, {
        'title': "    2.5",
        'rowId': _0x408a8c + "108p " + _0xdfe437.url,
        'description': "```1080p```"
      }]
    }];
    const _0xf4135e = {
      url: _0xdfe437.thumbnail
    };
    const _0x180034 = {
      image: _0xf4135e,
      caption: _0x2351a4,
      footer: config.FOOTER,
      title: '',
      buttonText: "*🔢 Reply below number*",
      sections: _0x2f243c
    };
    const _0x8d378a = {
      quoted: _0x117bb8
    };
    return await _0x92fbfc.replyList(_0x2715ce, _0x180034, _0x8d378a);
  } catch (_0x35044b) {
    _0x5a128c("*ERROR !!*");
    _0x490df0(_0x35044b);
  }
});
const _0x1e01d9 = {
  pattern: "song8",
  alias: ["ytsong"],
  use: ".song lelena",
  react: '🎧'
};
function _0x35586b(_0x44e538, _0x1d624f, _0x543bc4, _0x149eac, _0xb6aabc) {
  return _0x1a54(_0x543bc4 - 0x1ce, _0xb6aabc);
}
_0x1e01d9.desc = descs;
_0x1e01d9.category = "download";
_0x1e01d9.filename = __filename;
cmd(_0x1e01d9, async (_0x2926f6, _0x140c27, _0x5c7c3e, {
  from: _0x50ce83,
  prefix: _0x44f426,
  l: _0x2264d0,
  quoted: _0x465c46,
  body: _0x4dc7ab,
  isCmd: _0x21c229,
  command: _0x155cdc,
  args: _0x3625b7,
  q: _0x9c70c5,
  isGroup: _0x51e765,
  sender: _0x5a0e05,
  senderNumber: _0x1da0ed,
  botNumber2: _0x1efec0,
  botNumber: _0x15452a,
  pushname: _0x239928,
  isMe: _0x52005a,
  isOwner: _0x12ded2,
  groupMetadata: _0x3551f9,
  groupName: _0x360187,
  participants: _0x2e551a,
  groupAdmins: _0x590118,
  isBotAdmins: _0x57d309,
  isAdmins: _0x2a27e0,
  reply: _0x5e0982
}) => {
  try {
    if (!_0x9c70c5) {
      return await _0x5e0982(imgmsg);
    }
    if (isUrl(_0x9c70c5) && !ytreg(_0x9c70c5)) {
      return await _0x5e0982(imgmsg);
    }
    if (isUrl(_0x9c70c5) && _0x9c70c5.includes("/shorts")) {
      const _0x23bc04 = [{
        'title': '',
        'rows': [{
          'title': '1',
          'rowId': _0x44f426 + "ytmp3 " + _0x9c70c5,
          'description': "Normal type song 🎶"
        }, {
          'title': '2',
          'rowId': _0x44f426 + "ytdocs " + _0x9c70c5,
          'description': "Document type song 📂"
        }]
      }];
      const _0x54145d = {
        text: "[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]\n\n   *SELECT SONG TYPE*",
        footer: "*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*",
        buttonText: "```🔢 Reply below number you need song type,```",
        sections: _0x23bc04
      };
      const _0x313a60 = {
        quoted: _0x140c27
      };
      return await _0x2926f6.replyList(_0x50ce83, _0x54145d, _0x313a60);
    }
    if (ytreg(_0x9c70c5)) {
      const _0x2359aa = [{
        'title': '',
        'rows': [{
          'title': '1',
          'rowId': _0x44f426 + "ytmp3 " + _0x9c70c5,
          'description': "Normal type song 🎶"
        }, {
          'title': '2',
          'rowId': _0x44f426 + "ytdocs " + _0x9c70c5,
          'description': "Document type song 📂"
        }]
      }];
      const _0x58d0ae = {
        text: "[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]\n\n*SELECT SONG TYPE*",
        footer: "*ᴠᴀᴊɪʀᴀ-ᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*",
        buttonText: "```🔢 Reply below number you need song type,```",
        sections: _0x2359aa
      };
      const _0x58de36 = {
        quoted: _0x140c27
      };
      return await _0x2926f6.replyList(_0x50ce83, _0x58d0ae, _0x58de36);
    }
    _0x9c70c5 = convertYouTubeLink(_0x9c70c5);
    const _0xaac952 = await yts(_0x9c70c5);
    const _0x548820 = _0xaac952.videos[0];
    const _0x5ef3b1 = "📽️ *ᴠᴀᴊɪʀᴀ-ᴍᴅ ᴠɪᴅᴇᴏ-ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*📽️\n\n┌──────────────────\n\n*ℹ️ Title:* " + _0x548820.title + "\n*👁️‍🗨️ Views:* " + _0x548820.views + "\n*🕘 Duration:* " + _0x548820.timestamp + "\n*📌 Ago :* " + _0x548820.ago + "\n*🔗 Url:* " + _0x548820.url + " \n\n└──────────────────";
    const _0x53897c = [{
      'title': '',
      'rows': [{
        'title': '1',
        'rowId': _0x44f426 + "ytmp3 " + _0x548820.url,
        'description': "Normal type song 🎶"
      }, {
        'title': '2',
        'rowId': _0x44f426 + "ytdocs " + _0x548820.url,
        'description': "Document type song 📂"
      }]
    }];
    const _0xf70ac8 = {
      url: _0x548820.thumbnail
    };
    const _0x393699 = {
      image: _0xf70ac8,
      caption: _0x5ef3b1,
      footer: config.FOOTER,
      title: '',
      buttonText: "*🔢 Reply below number*",
      sections: _0x53897c
    };
    const _0x5b87ee = {
      quoted: _0x140c27
    };
    return await _0x2926f6.replyList(_0x50ce83, _0x393699, _0x5b87ee);
  } catch (_0x5797df) {
    _0x5e0982("*ERROR !!*");
    _0x2264d0(_0x5797df);
  }
});
const _0x253309 = {
  alias: ["selectaud"],
  filename: __filename
};
cmd(_0x253309, async (_0xdc4c10, _0xe9eef, _0x4cecad, {
  from: _0x5d546d,
  l: _0x5d2e2a,
  quoted: _0x2da3be,
  prefix: _0x20be1f,
  body: _0xc23284,
  isCmd: _0x3d28d5,
  command: _0xb96e4,
  args: _0x1aeb4c,
  q: _0x2dad59,
  isGroup: _0x194ded,
  sender: _0x2af1da,
  senderNumber: _0x14be39,
  botNumber2: _0x579150,
  botNumber: _0x4884e5,
  pushname: _0x29cdbc,
  isMe: _0x5004e6,
  isOwner: _0x17ff8b,
  groupMetadata: _0x43c706,
  groupName: _0x537641,
  participants: _0x42e5ae,
  groupAdmins: _0x1ac9e0,
  isBotAdmins: _0xee531b,
  isAdmins: _0xc9804f,
  reply: _0x5e0555
}) => {
  try {
    const _0x33e624 = [{
      'title': '',
      'rows': [{
        'title': '1',
        'rowId': _0x20be1f + "ytmp3 " + _0x2dad59,
        'description': "Normal type song 🎶"
      }, {
        'title': '2',
        'rowId': _0x20be1f + "ytdocs " + _0x2dad59,
        'description': "Document type video 📁"
      }]
    }];
    const _0x3feed6 = {
      text: "[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]\n\n  *SELECT VIDEO QUALITY*",
      footer: config.FOOTER,
      title: '',
      buttonText: "*🔢 Reply below number*",
      sections: _0x33e624
    };
    const _0x3fed12 = {
      quoted: _0xe9eef
    };
    return await _0xdc4c10.replyList(_0x5d546d, _0x3feed6, _0x3fed12);
  } catch (_0x2fda10) {
    _0x5e0555("*ERROR !!*");
    _0x5d2e2a(_0x2fda10);
  }
});
const _0x5a5a61 = {
  alias: ["selectvid"],
  filename: __filename
};
cmd(_0x5a5a61, async (_0x35213d, _0x55cf93, _0x415a3f, {
  from: _0x4deda5,
  l: _0xdc023d,
  quoted: _0x39fe0f,
  prefix: _0x38224d,
  body: _0x3c8d74,
  isCmd: _0x1239d5,
  command: _0x348680,
  args: _0x153883,
  q: _0x4f0971,
  isGroup: _0x265f5b,
  sender: _0x117110,
  senderNumber: _0x4c207a,
  botNumber2: _0x3a10e0,
  botNumber: _0x42043a,
  pushname: _0x5f4d3e,
  isMe: _0x1fc318,
  isOwner: _0xa9b3fc,
  groupMetadata: _0x43b6ab,
  groupName: _0x5b5579,
  participants: _0x179529,
  groupAdmins: _0x36359e,
  isBotAdmins: _0x1b90bb,
  isAdmins: _0x590bb0,
  reply: _0x20b19d
}) => {
  try {
    const _0x5a8ad8 = [{
      'title': "*[1] NORMAL QUALITY 🎶*",
      'rows': [{
        'title': "    1.1",
        'rowId': _0x38224d + "240p " + _0x4f0971,
        'description': "```240p```"
      }, {
        'title': "    1.2",
        'rowId': _0x38224d + "360p " + _0x4f0971,
        'description': "```320p```"
      }, {
        'title': "    1.3",
        'rowId': _0x38224d + "480p " + _0x4f0971,
        'description': "```480p```"
      }, {
        'title': "    1.4",
        'rowId': _0x38224d + "720p " + _0x4f0971,
        'description': "```720p```"
      }, {
        'title': "    1.5",
        'rowId': _0x38224d + "1080p " + _0x4f0971,
        'description': "```1080p```"
      }]
    }, {
      'title': "*[2] DOCUMENT QUALITY 📂*",
      'rows': [{
        'title': "    2.1",
        'rowId': _0x38224d + "24p " + _0x4f0971,
        'description': "```240p```"
      }, {
        'title': "    2.2",
        'rowId': _0x38224d + "36p " + _0x4f0971,
        'description': "```360p```"
      }, {
        'title': "    2.3",
        'rowId': _0x38224d + "48p " + _0x4f0971,
        'description': "```480p```"
      }, {
        'title': "    2.4",
        'rowId': _0x38224d + "72p " + _0x4f0971,
        'description': "```720p```"
      }, {
        'title': "    2.5",
        'rowId': _0x38224d + "108p " + _0x4f0971,
        'description': "```1080p```"
      }]
    }];
    const _0x22de21 = {
      text: "[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]\n\n  *SELECT VIDEO QUALITY*",
      footer: config.FOOTER,
      title: '',
      buttonText: "*🔢 Reply below number*",
      sections: _0x5a8ad8
    };
    const _0x24b42d = {
      quoted: _0x55cf93
    };
    return await _0x35213d.replyList(_0x4deda5, _0x22de21, _0x24b42d);
  } catch (_0x46f78d) {
    _0x20b19d("*ERROR !!*");
    _0xdc023d(_0x46f78d);
  }
});
const _0x1f4754 = {
  pattern: "ytmp3",
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x1f4754, async (_0x47c60d, _0xc4860a, _0x15c110, {
  from: _0x1fefdf,
  q: _0x54220f,
  reply: _0x29b9a4
}) => {
  try {
    const _0x2eaebc = {
      text: '📥',
      key: _0xc4860a.key
    };
    const _0x37435f = {
      react: _0x2eaebc
    };
    await _0x47c60d.sendMessage(_0x1fefdf, _0x37435f);
    const _0x2f8ab8 = {
      text: "*Need link...*"
    };
    const _0x18302e = {
      quoted: _0xc4860a
    };
    if (!_0x54220f) {
      return await _0x47c60d.sendMessage(_0x1fefdf, _0x2f8ab8, _0x18302e);
    }
    let _0x589e2d = await fg.yta(_0x54220f);
    const _0x44a80d = {
      url: _0x589e2d.dl_url
    };
    const _0xfd60a2 = {
      quoted: _0xc4860a
    };
    let _0x2f9aff = await _0x47c60d.sendMessage(_0x1fefdf, {
      'audio': _0x44a80d,
      'mimetype': "audio/mpeg",
      'fileName': _0x589e2d.title + '.' + "mp3"
    }, _0xfd60a2);
    const _0x15f613 = {
      text: '📁',
      key: _0x2f9aff.key
    };
    const _0x14a7ee = {
      react: _0x15f613
    };
    await _0x47c60d.sendMessage(_0x1fefdf, _0x14a7ee);
    const _0x3c4234 = {
      text: '✔',
      key: _0xc4860a.key
    };
    const _0x5450c3 = {
      react: _0x3c4234
    };
    await _0x47c60d.sendMessage(_0x1fefdf, _0x5450c3);
  } catch (_0x59cfaf) {
    _0x29b9a4("*ERROR !!*");
    l(_0x59cfaf);
  }
});
const _0x341400 = {
  pattern: "ytmp4",
  use: ".ytmp3 <yt url>",
  react: '🎧',
  desc: "Download yt song.",
  category: "download",
  filename: __filename
};
cmd(_0x341400, async (_0x1465c1, _0x4cbde1, _0x3372ff, {
  from: _0x3d59d7,
  l: _0x3fdfbf,
  quoted: _0x3490d3,
  body: _0x1b6f0f,
  isCmd: _0xd7587e,
  command: _0x328def,
  args: _0x190d03,
  q: _0x878f41,
  isGroup: _0x5e1e0c,
  sender: _0x363c74,
  senderNumber: _0x2e0e6b,
  botNumber2: _0x2563e3,
  botNumber: _0x2c5c30,
  pushname: _0x4e9a09,
  isMe: _0x5deeaf,
  isOwner: _0x4b0c53,
  groupMetadata: _0x20d2ac,
  groupName: _0xb0884a,
  participants: _0x35bf05,
  groupAdmins: _0x42ff64,
  isBotAdmins: _0x53ed00,
  isAdmins: _0x5d2d5f,
  reply: _0x3cc11b
}) => {
  try {
    if (!ytreg(_0x878f41)) {
      return await _0x3cc11b(urlneed);
    }
    const _0x55e9dd = _0x878f41.split(" & ")[0];
    const _0x46c01a = _0x878f41.split(" & ")[1];
    if (!_0x55e9dd) {
      return _0x3cc11b(msr.url);
    }
    if (!_0x55e9dd.includes("https://youtube.com/watch?v=")) {
      return await _0x3cc11b();
    }
    let _0x5ab8a2 = await ytmp4('' + _0x55e9dd, '' + _0x46c01a);
    const _0x181915 = {
      text: '⬆',
      key: _0x4cbde1.key
    };
    const _0x5b70e8 = {
      react: _0x181915
    };
    await _0x1465c1.sendMessage(_0x3d59d7, _0x5b70e8);
    const _0x4c526e = {
      url: _0x5ab8a2
    };
    const _0x23159f = {
      video: _0x4c526e,
      mimetype: "video/mp4"
    };
    const _0x3b6e77 = {
      quoted: _0x4cbde1
    };
    await _0x1465c1.sendMessage(_0x3d59d7, _0x23159f, _0x3b6e77);
    const _0x3ca205 = {
      text: '✔',
      key: _0x4cbde1.key
    };
    const _0x448c83 = {
      react: _0x3ca205
    };
    await _0x1465c1.sendMessage(_0x3d59d7, _0x448c83);
  } catch (_0x379c99) {
    console.log(_0x379c99);
    _0x3cc11b('' + _0x379c99);
  }
});
const _0x25a69e = {
  pattern: "ytdocs",
  use: ".ytdoc <yt url>",
  react: '🎧',
  desc: "Download yt song.",
  category: "download",
  filename: __filename
};
cmd(_0x25a69e, async (_0x3f0365, _0x5a7020, _0x31ea1a, {
  from: _0x590d88,
  l: _0xe4cfce,
  quoted: _0x199cce,
  body: _0x4fd9c8,
  isCmd: _0x32bda9,
  command: _0x157b1b,
  args: _0x13ad26,
  q: _0x119e1a,
  isGroup: _0x3775f8,
  sender: _0x13d3b2,
  senderNumber: _0x5f2cf2,
  botNumber2: _0x4bf8e5,
  botNumber: _0x2fb7f1,
  pushname: _0xec96cb,
  isMe: _0x413b10,
  isOwner: _0x58271e,
  groupMetadata: _0x5181db,
  groupName: _0x149d89,
  participants: _0x109092,
  groupAdmins: _0x1bfc29,
  isBotAdmins: _0x1d4395,
  isAdmins: _0x11d9d6,
  reply: _0x2c41c9
}) => {
  try {
    const _0x3c3258 = {
      text: '📥',
      key: _0x5a7020.key
    };
    const _0x30b0d5 = {
      react: _0x3c3258
    };
    await _0x3f0365.sendMessage(_0x590d88, _0x30b0d5);
    const _0x2d8f6f = {
      text: "*Need link...*"
    };
    const _0x24e449 = {
      quoted: _0x5a7020
    };
    if (!_0x119e1a) {
      return await _0x3f0365.sendMessage(_0x590d88, _0x2d8f6f, _0x24e449);
    }
    let _0x159368 = await fg.yta(_0x119e1a);
    const _0x1e3b5b = {
      url: _0x159368.dl_url
    };
    const _0xb59437 = {
      quoted: _0x5a7020
    };
    let _0x1d8eb7 = await _0x3f0365.sendMessage(_0x590d88, {
      'document': _0x1e3b5b,
      'mimetype': "audio/mpeg",
      'fileName': _0x159368.title + '.' + "mp3"
    }, _0xb59437);
    const _0x22fdce = {
      text: '📁',
      key: _0x1d8eb7.key
    };
    const _0x8b7bfd = {
      react: _0x22fdce
    };
    await _0x3f0365.sendMessage(_0x590d88, _0x8b7bfd);
    const _0x341d86 = {
      text: '✔',
      key: _0x5a7020.key
    };
    const _0xddbaea = {
      react: _0x341d86
    };
    await _0x3f0365.sendMessage(_0x590d88, _0xddbaea);
  } catch (_0x5a8317) {
    _0x2c41c9("*ERROR !!*");
    _0xe4cfce(_0x5a8317);
  }
});
const _0x416b9d = {
  pattern: "ytdocv",
  use: ".ytdoc <yt url>",
  react: '🎧',
  desc: "Download yt song.",
  category: "download",
  filename: __filename
};
cmd(_0x416b9d, async (_0x3052db, _0x16c804, _0x323ea9, {
  from: _0xd0f58,
  l: _0x7c3b0c,
  quoted: _0x466a09,
  body: _0x15c438,
  isCmd: _0x2273b5,
  command: _0x59cd5a,
  args: _0x4fb519,
  q: _0x940b7c,
  isGroup: _0x4cfe60,
  sender: _0x3475a5,
  senderNumber: _0x46df0b,
  botNumber2: _0x233d13,
  botNumber: _0x2036bd,
  pushname: _0x388604,
  isMe: _0x10424e,
  isOwner: _0x3f04b5,
  groupMetadata: _0x45ca3d,
  groupName: _0x4fba89,
  participants: _0x6b6261,
  groupAdmins: _0x934692,
  isBotAdmins: _0x4d30d4,
  isAdmins: _0x650fdc,
  reply: _0x168291
}) => {
  try {
    if (!ytreg(_0x940b7c)) {
      return await _0x168291(urlneed);
    }
    const _0x3cd5b3 = _0x940b7c.split(" & ")[0];
    const _0x4e91ac = _0x940b7c.split(" & ")[1];
    if (!_0x3cd5b3.includes("https://youtube.com/watch?v=")) {
      return await _0x168291();
    }
    let _0x155fb0 = await ytmp4('' + _0x3cd5b3.trim(), '' + _0x4e91ac.trim());
    const _0x19e99b = await yts(_0x940b7c);
    const _0x5a03de = _0x19e99b.videos[0];
    const _0x3d11cf = {
      text: '⬆',
      key: _0x16c804.key
    };
    const _0x39dbb6 = {
      react: _0x3d11cf
    };
    await _0x3052db.sendMessage(_0xd0f58, _0x39dbb6);
    const _0x197fee = {
      url: _0x155fb0
    };
    const _0x161b82 = {
      quoted: _0x16c804
    };
    await _0x3052db.sendMessage(_0xd0f58, {
      'document': _0x197fee,
      'mimetype': "video/mp4",
      'fileName': _0x5a03de.title + ".mp4",
      'caption': '' + config.FOOTER
    }, _0x161b82);
    const _0x40e152 = {
      text: '✔',
      key: _0x16c804.key
    };
    const _0x25bb42 = {
      react: _0x40e152
    };
    await _0x3052db.sendMessage(_0xd0f58, _0x25bb42);
  } catch (_0x3f56cb) {
    const _0x145a20 = {
      text: '❌',
      key: _0x16c804.key
    };
    const _0x36beaa = {
      react: _0x145a20
    };
    await _0x3052db.sendMessage(_0xd0f58, _0x36beaa);
    console.log(_0x3f56cb);
    _0x168291("Error !!\n\n*" + _0x3f56cb + '*');
  }
});
const _0x24edc9 = {
  pattern: "240p",
  react: '🎥',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x24edc9, async (_0x52a74e, _0x5ea559, _0x4ff5d1, {
  from: _0x43e27e,
  q: _0x420da7,
  reply: _0x5cade5
}) => {
  try {
    if (!ytreg(_0x420da7)) {
      return await _0x5cade5(urlneed);
    }
    const _0x42ebe8 = await dl.youtubedl(_0x420da7);
    const _0x389b13 = {
      quoted: _0x4ff5d1
    };
    let _0x1eedfa = await _0x52a74e.sendMessage(_0x43e27e, {
      'video': {
        'url': await _0x42ebe8.video["240p"].download()
      },
      'caption': config.FOOTER
    }, _0x389b13);
    const _0x464777 = {
      text: '🎥',
      key: _0x1eedfa.key
    };
    const _0x2005e5 = {
      react: _0x464777
    };
    await _0x52a74e.sendMessage(_0x43e27e, _0x2005e5);
  } catch (_0x52ebe9) {
    _0x5cade5(N_FOUND);
    l(_0x52ebe9);
  }
});
const _0x16ce37 = {
  pattern: "360p",
  react: "📽️",
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x16ce37, async (_0x438a2d, _0x3c2cc7, _0x17cad7, {
  from: _0x2b2d52,
  q: _0x3c5911,
  reply: _0x5ecbdf
}) => {
  try {
    if (!ytreg(_0x3c5911)) {
      return await _0x5ecbdf(urlneed);
    }
    const _0x4db5d2 = await dl.youtubedl(_0x3c5911);
    const _0x3b7598 = {
      quoted: _0x17cad7
    };
    let _0x5049c1 = await _0x438a2d.sendMessage(_0x2b2d52, {
      'video': {
        'url': await _0x4db5d2.video["360p"].download()
      },
      'caption': config.FOOTER
    }, _0x3b7598);
    const _0x158422 = {
      text: '🎥',
      key: _0x5049c1.key
    };
    const _0x1347c5 = {
      react: _0x158422
    };
    await _0x438a2d.sendMessage(_0x2b2d52, _0x1347c5);
  } catch (_0x154db1) {
    _0x5ecbdf(N_FOUND);
    l(_0x154db1);
  }
});
const _0x5be37 = {
  pattern: "480p",
  react: "📽️",
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x5be37, async (_0x50804c, _0x20de58, _0x152074, {
  from: _0x57c20c,
  q: _0xbf95b5,
  reply: _0x33072e
}) => {
  try {
    if (!ytreg(_0xbf95b5)) {
      return await _0x33072e(urlneed);
    }
    const _0x16195b = await dl.youtubedl(_0xbf95b5);
    const _0x49f345 = {
      quoted: _0x152074
    };
    let _0x787347 = await _0x50804c.sendMessage(_0x57c20c, {
      'video': {
        'url': await _0x16195b.video["480p"].download()
      },
      'caption': config.FOOTER
    }, _0x49f345);
    const _0x41711f = {
      text: '🎥',
      key: _0x787347.key
    };
    const _0x3192db = {
      react: _0x41711f
    };
    await _0x50804c.sendMessage(_0x57c20c, _0x3192db);
  } catch (_0x5d3637) {
    _0x33072e(N_FOUND);
    l(_0x5d3637);
  }
});
const _0x1f5695 = {
  pattern: "720p",
  react: "📽️",
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x1f5695, async (_0x22932f, _0x2144d2, _0x33b155, {
  from: _0x1e810d,
  q: _0x4234fc,
  reply: _0x1ce549
}) => {
  try {
    if (!ytreg(_0x4234fc)) {
      return await _0x1ce549(urlneed);
    }
    const _0x45ae1c = await dl.youtubedl(_0x4234fc);
    const _0x8c828b = {
      quoted: _0x33b155
    };
    let _0x3a20fc = await _0x22932f.sendMessage(_0x1e810d, {
      'video': {
        'url': await _0x45ae1c.video["720p"].download()
      },
      'caption': config.FOOTER
    }, _0x8c828b);
    const _0x1e32e4 = {
      text: '🎥',
      key: _0x3a20fc.key
    };
    const _0x31a0c7 = {
      react: _0x1e32e4
    };
    await _0x22932f.sendMessage(_0x1e810d, _0x31a0c7);
  } catch (_0x133bd0) {
    _0x1ce549(N_FOUND);
    l(_0x133bd0);
  }
});
const _0x3c92ca = {};
function _0x5664() {
  const _0x293b39 = ["om yo", 'NskWp', 'aVcFO', 'OqqcB', 'ISMvF', 'FpXAs', 'ylux', 'List', "song ", 'btPph', 'WXpwm', 'DNmeO', 'HmGuC', 'aIQMc', 'BdcPz', 'rpRZx', 'huGKJ', 'zxvCn', 'HjJgP', 'tVEYZ', ":* ", 'FXDwg', '36bd9', 'metho', 'FEvXD', 'qnWnr', "වත් න", 'Wdhsc', "be වෙ", "or li", 'gkEPl', "ly be", 'CDyYC', 'LBGOM', 'wPeYS', "0 (Wi", 'xhlhk', 'iWicH', '.ytdo', 'find', "uldn'", 'vKxKn', 'CFDZO', "🎼 ꜱᴏɴ", "R*\n\n*", 'cbsmz', "360p ", 'doc', 'Wobmg', 'qhETI', 'hCzxh', 'andwi', 'BxVJe', "t fro", 'uGaFP', "_\n⏱️ *", 'searc', 'rl..*', 'oad_c', "ℹ️ Tit", 'pe,``', 'ata', 'gxihX', "් සොය", 'RTOBV', " & ", 'aper', '24p', 'sendM', 'yhaPz', "g 🎶", 'd.com', '25rFFMrw', 'judul', 'yYPFS', 'mejhY', 'DsXdM', '𝗶𝗽𝘁𝗶𝗼', 'RFURl', "oud ව", 'capti', "ාකර Y", 'cInHk', 'PaZQf', '1644375pqprOp', 'LKdVo', 'GsWMe', 'rows', '#head', "\n*🎭 ʀ", 'vQDzg', 'GpVTJ', 'wQupt', 'o.mp3', 'dFAyh', 'ate', 'zVjpZ', " is t", 'sVtWD', 'rwkAh', 'Ylmnm', 'TFjMj', "ber y", 'VuQud', 'YDDHe', 'atch?', 'n/x-w', 'wpwxJ', 'b5c7c', 'UALIT', "name ", "ds so", 'XKuUe', " li >", 'Calip', 'කිහිප', 'yUdte', 'lFTAv', "IRA M", 'dEjKf', 'tBYvu', 'UCfxy', 'vdcRm', "ᴅ ʙʏ ", 'eazGW', 'aMVfl', '8f2ba', 'JIRA-', 'PWdBi', 'qZhwR', 'vJuIP', 'YrtnF', 'b/ytd', '📽️', 'LOGO', 'QOqzC', 'ᴄʜᴀɴɴ', '!```', 'YmbGc', '../li', 'rEJgt', 'oELjH', 'nCERQ', "er > ", "*🔢 Re", 'IBfjS', '.com/', 'ZYEQl', 'TEoQQ', 'Mozil', "t son", '*Need', 'JMskS', "ECT V", "g_\n ​", "𝗻*: _", "    2", 'mMLyz', 'hemiy', 'imZuy', 'alias', 'yGnTT', ": _", 'urati', 'HdEQX', 'com/t', 'test', 'tra', 'YEgFm', 'wXKHe', 'WtXoi', 'hAQpb', 'DOCUM', 'WDPJB', 'JFtJY', 'BTIyW', 'DlEGp', 'qoztr', 'ytmp4', 'vqphu', 'voice', 'fs-ex', " ul >", 'VfuWn', 'qwtjc', 'EZxSi', 'tbqfQ', 'GEfqi', 'DOWNL', 'jKReF', 'TgOkz', "d lel", 'title', 'downl', " ᴍᴜʟᴛ", 'rqibt', 'qXqZh', 'ytsea', 'des', 'ube/y', 'LvxYt', 'Enter', 'song2', 'uPCMD', "ture ", 'MpeSO', 'tyQcL', 'utube', 'FHIgL', 'gVDYs', '2311a', 'HCChc', 'KiLhP', 'necFh', 'ytdoc', 'WlPeC', " belo", 'RsHOs', "A MD ", 'rm-ur', " Yout", 'gpflv', 'sBTUc', 'YvTya', 'WPjyq', 'link', 'DPTus', 'VtxnQ', '```72', 'fHVqN', " url>", 'crkFH', 'jMPgS', 'dzRWn', "ENT Q", "d any", 'flKyT', 'QZMYK', 'ᴛᴇʀ:*', '1168659tBRGoZ', 'YRJff', "rom m", "The b", 'ObUvV', "ᴇ: ", '```48', "ාගත න", 'TNWzA', 'CYJTh', "\n\n*◯─", 'ANvVL', '─────', 'dCbxQ', 'WYYDU', ':(*', 'gjYoS', 'ount', 'Xvakl', 'SDBeO', 'RHiMZ', 'https', "ype v", 'QgORm', 'cheer', " VIDE", 'NUvcF', 'VzmbB', "o upl", 'AMAyf', 'KjcOF', 'GPSTv', 'relea', 'url', 'yts', 'aCdyA', " | ", 'dPTZZ', '𝗗𝗲𝘀𝗰𝗿', '```24', 'lsocM', "\n*👁️‍🗨️ V", 'WOnHA', 'ownlo', 'EyOso', 'YYXxM', 'where', 'akwgH', 'ube.', 'EsEgY', 'REtEy', 'AvtXx', 'IiWWM', 'yYiWO', 'CvXLQ', "r !!*", '108p', 'RrKpI', 'habGH', 'fKcuF', 'mimet', 'wspdD', 'UIhxa', 'Error', 'NDTjM', "YTDL\n", 'ᴜʟᴛ:*', 'GTfJK', 'MeUlr', 'value', 'xpyVY', 'ybczU', "IDEO ", 'MylqY', '```10', 'arch', 'wZAAc', 'UNDCL', 'GWHHk', "👨‍💻]\n\n*", "r > t", 'IFOOx', 'MomtA', '```36', 'brcAt', '6d881', 'PSnCw', "go :*", 'ොහැකි', 'ntsLP', 'FZvAw', 'rbfHR', 'lfgWp', 'MXdrH', "OUD D", "ම bot", " \n\n└─", 'DITZR', '48944xMAtNR', '#dlMP', 'KjwkH', 'QYkVR', "ed so", 'POST', "_\n⏳ *", 'qjtli', 'MoMcE', 'BxVxp', 'ᴏᴡᴇʀᴇ', ".yts ", 'ᴊɪʀᴀ-', 'OYwNk', 'write', " bot ", 'ubKeW', 'XTxaD', 'phtOc', 'mxGpl', 'GWnHL', 'd(3)', 'ype', "📽️ *ᴠᴀ", 'ZZBLe', 'JxLVF', 'AajLs', ") App", 'key', 'fIOpN', 'irwlh', 'ʀᴀ-ᴍᴅ', 'dbbIa', 'BpLXO', "```🔢 ", 'Win64', 'bBtPi', 'DfxPV', 'ewCwT', 'ena', " ලබා ", 'aqGqe', 'ad.ph', 'f90ca', 'nQXwi', 'rLxTm', "[👨‍💻 ＶＡ", 'watch', 'me/95', 'nJoaM', 'nBtvp', "own C", '59797', 'AlbZG', '𝗧𝗶𝗺𝗲*', 'OsoUa', 'iHaZT', " a fe", 'wJBqY', 'each', '.mp4', '8f78d', 'FXatJ', 'wZMAi', 'HAKsC', '://m.', "ent t", 'hlBtK', "form ", 'ujpWI', 'frRoV', "t fin", 'TPUUu', 'cIeUW', '72ncKCzn', 'ECPxo', 'MalJO', 'YGvbC', "a > d", 'inrl-', 'song', 'jDgXY', 'pdmJG', "T SON", '0p```', 'msENn', 'Mginl', 'messa', 'ivPPm', 'iews:', '37.36', 'nknWh', 'catio', 'mhNAq', 'patte', 'qhLkp', 'youtu', 'oABlK', 'ytmp3', 'LZnGS', 'PmkLL', "48p ", "3 <yt", "\n🎶 *𝗧", 'vMxax', 'sjBKl', 'trim', 'ds!``', 'split', 'rydSO', 'ZjKwp', " බාගත", '.col-', 'FbAfF', 'QSJCl', 'rnqMe', 'JzIoh', "ʀᴀ ᴍᴅ", 'ZEkhl', "on:* ", 'cUYCy', 'TtCnp', 'sMIAm', 'qNfUZ', 'VabYj', "ble >", 'fgRqn', 'w.you', " link", 'kFMou', 'mfUah', 'atgCd', '://gi', 'ecko)', 'hWNCi', 'BWkAR', 'foote', "ed Na", " and ", "aud ", 'tamp', 'mand', '36p', 'cEzMF', 'iMeUm', "👨‍💻]\n*S", '?v=', 'EQbpr', 'XOJlk', 'AwUTo', 'log', 'voCyB', 'YrIYT', 'ᴀᴅᴇʀ*', "l typ", 'toStr', 'rzSUr', '421fc', 'DdqPl', "*\n*🎻 ", "𝗲𝗹*: ", 'WJzfO', 'LWJWy', "    1", 'UKCxA', 'formD', "ɪᴄᴀʟ ", 'mcmrK', 'yBrBm', "> pic", 'IfhSB', 'ycYVq', 'LDnDT', 'WiVlM', 'Media', 'main/', 'ction', "ike G", '8c3e5', "​​​​ ", 'RHxZc', 'oTLqh', 'QhXAE', " වෙන ", 'SVUBT', 'qwDuh', '60073', 'nPVeY', 'PodBT', 'ᴇǫᴜᴇꜱ', '38.69', '64908', 'WeyLU', 'all', " div ", "ɪᴄᴇ ʙ", 'TYPE*', "c <yt", '@boch', 'pFAIy', "It do", 'UQCTv', "මට මෙ", " කරයි", 'EdOkJ', 'Jfhxq', 'cloud', 'vWdgO', " *SEL", 'oSamS', 'yta', 'imYlk', "👨‍💻]\n\n ", 'hTnQp', 'BQQBS', 'NaONx', 'oncli', 'fFMOP', 'hGKsc', '/raw/', "D YTD", " this", '```Pl', 'XMhGp', 'QexHw', '360p', 'VyVuF', "s බාග", "e son", 'kJTRS', 'resen', 'aLuVk', 'NdhdJ', 'foDXb', 'JWcCY', '7cd39', 'GeGta', 'tdl-c', 'dclou', 'Norma', '9d52e', " TYPE", 'POIWY', 'xtKkl', 'calip', 'use', 'yjUPs', 'ajpXM', 'MhanI', 'quote', 'EuGrH', '.mp3', 'mPkeE', "w wor", 'essag', "t eno", '-chil', "f the", '120KCLqtZ', 'be.', '*Erro', 'Reply', 'MAGAS', "\n*🕘 D", 'ZKwny', 'ප්‍රමාන', " NT 1", 'fMpuG', 'Docum', '/mpeg', 'ptt', "📽️\n\n┌─", 'iptio', 'nk]', 'rDPoy', 'JCaAl', 'jJves', 'data', 'pTcTd', '329093TneuEZ', 'ADER*', 'bIXPd', 'docum', "\n*🔗 U", 'songs', 'vYlsw', " size", 'lVRRm', 'FUfGI', 'ියන්න', " කිරී", 'ුණාකර', 'bNKfB', 'OWNLO', 'XLafK', 'd(2)', 'EHduM', " DOWN", 'ww-fo', "> img", 'jNQnB', 'tzNzz', 'bc68f', 'Rbjck', '*ᴠᴀᴊɪ', 'LJxng', 'VIDEO', 'දෙන්න', 'qzZbf', 'oHAam', 'lengt', 'CUyet', '*ERRO', '𝗶𝘁𝗹𝗲*', 'numbe', 'push', 'khpJP', 'cEcTY', 'ිසිවක', 'bZYje', ".yt [", "ML, l", " Chro", 'qFOZZ', 'CLkbn', "108p ", "*\n\n*◯", 'ory', 'typin', 'UqPcy', '0c37', 'map', 'gmZwX', 'jsFDa', " song", 'toFix', "💻 *VA", 'ZKBSi', " plat", 'ytvid', "ng ty", "\n*📺 D", 'SYFSx', 'OHYTu', 'mp3', 'lenco', 'qWmwU', "*[1] ", 'match', "ong 📁", "sted ", "le:* ", 'VvuEq', 'AjDtR', 'ri/53', 'ist', "_\n🔗 *", 'ZWMxv', 'ezAbO', 'HEWID', 'kAkBa', 'HgzTR', 'TAXWH', "ᴇʟ: ", 'zuLJP', 'video', '/vide', 'leWeb', 'wBXFg', 'Ppsjr', '.soun', 'KOmyt', 'IhwEn', 'nMuQH', "\n*📌 A", 'OMNxX', 'xLdYM', 'ᴅᴇᴏ-ᴅ', '𝗩𝗶𝗲𝘄𝘀', "ply b", 'WbSjb', 'mYhcj', 'llCOS', 'kOYYv', '166910bCxxdg', '@dist', 'vrLID', 'fYzOl', 'ctsZI', "_\n👁️‍🗨️ *", " වචන ", 'KhcXz', 'IBnwn', 'oadFi', "\n\n*📱 ", 'zBRHm', 'smMWM', 'YFoNq', 'cLzsw', 'jAbOn', 'IqrDC', "y > t", 'cuzkF', 'vfDUG', 'fEfnw', "ත කරය", " file", 'RxDut', 'pload', '*𝗧𝗶𝘁𝗹', 'resul', 'AfEwZ', 'YAwLM', 'SRHwy', '67dfd', "> VAJ", 'JbHHE', 'rhYdM', "MD YT", "oad s", 'Fkjwo', 'thumb', 'XsfWK', "*\n🔗 ", 'QrSIL', 'iBVbE', 'ore', '🎞️', 'autho', '1007924sPzWJP', 'LOADE', 'tvid', "  *SE", "Y 📂*", 'UvbqZ', 'TJaUI', 'ing', "O TYP", "me:* ", 'la/5.', 'w.kli', 'rnweT', 'viRTF', 'kWIUt', "ease ", 'TnMGM', 'VXMoh', 'artis', 'TyTmR', 'href', 'YCfkH', 'oad', 'oujoP', 'kcixC', '​​​​​', "se gi", "ls fr", '7.36', 'qxPBW', " Safa", 'nail', 'kYidB', 'BUwdd', 'jiVCs', 'QUNnd', '37814aWgmkT', 'HfoET', "com 📲", 'GnjSg', "ve me", "ong 📂", '6dcfe', 'filen', '240p', 'buXyN', 'ᴛᴇᴄʜɴ', " host", 'qRqZd', 'TLxmW', 'UjBxc', '69d1c', 'dvnfa', 'VAJIR', 'PbFJn', "oo bi", 'CCyeD', 'ZqGhX', 'gLezr', 'image', 'DGTZT', 'rjSfG', 'd:nth', 'LgCfO', 'vcVBz', 'yt-se', 'GHPTH', 'QFDab', 'RgkUw', 'uphKL', 'react', "rl:* ", 'qUNnr', 'SELEC', " එක u", 'කරයි.', 'appli', 'butto', 'lEyhg', "ube u", 'ch?q=', 'qCGBg', "lg-8 ", 'play', 'laMD-', 'ELECT', 'sendP', 'PtCah', 'cUDng', 'lUTsB', 'IpWmi', 'fHhVv', "✏️ ʀᴇꜱ", 'GzLog', "> div", 'NkEvc', 'lFFkj', 'name', 'tTgpJ', 'otqxJ', 'acONn', 'UyVEo', 'RqUjy', '710c0', '55097', "0.0; ", 'ObSii', '/shor', "එය so", " එකක්", 'taud', 'hNdDg', "ount ", 'BetAl', 'TY*', "div >", "කේ ba", 'qqZiS', 'ons', 'sxKXk', 'iCYUF', " *🖲️", 'nn/Di', "doc ", 'outub', 'undcl', 'c3820', '𝗟𝗶𝗻𝗸*', 'fileN', 'mmRdg', 'dl_ur', 'com/w', 'skQab', 'recor', "ype s", "ONG 🎙️", 'KoGow', 'axios', 'adila', 'hvxrX', 'thing', "w num", '8c4e5', 'bedl', '_This', 'KLrBT', 'yuMmR', "36p ", "LECT ", "me :*", '───◯*', 'WQPrj', 'blFXB', 'hCgOx', " lele", 'loud.', 'ᴄʏʙᴇʀ', 'AfTed', "orm එ", " විය ", '1837WvHLTb', "LITY ", "_\n👤 *", 'gvEBo', 'vKXUd', 'audio', 'vhTXf', 'ilFID', '48p', 'WiTcC', 'ytv', 'wpTNg', 'ding', 'ljdhm', 'nXBul', 'MDDEr', 'ᴏᴛ:ᴠ-', 'nynBI', 'src', '80p``', 'XvVGj', 'aud', 'pBopk', 'YoczH', "from ", 'DRMzi', 'Searc', 'jApMD', "oad v", 'kwqoC', 'VVxAm', 'mfYxI', 'jbcab', "taud ", 'Kit/5', 'CGiqA', " div", "is no", 'sound', 'ongs', 'KhAGw', "*I co", 'smpyb', 'uzwwj', '../se', "*[2] ", '.com', 'UccsT', 'xZHLK', 'iltea', 'bvWNr', 'ɪ-ᴅᴇᴠ', 'bDunN', 'abzsM', 'ame', 'vgAaz', 'hFLOn', "තින් ", "ɪ*\n*ᴘ", 'LANG', "24p ", 'kZpBy', "iv > ", 'uILdJ', 'ile!*', 'oundc', 'XuMiV', 'GudAf', 'oFSzT', 'yUqQj', 'tting', 'JYYTD', 'heade', 'FIkQV', "his f", "ᴍᴅ ᴠɪ", 'UdReF', 'UPYQH', 'views', 'dOTXC', "elow ", 'fpOUQ', "ongs ", '.0.46', "ou ne", '/sear', 'nFktS', "72p ", 'rch', 'nt-ty', 'QHfpl', "𝗲*: _", '/song', 'nGhsy', 'Downl', 'reque', 'jtaZj', 'dvHjl', '54e3', 'plYaJ', 'kghUp', 'JNadj', " !!\n\n", 'attr', 'iSOuZ', "*මට ක", "d(1) ", 'fOWUx', 'yMCVb', '64a1e', 'egldT', " tbod", 'label', "- ＭＤ ", 'tIyZW', 'MrBHx', " :(*", 'NtAQu', 'HtgJI', 'cqwft', 'DL*', 'invuA', 'statu', 'get', " get ", 'ckaud', "ideo ", 'JluCe', 'Youtu', "480p ", "h එක ", 'Resul', 'ᴏᴡɴʟᴏ', 'iXrDh', 'aNKWo', 'TOAcx', 'xJHxB', "_\n📝 *", 'OLxkW', 'SXfkw', 'reply', 'desc', 'njNKS', 'descr', "low n", 'VoEJe', 'KXFVD', 'taud3', 'ouPND', "le('", '...*', 'OvqzM', 'iWOwf', 'xoFyn', 'shrUr', 'detai', 'ago', '://ww', 'mandL', "e url", 'BWdJH', 'QQaMz', 'wVVjN', '𝗖𝗵𝗮𝗻𝗻', " yout", 'GGMrl', "ＪＩＲＡ ", 'NORMA', '/mp4', 'wnloa', 'gxWDq', 'HbmrK', "ɢ ɴᴀᴍ", "tvid ", '.co/d', "dth o", '𝗔𝗴𝗼*:', 'FBnFW', 'cMeHC', 'categ', "arch ", "G TYP", "m m.s", '720p', "h and", '.vide', '────◯', 'arUDk', 'OYyia', 'Follo', 'yrtCG', 'HSodh', "ugh t", 'yvEUz', 'sDHlZ', 'knBJI', "720p ", 'b099d', "*: _", "; x64", 'qWuuT', 'secti', 'RfOMm', 'ytson', 'LMSdY', 'xzJpH', 'load', "oad y", 'psHHT', 'GwKOH', '*Plea', 'ෙතින්', 'Iymog', 'ivdNe', 'TbNPI', 'AhKuT', 'text', 'TaIZq', 'JxVUV', '480p', 'baQbT', 'nMraQ', '🎶*', '```32', 'b/fun', '```කර', "be se", 'jhMaL', 'ideos', 'CzVYo', '*🎬📥VA', 'platf', " *මෙම", 'ent', "OAD V", 'XxEPn', 'TTEkF', 'khayv', "SONG ", 'HlqWc', 'sCuEF', 'RPKPA', 'nText', '://yo', 'Jqmyo', 'XRYjk', "යක් ල", 'b/com', "is ho", '.ytmp', 'qJcBf', "JIRA ", 'hLMFS', 'arlsY', 'conte', 'inclu', 'IsUBp', "R !!*", 'ZGcku', 'rylXE', "​​​ *", 'YQbHp', " from", 'ynIJD', 'thub.', "L QUA", 'ILlwa', 'RJXJc', 'BJzTa', 'pYLiM', 'FoGtP', 'nzuxG', 'SwkeK', "──\n\n*", "g_\n​​", 'selec', 'sAPEd', 'eakEU', 'ItJBa', 'qopbZ', '1080p', 'ELPzS', 'YAWej', "ැත !*", 'jVfIi', " සහ s", "බාගත ", 'EFSqA', " > di", 'ACBkN', 'EhRGw', 'opxVx', 'GERnR', "*📚 Na", "ngs f", 'LvGCS', '.song', 'xMNlr', 'ceUpd', 'ddCom', "  *SO", 'ndwit', "rom s", 'yUTLO', 'lelen', 'pmtPx', 'dPjSY', 'FOOTE', 'umber', "240p ", "OAD S", "o lel", "L\n\n🎶 ", 'zAEof', "ult f", 'onHix', "oad t", 'dwxwk', 'm/scr', 'vxMSQ', 'ndows', 'NTHET', " (KHT", 'ded', 'QUALI', 'NtokX', 'dontA', '*කරුණ', 'RdxeA', 'aria-', 'ZHWAs', 'times', 'GTWAZ', '72p', 'tube.', '_[Res', 'qkxbH', 'CTXRu', 'h-api', 'api-d', " > ta", "🔢 Rep", 'qHmXu', 'hGwAD', 'MZMvp'];
  _0x5664 = function () {
    return _0x293b39;
  };
  return _0x5664();
}
_0x3c92ca.pattern = "1080p";
_0x3c92ca.react = "📽️";
_0x3c92ca.dontAddCommandList = true;
_0x3c92ca.filename = __filename;
cmd(_0x3c92ca, async (_0x1ce0cf, _0x23bcea, _0x5987ba, {
  from: _0x3c0946,
  q: _0x5e6884,
  reply: _0x3b83c3
}) => {
  try {
    if (!ytreg(_0x5e6884)) {
      return await _0x3b83c3(urlneed);
    }
    const _0x3d5d96 = await dl.youtubedl(_0x5e6884);
    const _0x5c0a0f = {
      quoted: _0x5987ba
    };
    let _0xa18d0 = await _0x1ce0cf.sendMessage(_0x3c0946, {
      'video': {
        'url': await _0x3d5d96.video["1080p"].download()
      },
      'caption': config.FOOTER
    }, _0x5c0a0f);
    const _0x170bbe = {
      text: '🎥',
      key: _0xa18d0.key
    };
    const _0x132eb7 = {
      react: _0x170bbe
    };
    await _0x1ce0cf.sendMessage(_0x3c0946, _0x132eb7);
  } catch (_0x3d331d) {
    _0x3b83c3(N_FOUND);
    l(_0x3d331d);
  }
});
const _0x133208 = {
  pattern: "24p",
  react: "📽️",
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x133208, async (_0x2546f3, _0xd6491b, _0x311fc4, {
  from: _0x14abfa,
  q: _0x198ea6,
  reply: _0x130313
}) => {
  try {
    if (!ytreg(_0x198ea6)) {
      return await _0x130313(urlneed);
    }
    const _0x18f19d = await dl.youtubedl(_0x198ea6);
    const _0x4bd5f3 = {
      quoted: _0x311fc4
    };
    let _0x5d8178 = await _0x2546f3.sendMessage(_0x14abfa, {
      'document': {
        'url': await _0x18f19d.video["240p"].download()
      },
      'fileName': "video.mp4",
      'mimetype': "video/mp4",
      'caption': config.FOOTER
    }, _0x4bd5f3);
    const _0xf838c6 = {
      text: '🎥',
      key: _0x5d8178.key
    };
    const _0xbd499 = {
      react: _0xf838c6
    };
    await _0x2546f3.sendMessage(_0x14abfa, _0xbd499);
  } catch (_0x686585) {
    _0x130313(N_FOUND);
    l(_0x686585);
  }
});
const _0x48e92f = {
  pattern: "36p",
  react: "📽️",
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x48e92f, async (_0x347586, _0x18771b, _0x57bb42, {
  from: _0x159f0f,
  q: _0x176663,
  reply: _0x4e06f1
}) => {
  try {
    if (!ytreg(_0x176663)) {
      return await _0x4e06f1(urlneed);
    }
    const _0x48c642 = await dl.youtubedl(_0x176663);
    const _0x2e3989 = {
      quoted: _0x57bb42
    };
    let _0xecd782 = await _0x347586.sendMessage(_0x159f0f, {
      'document': {
        'url': await _0x48c642.video["360p"].download()
      },
      'fileName': "video.mp4",
      'mimetype': "video/mp4",
      'caption': config.FOOTER
    }, _0x2e3989);
    const _0x2f889a = {
      text: '🎥',
      key: _0xecd782.key
    };
    const _0x47294e = {
      react: _0x2f889a
    };
    await _0x347586.sendMessage(_0x159f0f, _0x47294e);
  } catch (_0x40b7d2) {
    _0x4e06f1(N_FOUND);
    l(_0x40b7d2);
  }
});
const _0x1ba950 = {
  pattern: "48p",
  react: "📽️",
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x1ba950, async (_0x2e2423, _0x4f5101, _0x3e163d, {
  from: _0x53a793,
  q: _0x2007b8,
  reply: _0x4a64f0
}) => {
  try {
    if (!ytreg(_0x2007b8)) {
      return await _0x4a64f0(urlneed);
    }
    const _0x52c408 = await dl.youtubedl(_0x2007b8);
    const _0x398f9b = {
      quoted: _0x3e163d
    };
    let _0x50d083 = await _0x2e2423.sendMessage(_0x53a793, {
      'document': {
        'url': await _0x52c408.video["480p"].download()
      },
      'fileName': "video.mp4",
      'mimetype': "video/mp4",
      'caption': config.FOOTER
    }, _0x398f9b);
    const _0x2b2d42 = {
      text: '🎥',
      key: _0x50d083.key
    };
    const _0x530bfd = {
      react: _0x2b2d42
    };
    await _0x2e2423.sendMessage(_0x53a793, _0x530bfd);
  } catch (_0x342e06) {
    _0x4a64f0(N_FOUND);
    l(_0x342e06);
  }
});
const _0x54a244 = {
  pattern: "72p",
  react: "📽️",
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x54a244, async (_0x434652, _0x3e44cd, _0x40b68b, {
  from: _0x1b644d,
  q: _0x348392,
  reply: _0x4591f8
}) => {
  try {
    if (!ytreg(_0x348392)) {
      return await _0x4591f8(urlneed);
    }
    const _0x1913f8 = await dl.youtubedl(_0x348392);
    const _0x3c19a4 = {
      quoted: _0x40b68b
    };
    let _0x193ce3 = await _0x434652.sendMessage(_0x1b644d, {
      'document': {
        'url': await _0x1913f8.video["720p"].download()
      },
      'fileName': "video.mp4",
      'mimetype': "video/mp4",
      'caption': config.FOOTER
    }, _0x3c19a4);
    const _0x48cc14 = {
      text: '🎥',
      key: _0x193ce3.key
    };
    const _0x2ab0e4 = {
      react: _0x48cc14
    };
    await _0x434652.sendMessage(_0x1b644d, _0x2ab0e4);
  } catch (_0x440a56) {
    _0x4591f8(N_FOUND);
    l(_0x440a56);
  }
});
const _0x3dd791 = {
  pattern: "108p",
  react: "📽️",
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x3dd791, async (_0x7c58ac, _0x36b316, _0x166b1f, {
  from: _0x20b843,
  q: _0x14b537,
  reply: _0x4b0348
}) => {
  try {
    if (!ytreg(_0x14b537)) {
      return await _0x4b0348(urlneed);
    }
    const _0x515688 = await dl.youtubedl(_0x14b537);
    const _0x1ef152 = {
      quoted: _0x166b1f
    };
    let _0x107ba5 = await _0x7c58ac.sendMessage(_0x20b843, {
      'document': {
        'url': await _0x515688.video["1080p"].download()
      },
      'fileName': "video.mp4",
      'mimetype': "video/mp4",
      'caption': config.FOOTER
    }, _0x1ef152);
    const _0x5341a5 = {
      text: '🎥',
      key: _0x107ba5.key
    };
    const _0x1f7bf4 = {
      react: _0x5341a5
    };
    await _0x7c58ac.sendMessage(_0x20b843, _0x1f7bf4);
  } catch (_0x3584fc) {
    _0x4b0348(N_FOUND);
    l(_0x3584fc);
  }
});
