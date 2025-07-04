//Fri Jul 04 2025 08:02:00 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
NAME = "潮新闻";
VALY = ["cxwck"];
CK = "";
LOGS = 0;
usid = 0;
channel = ["5d8b4d25cf8dfd0001a4143c", "63e60cad5476b20001d52d62", "64aca9f66f72320001b4d2af", "63e60cc814892e00016b1592", "6402c6e4cb7a930001d0d39f", "5d8c0fc2ffebf500014a771a", "63e7343914892e00016b1594", "5d8c0fa4ffebf500014a7718", "5d8c0f67ffebf500014a7715", "63e734705476b20001d52d64", "63e73497edaf550001ff9489"];
var 自定义_0x29c897 = require("jsrsasign");
const 自定义_0x556b11 = require("crypto-js");
nowhour = Math.round(new Date().getHours()).toString();
Notify = 1;
class 自定义_0x10f096 {
  constructor(_0x1c0e3d) {
    this.phone = _0x1c0e3d.split("#")[0];
    this.pwd = $.RSA(_0x1c0e3d.split("#")[1], "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD6XO7e9YeAOs+cFqwa7ETJ+WXizPqQeXv68i5vqw9pFREsrqiBTRcg7wB0RIp3rJkDpaeVJLsZqYm5TW7FWx/iOiXFc+zCPvaKZric2dXCw27EvlH5rq+zwIPDAJHGAfnn1nmQH7wR3PCatEIb8pz5GFlTHMlluw4ZYmnOwg+thwIDAQAB");
    this.message = "";
    this.did = "00000000-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-0000-0000" + $.SJS(8, 1);
    this.logs = true;
  }
  async ["login"]() {
    let _0x2d2647 = encodeURIComponent(this.pwd);
    let _0x18b8aa = $.SJS(8, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(12, 1);
    let _0x1fa89f = "post%%/web/oauth/credential_auth?client_id=44&password=" + this.pwd + "&phone_number=" + this.phone + "%%" + _0x18b8aa + "%%";
    let _0x4502f6 = $.signature(_0x1fa89f);
    let _0x4221ec = {
      "X-REQUEST-ID": _0x18b8aa,
      "X-SIGNATURE": _0x4502f6
    };
    let _0x14b5f4 = "client_id=44&password=" + _0x2d2647 + "&phone_number=" + this.phone;
    let _0x497da1 = await $.task("post", "https://passport.8531.cn/web/oauth/credential_auth", _0x4221ec, _0x14b5f4);
    if (_0x497da1.code == 0) {
      this.logs = true;
      let _0x6ca6c6 = _0x497da1.data.authorization_code.code;
      await this.logins(_0x6ca6c6);
    } else {
      {
        this.logs = false;
      }
    }
  }
  async ["logins"](_0x45dab7) {
    let _0x21c1ae = $.time(13);
    let _0x5134c4 = $.SJS(8, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(12, 1);
    let _0x3d4131 = "/api/account/auth_login&&65d9e9d1ec7d170001d1e994&&" + _0x5134c4 + "&&" + _0x21c1ae + "&&cK1!dJ0&aA0";
    let _0x167711 = $.SHA_Encrypt(1, "SHA256", _0x3d4131);
    let _0x19caf5 = {
      "X-SESSION-ID": "65d9e9d1ec7d170001d1e994",
      "X-REQUEST-ID": _0x5134c4,
      "X-SIGNATURE": _0x167711,
      "X-TIMESTAMP": _0x21c1ae,
      "User-Agent": "zjolapp; 6.0.0; " + this.did + ";"
    };
    let _0xf4c0da = "auth_type=user_pwd&code=" + _0x45dab7 + "&union_id=vQrNehpK%2FuAnyuWA00caqA%3D%3D&auth_uid=vQrNehpK%2FuAnyuWA00caqA%3D%3D&check_token=QjqLKRsYb5OoTlmi7R%2BMVU%2BWLTJ857fM6VkZ5w%3D%3D";
    let _0x22f816 = await $.task("post", "https://app-api.zjol.com.cn/api/account/auth_login", _0x19caf5, _0xf4c0da);
    if (_0x22f816.code == 0) {
      {
        this.name = _0x22f816.data.account.nick_name;
        this.sessionid = _0x22f816.data.session.id;
        this.uid = _0x22f816.data.account.id;
        this.authuid = _0x22f816.data.account.auth_uid;
        console.log("【" + this.name + "】登陆成功，现有总积分" + _0x22f816.data.account.total_score);
      }
    }
  }
  async ["tasklist"]() {
    let _0x1b8357 = {
      mobile: this.phone,
      sessionId: this.sessionid,
      "User-Agent": "Mozilla/5.0 (Linux; Android 13; 2211133C Build/TKQ1.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/104.0.5112.97 Mobile Safari/537.36; ; zjolapp; 5.3.1; " + this.did + "; 2211133C 20,9; Android; 13; zh; xiaomi",
      accountId: this.uid
    };
    let _0xf60db9 = await $.task("get", "https://qy.zjol.com.cn/tmmobile/api/bole/init?", _0x1b8357);
    if (_0xf60db9.code == 200) {
      for (let _0x313401 of _0xf60db9.data.taskList) {
        _0x313401.taskStatus == 0 && (this.taskid = _0x313401.taskId, await this.starttask(this.taskid));
        _0x313401.taskContent == "今日点赞赢现金" && _0x313401.taskStatus == 1 && (await this.like());
        _0x313401.taskContent == "今日评论赢现金" && _0x313401.taskStatus == 1 && (await this.commentlist());
      }
    }
  }
  async ["starttask"](_0x3ade48) {
    let _0x57e43e = {
      mobile: this.phone,
      sessionId: this.sessionid,
      "User-Agent": "Mozilla/5.0 (Linux; Android 13; 2211133C Build/TKQ1.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/104.0.5112.97 Mobile Safari/537.36; ; zjolapp; 5.3.1; " + this.did + "; 2211133C 20,9; Android; 13; zh; xiaomi",
      accountId: this.uid
    };
    let _0x14bccd = "{\"taskId\":" + _0x3ade48 + "}";
    let _0x5f2f29 = await $.task("post", "https://qy.zjol.com.cn/tmmobile/api/bole/getTask", _0x57e43e, _0x14bccd);
    await this.tasklist();
  }
  async ["readlist"]() {
    let _0x4d0428 = $.randomArr(channel);
    let _0x1119d6 = $.time(13);
    let _0x3272cd = $.SJS(8, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(12, 1);
    let _0x3fcf31 = "/api/article/channel_list&&64c0beaaaf8f0d000185182a&&" + _0x3272cd + "&&" + _0x1119d6 + "&&cK1!dJ0&aA0";
    let _0x237b65 = $.SHA_Encrypt(1, "SHA256", _0x3fcf31);
    let _0x5f1d67 = {
      "X-SESSION-ID": "64c0beaaaf8f0d000185182a",
      "X-REQUEST-ID": _0x3272cd,
      "X-SIGNATURE": _0x237b65,
      "X-TIMESTAMP": _0x1119d6,
      "User-Agent": "zjolapp; 5.3.1; " + this.did + ";"
    };
    let _0x338d09 = await $.task("get", "https://app-api.zjol.com.cn/api/article/channel_list?list_count=0&recommend_switch=true&channel_id=" + _0x4d0428, _0x5f1d67);
    if (_0x338d09.code == 0) {
      {
        this.bb = _0x338d09.data.article_list;
      }
    }
  }
  async ["readdetail"]() {
    this.mlfid = this.bb[$.RT(0, 9)].id;
    let _0x2e0e24 = $.time(13);
    let _0x42e091 = $.SJS(8, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(12, 1);
    let _0x2928a2 = "/api/article/detail&&" + this.sessionid + "&&" + _0x42e091 + "&&" + _0x2e0e24 + "&&cK1!dJ0&aA0";
    let _0x3fbb38 = $.SHA_Encrypt(1, "SHA256", _0x2928a2);
    let _0x3de5a4 = {
      "User-Agent": "zjolapp; 5.3.1; " + this.did + ";",
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x42e091,
      "X-TIMESTAMP": _0x2e0e24,
      "X-SIGNATURE": _0x3fbb38
    };
    let _0x51ffff = await $.task("get", "https://app-api.zjol.com.cn/api/article/detail?top_id=&id=" + this.mlfid + "&from_channel=&refer_from=", _0x3de5a4);
    if (_0x51ffff.code == 0) {
      {
        await $.wait($.RT(8000, 15000));
      }
    }
  }
  async ["like"]() {
    await this.readlist();
    await this.readdetail();
    let _0x258422 = $.time(13);
    let _0x126b0b = $.SJS(8, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(12, 1);
    let _0x5835af = "/api/favorite/like&&" + this.sessionid + "&&" + _0x126b0b + "&&" + _0x258422 + "&&cK1!dJ0&aA0";
    let _0x8f4ac7 = $.SHA_Encrypt(1, "SHA256", _0x5835af);
    let _0x2ab920 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x126b0b,
      "X-SIGNATURE": _0x8f4ac7,
      "X-TIMESTAMP": _0x258422,
      "User-Agent": "zjolapp; 5.3.1; " + this.did + ";"
    };
    let _0x49b4a6 = "activity_id=2&action=true&task_id=203&id=" + this.mlfid;
    let _0xd4652a = await $.task("post", "https://app-api.zjol.com.cn/api/favorite/like", _0x2ab920, _0x49b4a6);
    if (_0xd4652a.code == 0) {
      console.log("【" + this.name + "】点赞成功");
      await this.tasklist();
    } else {
      {
        await this.tasklist();
      }
    }
  }
  async ["comment"](_0x5e9295, _0x54141e) {
    await this.readlist();
    let _0x443546 = $.time(13);
    let _0x19f49f = $.SJS(8, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(12, 1);
    let _0x41a6e1 = "/api/comment/create&&" + this.sessionid + "&&" + _0x19f49f + "&&" + _0x443546 + "&&cK1!dJ0&aA0";
    let _0x3d0194 = $.SHA_Encrypt(1, "SHA256", _0x41a6e1);
    let _0x23d323 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x19f49f,
      "X-SIGNATURE": _0x3d0194,
      "X-TIMESTAMP": _0x443546,
      "User-Agent": "zjolapp; 5.3.1; " + this.did + ";"
    };
    let _0xc21ac6 = "activity_id=2&task_id=202&channel_article_id=" + _0x5e9295 + "&comment_level=1&content=" + _0x54141e;
    let _0x135968 = await $.task("post", "https://app-api.zjol.com.cn/api/comment/create", _0x23d323, _0xc21ac6);
    if (_0x135968.code == 0) {
      {
        console.log("【" + this.name + "】评论成功");
        await this.tasklist();
      }
    }
  }
  async ["commentlist"]() {
    await this.readlist();
    await this.readdetail();
    let _0x1581c9 = $.time(13);
    let _0x44631a = $.SJS(8, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(4, 1) + "-" + $.SJS(12, 1);
    let _0xca6b06 = "/api/comment/floor_list&&" + this.sessionid + "&&" + _0x44631a + "&&" + _0x1581c9 + "&&cK1!dJ0&aA0";
    let _0x30b2da = $.SHA_Encrypt(1, "SHA256", _0xca6b06);
    let _0xed2728 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x44631a,
      "X-SIGNATURE": _0x30b2da,
      "X-TIMESTAMP": _0x1581c9,
      "User-Agent": "zjolapp; 5.3.1; " + this.did + ";"
    };
    let _0x5374e8 = await $.task("get", "https://app-api.zjol.com.cn/api/comment/floor_list?start=" + _0x1581c9 + "&channel_article_id=" + this.mlfid, _0xed2728);
    if (_0x5374e8.data.comment_count < 3) {
      {
        await this.commentlist();
      }
    } else {
      let _0x7448ba = _0x5374e8.data.comment_list;
      let _0x490118 = _0x7448ba.length;
      let _0x55edf7 = _0x7448ba[$.RT(0, _0x490118)].content + "。" + _0x7448ba[$.RT(0, _0x490118)].content + "。" + _0x7448ba[$.RT(0, _0x490118)].content;
      await this.comment(this.mlfid, _0x55edf7);
    }
  }
}
$ = 自定义_0x3d0b59();
!(async () => {
  console.log(NAME);
  await $.ExamineCookie();
  await $.Multithreading("login");
  let _0x51c48f = $.cookie_list.filter(_0x2e7174 => _0x2e7174.logs == true);
  if (_0x51c48f.length == 0) {
    {
      console.log("Cookie格式错误 或 账号被禁封");
      return;
    }
  } else {
    await $.Multithreading("tasklist");
  }
  let _0x3c167e = [];
  for (let _0xb214c7 of $.cookie_list) {
    if (_0xb214c7.message) {
      _0x3c167e.push(_0xb214c7.message);
    }
  }
  if (_0x3c167e.length > 0) {
    await $.SendMsg(_0x3c167e.join("\n"));
  }
})().catch(_0x44ef25 => {
  console.log(_0x44ef25);
}).finally(() => {});
function 自定义_0x3d0b59() {
  return new class {
    constructor() {
      this.cookie_list = [];
      this.message = "";
      this.CryptoJS = require("crypto-js");
      this.NodeRSA = require("node-rsa");
      this.request = require("request");
      this.Sha_Rsa = require("jsrsasign");
    }
    async ["Multithreading"](_0x52e895, _0x3cac42, _0x2c6c3f) {
      let _0x15ce6f = [];
      !_0x2c6c3f && (_0x2c6c3f = 1);
      while (_0x2c6c3f--) {
        for (let _0x4651ab of $.cookie_list) {
          _0x15ce6f.push(_0x4651ab[_0x52e895](_0x3cac42));
        }
      }
      await Promise.allSettled(_0x15ce6f);
    }
    ["ExamineCookie"]() {
      let _0x2aee16 = process.env[VALY] || CK;
      let _0x3ab995 = 0;
      if (_0x2aee16) {
        for (let _0x41f52b of _0x2aee16.split("\n").filter(_0x260066 => !!_0x260066)) {
          $.cookie_list.push(new 自定义_0x10f096(_0x41f52b));
        }
        _0x3ab995 = $.cookie_list.length;
      } else {
        {
          console.log("\n【" + NAME + "】：未填写变量: " + VALY);
        }
      }
      console.log("共找到" + _0x3ab995 + "个账号");
      return $.cookie_list;
    }
    ["task"](_0xe6d6d0, _0x891211, _0x13f45c, _0x3861c8, _0x2712fa) {
      const _0xf8af4a = {
        UXHsJ: function (_0x29b12e, _0x5a718e) {
          return _0x29b12e + _0x5a718e;
        },
        MMHiv: function (_0x2e28bf, _0x367317) {
          return _0x2e28bf * _0x367317;
        },
        YMzXl: function (_0x259f04, _0x1b7c9d) {
          return _0x259f04 - _0x1b7c9d;
        },
        whcoI: function (_0x27d9a6, _0x475fb6) {
          return _0x27d9a6 * _0x475fb6;
        },
        lRIMJ: function (_0x3616f2, _0x4f9cb3) {
          return _0x3616f2(_0x4f9cb3);
        },
        bfBkS: function (_0x138f05, _0x240370) {
          return _0x138f05(_0x240370);
        },
        eUxmG: function (_0x90430c, _0x3c28e4) {
          return _0x90430c(_0x3c28e4);
        },
        Udyyj: function (_0x4ad3e4, _0x14f15c) {
          return _0x4ad3e4 < _0x14f15c;
        },
        fglDF: function (_0x2ae673, _0x49876d) {
          return _0x2ae673 < _0x49876d;
        },
        zRsQh: function (_0x2aa4c7, _0x9bd993, _0x45ffe4) {
          return _0x2aa4c7(_0x9bd993, _0x45ffe4);
        },
        Jrzrr: function (_0x55b5ee, _0xd3d9e5) {
          return _0x55b5ee * _0xd3d9e5;
        },
        Bjhpu: function (_0x27aa3f, _0xde8638) {
          return _0x27aa3f == _0xde8638;
        },
        xzMJi: function (_0x5b4d11, _0x480c58) {
          return _0x5b4d11 !== _0x480c58;
        },
        ujYJt: "FnGcK",
        YXCTG: function (_0x77bddb, _0x1e22d1) {
          return _0x77bddb + _0x1e22d1;
        },
        qQaUy: "JmLje",
        cDPrK: function (_0x4be72a, _0x19edb4) {
          return _0x4be72a === _0x19edb4;
        },
        ptpqC: "blnPR",
        syMVp: "SuEuD",
        PAuFN: function (_0x44b5f0, _0x339904) {
          return _0x44b5f0 != _0x339904;
        },
        IhRWf: function (_0x2b73db, _0x1e2d88) {
          return _0x2b73db === _0x1e2d88;
        },
        LZYRK: "sAgxS",
        PJZqV: "MfAJe",
        wCndx: function (_0x4aa16b, _0x59056a) {
          return _0x4aa16b === _0x59056a;
        },
        tJYUi: "wKcMG",
        DNpnc: "kiOfM",
        fLQnS: "   API请求失败，请检查网络重试\n",
        ZYXPJ: function (_0x3a1ffd, _0x5a3bc1) {
          return _0x3a1ffd(_0x5a3bc1);
        },
        ZLwBH: "node-rsa",
        oKJhP: "-----BEGIN PUBLIC KEY-----\n",
        XIPGh: "\n-----END PUBLIC KEY-----",
        ApxDZ: "pkcs1",
        FNYsZ: "base64",
        iVpyH: "utf8",
        nrmrK: function (_0x1629da, _0x526f62) {
          return _0x1629da < _0x526f62;
        },
        WraHh: "tMEnL",
        wQgNk: "KzOpq",
        tGHtJ: function (_0x1762db, _0x17fcf6) {
          return _0x1762db + _0x17fcf6;
        },
        KOPKT: "http://",
        tnOJi: function (_0x4cd5f4, _0x406a11) {
          return _0x4cd5f4 !== _0x406a11;
        },
        wypop: "mlyvS",
        rsQvT: "Mfwib",
        rSiQz: "proxy"
      };
      {
        _0xe6d6d0 == "delete" ? _0xe6d6d0 = _0xe6d6d0.toUpperCase() : _0xe6d6d0 = _0xe6d6d0;
        if (_0xe6d6d0 == "post") {
          {
            delete _0x13f45c["content-type"];
            delete _0x13f45c["Content-type"];
            delete _0x13f45c["content-Type"];
            $.safeGet(_0x3861c8) ? _0x13f45c["Content-Type"] = "application/json;charset=UTF-8" : _0x13f45c["Content-Type"] = "application/x-www-form-urlencoded";
            _0x3861c8 && (_0x13f45c["Content-Length"] = $.lengthInUtf8Bytes(_0x3861c8));
          }
        }
        _0xe6d6d0 == "get" && (delete _0x13f45c["content-type"], delete _0x13f45c["Content-type"], delete _0x13f45c["content-Type"], delete _0x13f45c["Content-Length"]);
        _0x13f45c.Host = _0x891211.replace("//", "/").split("/")[1];
        return new Promise(async _0x3a9ab2 => {
          if (_0xe6d6d0.indexOf("T") < 0) {
            {
              var _0x5b3c09 = {
                url: _0x891211,
                headers: _0x13f45c,
                body: _0x3861c8,
                proxy: "http://" + _0x2712fa
              };
            }
          } else {
            var _0x5b3c09 = {
              url: _0x891211,
              headers: _0x13f45c,
              form: JSON.parse(_0x3861c8),
              proxy: "http://" + _0x2712fa
            };
          }
          if (!_0x2712fa) {
            {
              delete _0x5b3c09.proxy;
            }
          }
          this.request[_0xe6d6d0.toLowerCase()](_0x5b3c09, (_0x591741, _0x36a24f, _0x4b2edf) => {
            try {
              if (_0x4b2edf) {
                if (LOGS == 1) {
                  console.log("================ 请求 ================");
                  console.log(_0x5b3c09);
                  console.log("================ 返回 ================");
                  if ($.safeGet(_0x4b2edf)) {
                    console.log(JSON.parse(_0x4b2edf));
                  } else {
                    {
                      console.log(_0x4b2edf);
                    }
                  }
                }
              }
            } catch (_0x4d72b6) {
              console.log(_0x4d72b6, _0x891211 + "\n" + _0x13f45c);
            } finally {
              {
                let _0x1de6d4 = "";
                if (!_0x591741) {
                  {
                    if ($.safeGet(_0x4b2edf)) {
                      _0x1de6d4 = JSON.parse(_0x4b2edf);
                    } else {
                      if (_0x4b2edf.indexOf("/") != -1 && _0x4b2edf.indexOf("+") != -1) {
                        _0x1de6d4 = _0x4b2edf;
                      } else {
                        {
                          _0x1de6d4 = _0x4b2edf;
                        }
                      }
                    }
                  }
                } else {
                  {
                    _0x1de6d4 = _0x891211 + "   API请求失败，请检查网络重试\n" + _0x591741;
                  }
                }
                return _0x3a9ab2(_0x1de6d4);
              }
            }
          });
        });
      }
    }
    ["signature"](_0x3a8906) {
      {
        let _0x298de3 = "Tc0RVJms1BDIqLELFdGd";
        let _0x25088f = $.HmacSHA_Encrypt(1, "HmacSHA256", _0x3a8906, _0x298de3);
        return _0x25088f;
      }
    }
    async ["SendMsg"](_0x1ac24e) {
      if (!_0x1ac24e) {
        return;
      }
      if (Notify == 1) {
        var _0x30d229 = require("./sendNotify");
        await _0x30d229.sendNotify(NAME, _0x1ac24e);
      }
    }
    ["lengthInUtf8Bytes"](_0xd4f10f) {
      {
        let _0x239664 = encodeURIComponent(_0xd4f10f).match(/%[89ABab]/g);
        return _0xd4f10f.length + (_0x239664 ? _0x239664.length : 0);
      }
    }
    ["randomArr"](_0x37d46b) {
      return _0x37d46b[parseInt(Math.random() * _0x37d46b.length, 10)];
    }
    ["wait"](_0x5776a6) {
      return new Promise(_0x471312 => setTimeout(_0x471312, _0x5776a6));
    }
    ["time"](_0x2131d2) {
      if (_0x2131d2 == 10) {
        {
          return Math.round(+new Date() / 1000);
        }
      } else {
        return +new Date();
      }
    }
    ["updateSignature"]() {
      {
        let _0x5e0c95 = "jiaxing";
        let _0x5dbba8 = $.SJS(32, 3);
        let _0x18b773 = $.time(13);
        let _0x2cd0cc = "bdcd70c1c7c3544a34c1a1d45b1fdef0";
        let _0x42b2dd = "" + _0x5e0c95 + _0x5dbba8 + _0x18b773 + _0x2cd0cc;
        let _0x4d9457 = $.MD5Encrypt(0, _0x42b2dd);
        var _0x8981b = _0x5e0c95 + ";" + _0x5dbba8 + ";" + _0x18b773 + ";" + _0x4d9457;
        return _0x8981b;
      }
    }
    ["timenow"](_0x1321b0) {
      let _0xb05a10 = new Date();
      if (_0x1321b0 == undefined) {
        let _0xbf3657 = new Date();
        let _0x5a173e = _0xbf3657.getFullYear() + "-";
        let _0x365988 = (_0xbf3657.getMonth() + 1 < 10 ? "0" + (_0xbf3657.getMonth() + 1) : _0xbf3657.getMonth() + 1) + "-";
        let _0x1a55df = _0xbf3657.getDate() + " ";
        let _0x4e56ff = _0xbf3657.getHours() + ":";
        let _0x24ad37 = _0xbf3657.getMinutes() + ":";
        let _0x20f2a = _0xbf3657.getSeconds() + 1 < 10 ? "0" + _0xbf3657.getSeconds() : _0xbf3657.getSeconds();
        return _0x5a173e + _0x365988 + _0x1a55df + _0x4e56ff + _0x24ad37 + _0x20f2a;
      } else {
        if (_0x1321b0 == 0) {
          return _0xb05a10.getFullYear();
        } else {
          if (_0x1321b0 == 1) {
            return _0xb05a10.getMonth() + 1 < 10 ? "0" + (_0xb05a10.getMonth() + 1) : _0xb05a10.getMonth() + 1;
          } else {
            if (_0x1321b0 == 2) {
              return _0xb05a10.getDate();
            } else {
              if (_0x1321b0 == 3) {
                {
                  return _0xb05a10.getHours();
                }
              } else {
                if (_0x1321b0 == 4) {
                  return _0xb05a10.getMinutes();
                } else {
                  if (_0x1321b0 == 5) {
                    {
                      return _0xb05a10.getSeconds() + 1 < 10 ? "0" + _0xb05a10.getSeconds() : _0xb05a10.getSeconds();
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    ["formatDate"](_0x597599) {
      {
        var _0x82bc79 = _0x597599.getMonth() + 1;
        var _0x5ebf25 = _0x597599.getDate();
        return _0x82bc79 + "月" + _0x5ebf25 + "日";
      }
    }
    ["safeGet"](_0x2e0c58) {}
    ["SJS"](_0x4640ec, _0x285c5f) {}
    ["udid"](_0x1dee0e) {
      {
        function _0x460d69() {
          {
            return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
          }
        }
        let _0x161c73 = _0x460d69() + _0x460d69() + "-" + _0x460d69() + "-" + _0x460d69() + "-" + _0x460d69() + "-" + _0x460d69() + _0x460d69() + _0x460d69();
        return _0x1dee0e == 0 ? _0x161c73.toUpperCase() : _0x161c73.toLowerCase();
      }
    }
    ["encodeUnicode"](_0x1be892) {
      {
        var _0x32776d = [];
        for (var _0x192c4b = 0; _0x192c4b < _0x1be892.length; _0x192c4b++) {
          _0x32776d[_0x192c4b] = ("00" + _0x1be892.charCodeAt(_0x192c4b).toString(16)).slice(-4);
        }
        return "\\u" + _0x32776d.join("\\u");
      }
      return _0x17e4d8;
    }
    ["decodeUnicode"](_0xdc58cb) {
      _0xdc58cb = _0xdc58cb.replace(/\\u/g, "%u");
      return unescape(unescape(_0xdc58cb));
    }
    ["rtjson"](_0x717619, _0x562059, _0x81c71a, _0x35c62c) {
      return _0x35c62c == 0 ? JSON.stringify(_0x717619.split(_0x562059).reduce((_0x3b83a0, _0x4cb1fc) => {
        {
          let _0x5b5361 = _0x4cb1fc.split(_0x81c71a);
          _0x3b83a0[_0x5b5361[0].trim()] = _0x5b5361[1].trim();
          return _0x3b83a0;
        }
      }, {})) : _0x717619.split(_0x562059).reduce((_0x263705, _0x1e1f35) => {
        let _0x2c5b9a = _0x1e1f35.split(_0x81c71a);
        _0x263705[_0x2c5b9a[0].trim()] = _0x2c5b9a[1].trim();
        return _0x263705;
      }, {});
    }
    ["MD5Encrypt"](_0x4ec100, _0x1f9dff) {
      if (_0x4ec100 == 0) {
        return this.CryptoJS.MD5(_0x1f9dff).toString().toLowerCase();
      } else {
        if (_0x4ec100 == 1) {
          {
            return this.CryptoJS.MD5(_0x1f9dff).toString().toUpperCase();
          }
        } else {
          if (_0x4ec100 == 2) {
            return this.CryptoJS.MD5(_0x1f9dff).toString().substring(8, 24).toLowerCase();
          } else {
            if (_0x4ec100 == 3) {
              return this.CryptoJS.MD5(_0x1f9dff).toString().substring(8, 24).toUpperCase();
            }
          }
        }
      }
    }
    ["SHA_Encrypt"](_0x26dc3d, _0x5c2cc6, _0xefe014) {
      {
        if (_0x26dc3d == 0) {
          return this.CryptoJS[_0x5c2cc6](_0xefe014).toString(this.CryptoJS.enc.Base64);
        } else {
          {
            return this.CryptoJS[_0x5c2cc6](_0xefe014).toString();
          }
        }
      }
    }
    ["HmacSHA_Encrypt"](_0x111f21, _0x464499, _0x2a74f3, _0x17bb5c) {
      return _0x111f21 == 0 ? this.CryptoJS[_0x464499](_0x2a74f3, _0x17bb5c).toString(this.CryptoJS.enc.Base64) : this.CryptoJS[_0x464499](_0x2a74f3, _0x17bb5c).toString();
    }
    ["Base64"](_0x4ef016, _0x413723) {
      return _0x4ef016 == 0 ? this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(_0x413723)) : this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(_0x413723));
    }
    ["DecryptCrypto"](_0x78c057, _0x202ae9, _0x2b2334, _0x480aa3, _0x4e9bde, _0x5e954d, _0x2865bc) {
      {
        if (_0x78c057 == 0) {
          const _0x3ef857 = this.CryptoJS[_0x202ae9].encrypt(this.CryptoJS.enc.Utf8.parse(_0x4e9bde), this.CryptoJS.enc.Utf8.parse(_0x5e954d), {
            iv: this.CryptoJS.enc.Utf8.parse(_0x2865bc),
            mode: this.CryptoJS.mode[_0x2b2334],
            padding: this.CryptoJS.pad[_0x480aa3]
          });
          return _0x3ef857.toString();
        } else {
          const _0x436b7c = this.CryptoJS[_0x202ae9].decrypt(_0x4e9bde, this.CryptoJS.enc.Utf8.parse(_0x5e954d), {
            iv: this.CryptoJS.enc.Utf8.parse(_0x2865bc),
            mode: this.CryptoJS.mode[_0x2b2334],
            padding: this.CryptoJS.pad[_0x480aa3]
          });
          return _0x436b7c.toString(this.CryptoJS.enc.Utf8);
        }
      }
    }
    ["RSA"](_0x4c073e, _0x4ae4bc) {
      {
        const _0x12a9e5 = require("node-rsa");
        let _0xb7528b = new _0x12a9e5("-----BEGIN PUBLIC KEY-----\n" + _0x4ae4bc + "\n-----END PUBLIC KEY-----");
        _0xb7528b.setOptions({
          encryptionScheme: "pkcs1"
        });
        return _0xb7528b.encrypt(_0x4c073e, "base64", "utf8");
      }
    }
    ["getSHA256withRSA"](_0x1a8719) {
      {
        const _0x6d6bf0 = 自定义_0x29c897.KEYUTIL.getKey(privateKeyString);
        const _0x5f6042 = new 自定义_0x29c897.KJUR.crypto.Signature({
          alg: "SHA256withRSA"
        });
        _0x5f6042.init(_0x6d6bf0);
        _0x5f6042.updateString(_0x1a8719);
        const _0x6d4221 = _0x5f6042.sign();
        const _0x2ef329 = 自定义_0x29c897.hextob64u(_0x6d4221);
        return _0x2ef329;
      }
    }
  }();
}