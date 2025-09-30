//Tue Sep 30 2025 14:16:11 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const request = require("request");
const crypto = require("crypto");
const {
  log
} = console;
const {
  sendNotify
} = require("./sendNotify");
const ACCOUNTS_ENV = process.env.LCC_ACCOUNTS || "";
const LKEY_ENV = process.env.Lkey || "";
let accounts = [];
let userToken = "";
let currentPhone = "";
let currentUserId = "";
let userScore = 0;
let isSigned = false;
let tokenFailAccounts = [];
let allAccountSummary = [];
const RSA_PUBLIC_KEY_B64 = "QkFRQURJUVhLVHhVMGFyV0U5eTRZTkRxQkhPRWdaMnptY1JqUjNTUW1mSE5OWWdkQ3hLZzNpZGNxakJkUXdOZUtPb1Fsam5BREk1VHRFdFpkTTlSYlZ6cnlLTDNqNld1OEZreDEyYmlDKyt5emtrL2R6TTd3QzJvQzdFOERzenJ1cDM5VFFlZjEyaDhpZmVDcVYvMlZhMTArQUhFcFJiK25VeVd4TzNiTU5uY0dVdjJTQ1FnQktRaUJDREFORzRBQVVRQUJFUUQzYklTR3FTQ0cwQU1mR0lN";
async function fetchLkeyFromWeb() {
  return new Promise((_0x20e9c2, _0x56337f) => {
    {
      const _0x312d4d = "https://gitee.com/xingxing666666/log/raw/master/Lkey.log";
      const _0xa7b4d = {
        timeout: 10000
      };
      request.get(_0x312d4d, _0xa7b4d, (_0x1e688a, _0x130fd1, _0x3565a8) => {
        if (_0x1e688a) {
          _0x56337f("网络请求失败: " + _0x1e688a.message);
          return;
        }
        if (_0x130fd1.statusCode !== 200) {
          {
            _0x56337f("HTTP错误: " + _0x130fd1.statusCode);
            return;
          }
        }
        try {
          const _0x325524 = _0x3565a8.trim();
          if (!_0x325524) {
            _0x56337f("获取到的Lkey为空");
            return;
          }
          _0x20e9c2(_0x325524);
        } catch (_0x5bb03e) {
          _0x56337f("解析Lkey失败: " + _0x5bb03e.message);
        }
      });
    }
  });
}
async function validateLkey() {
  try {
    {
      log("🔐 正在验证Lkey...");
      const _0x41a135 = await fetchLkeyFromWeb();
      if (!LKEY_ENV) {
        throw new Error("未设置环境变量Lkey");
      }
      if (LKEY_ENV !== _0x41a135) {
        throw new Error("Lkey不正确");
      }
      log("✅ Lkey验证通过");
      return true;
    }
  } catch (_0x4c6eb2) {
    {
      log("❌ Lkey验证失败: " + _0x4c6eb2.message);
      log("\n⚠️ 未设置环境变量Lkey或Lkey不正确");
      sendNotify("驴充充脚本Lkey验证失败", "关注公众号【帅气的林老师】发送[key]免费获取");
      log("💡 关注公众号【帅气的林老师】发送[key]免费获取");
      return false;
    }
  }
}
function generateNonce(_0x2dbb83) {
  try {
    {
      const _0x53e049 = Buffer.from(RSA_PUBLIC_KEY_B64, "base64").toString();
      const _0x4afdd4 = _0x53e049.split("").reverse().join("");
      const _0x316ca2 = ["-----BEGIN PUBLIC KEY-----\n" + _0x4afdd4 + "\n-----END PUBLIC KEY-----", _0x4afdd4, "-----BEGIN RSA PUBLIC KEY-----\n" + _0x4afdd4 + "\n-----END RSA PUBLIC KEY-----"];
      for (let _0x43c0d8 = 0; _0x43c0d8 < _0x316ca2.length; _0x43c0d8++) {
        {
          try {
            const _0x4708dc = crypto.publicEncrypt({
              key: _0x316ca2[_0x43c0d8],
              padding: crypto.constants.RSA_PKCS1_PADDING
            }, Buffer.from(String(_0x2dbb83)));
            const _0x1a7924 = encodeURIComponent(_0x4708dc.toString("base64"));
            return _0x1a7924;
          } catch (_0x298f82) {}
        }
      }
      throw new Error("所有格式都失败了");
    }
  } catch (_0x3cd582) {
    log("生成nonce失败: " + _0x3cd582.message);
    return null;
  }
}
async function refreshToken() {
  log("Token过期，正在刷新...");
  try {
    const _0x217abd = await getTokenByPhoneAndUserId(currentPhone, currentUserId);
    userToken = _0x217abd.userToken;
    log("Token刷新成功");
    return true;
  } catch (_0x2a02fd) {
    {
      log("Token刷新失败: " + _0x2a02fd.message);
      return false;
    }
  }
}
function parseAccounts() {
  if (!ACCOUNTS_ENV) {
    log("⚠️ 未设置LCC_ACCOUNTS环境变量");
    return [];
  }
  return ACCOUNTS_ENV.split("\n").map((_0x5d48da, _0x1bba74) => {
    {
      const _0x45092e = _0x5d48da.trim();
      if (!_0x45092e) {
        return null;
      }
      const _0x46c443 = _0x45092e.split("#").map(_0x4dc121 => _0x4dc121.trim());
      return _0x46c443.length >= 2 ? {
        phone: _0x46c443[0],
        userId: _0x46c443[1],
        mark: _0x46c443[2] || "账号" + (_0x1bba74 + 1)
      } : null;
    }
  }).filter(_0x1c6167 => _0x1c6167 !== null);
}
async function main() {
  try {
    !(await validateLkey()) && process.exit(1);
    accounts = parseAccounts();
    if (accounts.length === 0) {
      log("没有有效的账号信息，脚本退出");
      return;
    }
    log("共找到 " + accounts.length + " 个账号\n");
    for (let _0x559cd0 = 0; _0x559cd0 < accounts.length; _0x559cd0++) {
      _0x559cd0 > 0 && (log("休息10s，防止黑IP"), await wait(10000));
      await processAccount(accounts[_0x559cd0], _0x559cd0 + 1);
    }
    sendAllAccountsSummary();
  } catch (_0xd1b0a) {
    log("脚本主流程出错: " + _0xd1b0a.message);
    sendNotify("驴充充脚本执行失败", "错误信息: " + _0xd1b0a.message);
  }
}
async function processAccount(_0x5cbbd1, _0x15b688) {
  let {
    phone: _0x568fa7,
    userId: _0x4f0412,
    mark: _0x4b2f9f
  } = _0x5cbbd1;
  let _0x129869 = [];
  let _0xce9bcd = true;
  isSigned = false;
  userScore = 0;
  try {
    {
      log("" + "=".repeat(50));
      log("🚀 开始【第 " + _0x15b688 + " 个账号：" + _0x4b2f9f + "】");
      if (!_0x568fa7 || !_0x4f0412) {
        log("❌ 账号信息不完整，跳过");
        const _0x55ec1e = {
          mark: _0x4b2f9f,
          status: "信息不完整",
          totalScore: 0,
          earnedScore: 0,
          tasks: []
        };
        allAccountSummary.push(_0x55ec1e);
        return;
      }
      currentPhone = _0x568fa7;
      currentUserId = _0x4f0412;
      const _0x44d1e9 = await getTokenByPhoneAndUserId(_0x568fa7, _0x4f0412);
      userToken = _0x44d1e9.userToken;
      if (!(await getUserInfoAndSignStatus())) {
        {
          tokenFailAccounts.push(_0x4b2f9f);
          log("❌ 获取用户信息失败");
          const _0xffc495 = {
            mark: _0x4b2f9f,
            status: "获取用户信息失败",
            totalScore: 0,
            earnedScore: 0,
            tasks: []
          };
          allAccountSummary.push(_0xffc495);
          return;
        }
      }
      log("💰 当前积分: " + userScore);
      const _0x13e5e7 = userScore;
      if (!isSigned) {
        await handleSignIn(_0x129869);
        await wait(2000);
      } else {
        {
          log("✅ 今日已签到");
        }
      }
      const _0x371968 = await getCompleteTaskList(_0xce9bcd);
      if (!_0x371968?.["length"]) {
        log("❌ 获取任务列表失败");
        const _0x4b10ea = {
          mark: _0x4b2f9f,
          status: "获取任务列表失败",
          totalScore: 0,
          earnedScore: 0,
          tasks: []
        };
        allAccountSummary.push(_0x4b10ea);
        return;
      }
      _0xce9bcd = false;
      const _0x95e20 = _0x371968.find(_0x507e16 => _0x507e16.type === 7);
      if (_0x95e20 && _0x95e20.finishTimes < _0x95e20.times) {
        const _0x20e27a = _0x95e20.times - _0x95e20.finishTimes;
        log("\n📺 开始执行看视频任务 (" + _0x95e20.finishTimes + "/" + _0x95e20.times + ")");
        await executeVideoTask(_0x20e27a);
      }
      await getUserInfoAndSignStatus();
      const _0xaf686c = Math.max(0, userScore - _0x13e5e7);
      log("✨ 本次获得积分: " + _0xaf686c + "，总积分: " + userScore);
      log("" + "=".repeat(50));
      const _0x1eb3d5 = {
        mark: _0x4b2f9f,
        status: "完成",
        totalScore: userScore,
        earnedScore: _0xaf686c,
        tasks: [..._0x129869]
      };
      allAccountSummary.push(_0x1eb3d5);
    }
  } catch (_0x4308a1) {
    log("账号处理出错: " + _0x4308a1.message);
    const _0x5ca3f8 = {
      mark: _0x4b2f9f,
      status: "处理出错",
      totalScore: userScore,
      earnedScore: 0,
      tasks: [..._0x129869]
    };
    allAccountSummary.push(_0x5ca3f8);
  }
}
async function executeVideoTask(_0x55728f) {
  for (let _0x57689c = 0; _0x57689c < _0x55728f; _0x57689c++) {
    log("📺 看视频 " + (_0x57689c + 1) + "/" + _0x55728f);
    await executeVideoOnce();
    if (_0x57689c < _0x55728f - 1) {
      {
        const _0x1b72f0 = Math.floor(Math.random() * 6) + 25;
        log("   休息" + _0x1b72f0 + "秒后观看下一个视频...");
        await wait(_0x1b72f0 * 1000);
      }
    }
  }
  log("📺 看视频任务完成 ✅");
}
async function executeVideoOnce() {
  return new Promise(async _0x4185e5 => {
    {
      try {
        const _0x4f7e7b = await sendVideoRequest();
        if (_0x4f7e7b && _0x4f7e7b.code === 402) {
          log("🔄 刷新Token...");
          if (!(await refreshToken())) {
            {
              return _0x4185e5();
            }
          }
          const _0x350fd4 = await sendVideoRequest();
          if (_0x350fd4 && _0x350fd4.code === 200) {
            if (_0x350fd4.data && _0x350fd4.data.userScore) {
              {
                const _0xbfc72a = userScore;
                userScore = _0x350fd4.data.userScore;
                const _0x5894c1 = userScore - _0xbfc72a;
                log("   +" + _0x5894c1 + "积分 (总计: " + userScore + ")");
              }
            }
          } else {
            {
              const _0x33b084 = _0x350fd4?.["message"] || _0x350fd4?.["msg"] || "错误码: " + _0x350fd4?.["code"];
              log("   ❌ " + _0x33b084);
            }
          }
        } else {
          if (_0x4f7e7b && _0x4f7e7b.code === 200) {
            {
              if (_0x4f7e7b.data && _0x4f7e7b.data.userScore) {
                {
                  const _0x5c81dc = userScore;
                  userScore = _0x4f7e7b.data.userScore;
                  const _0x12bc1d = userScore - _0x5c81dc;
                  log("   +" + _0x12bc1d + "积分 (总计: " + userScore + ")");
                }
              }
            }
          } else {
            const _0x21c8c4 = _0x4f7e7b?.["message"] || _0x4f7e7b?.["msg"] || "错误码: " + _0x4f7e7b?.["code"];
            log("   ❌ " + _0x21c8c4);
          }
        }
      } catch (_0x5c6f0d) {
        log("看视频异常: " + _0x5c6f0d.message);
      }
      _0x4185e5();
    }
  });
}
async function sendVideoRequest() {
  return new Promise(_0x20a9d7 => {
    {
      try {
        const _0x745fc0 = Date.now();
        const _0x13813f = generateNonce(_0x745fc0);
        let _0x1ca80c = "https://appapi.lvcchong.com/appBaseApi/scoreUser/task/receiveTaskScore?timestamp=" + _0x745fc0;
        _0x13813f && (_0x1ca80c += "&nonce=" + _0x13813f);
        const _0x314d29 = {
          method: "POST",
          url: _0x1ca80c,
          headers: {},
          form: {}
        };
        _0x314d29.headers.token = userToken;
        _0x314d29.headers["content-type"] = "application/x-www-form-urlencoded";
        _0x314d29.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x6309080f)XWEB/14185";
        _0x314d29.headers.Origin = "https://h5.lvcchong.com";
        _0x314d29.headers.Referer = "https://h5.lvcchong.com/";
        _0x314d29.form.content = "HZC7B9RVy5411UnJohSPT%2F%2BNueFczy1TKuL9hPFjpu1DF9ArV3oIK%2FLaDdi2eMB17wyo8jYMvGfindyVjSXUBBKtcVo7t1Q9%2FFi1CLRSgPnQ3ryc1rvWiSPuDvef01MsNyRYGPPpSP5FPDQczW0m3sFhEWWotJyuc85QryjO6cU%3D";
        const _0x46f6f8 = _0x314d29;
        request(_0x46f6f8, (_0x4d4235, _0x51b23c, _0x15189f) => {
          {
            try {
              if (_0x4d4235 || !_0x15189f) {
                _0x20a9d7(null);
                return;
              }
              const _0x5a8ada = JSON.parse(_0x15189f);
              _0x20a9d7(_0x5a8ada);
            } catch (_0x50c3a5) {
              _0x20a9d7(null);
            }
          }
        });
      } catch (_0x4909bf) {
        _0x20a9d7(null);
      }
    }
  });
}
async function getTokenByPhoneAndUserId(_0x44ab32, _0x2adafc) {
  return new Promise((_0x156f83, _0x3eb22d) => {
    {
      const _0x5596da = {
        method: "POST",
        url: "https://appapi.lvcchong.com/appBaseApi/h5/accessEntrance",
        headers: {
          "User-Agent": "Mozilla/5.0 (Linux; Android 15; 22061218C Build/AQ3A.241006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 XWEB/1160117 MMWEBSDK/20250503 MMWEBID/6435 MicroMessenger/8.0.61.2861(0x28003D41) WeChat/arm64 Weixin GPVersion/1 NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx0132aa93a8b214ae",
          Origin: "https://h5.lvcchong.com",
          Referer: "https://h5.lvcchong.com/",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
          phone: _0x44ab32,
          userId: _0x2adafc,
          time: Date.now(),
          ownerId: "0"
        }
      };
      request(_0x5596da, (_0x1dbb64, _0xde106c, _0x19ca1c) => {
        {
          if (_0x1dbb64) {
            return _0x3eb22d("获取Token失败: " + _0x1dbb64.message);
          }
          try {
            const _0x3f2529 = JSON.parse(_0x19ca1c);
            if (_0x3f2529.code === 200 && _0x3f2529.success && _0x3f2529.data?.["userToken"]) {
              {
                const _0x55e604 = {
                  userToken: _0x3f2529.data.userToken,
                  refreshToken: _0x3f2529.data.refreshToken
                };
                _0x156f83(_0x55e604);
              }
            } else {
              _0x3eb22d("获取Token失败: " + (_0x3f2529.message || "未知错误") + "，错误码: " + _0x3f2529.code);
            }
          } catch (_0x41ccef) {
            _0x3eb22d("解析Token响应失败: " + _0x41ccef.message);
          }
        }
      });
    }
  });
}
async function getUserInfoAndSignStatus() {
  return new Promise(_0x3e4b39 => {
    const _0x39e239 = {
      page: 1,
      limit: 10,
      sourceType: 3
    };
    const _0x5773e5 = {
      method: "POST",
      url: "https://appapi.lvcchong.com/appBaseApi/scoreUser/score/getMyScorePageInfo",
      headers: {},
      form: _0x39e239
    };
    _0x5773e5.headers.token = userToken;
    _0x5773e5.headers["Content-Type"] = "application/x-www-form-urlencoded";
    const _0x5ca58f = _0x5773e5;
    request(_0x5ca58f, (_0x3ce37e, _0x2f6244, _0x583e3c) => {
      try {
        if (_0x3ce37e || !_0x583e3c) {
          return _0x3e4b39(false);
        }
        const _0x44848b = JSON.parse(_0x583e3c);
        if (_0x44848b.code === 200 && _0x44848b.data) {
          userScore = _0x44848b.data.userScore || 0;
          const _0x1c54b7 = _0x44848b.data.signConfigList || [];
          const _0x485b0d = _0x1c54b7.find(_0x2341f3 => _0x2341f3.isToday === 1);
          isSigned = _0x485b0d ? _0x485b0d.isSigned === 1 : _0x44848b.data.signFlag === 1;
          return _0x3e4b39(true);
        }
      } catch (_0x2e7cdb) {}
      _0x3e4b39(false);
    });
  });
}
async function getCompleteTaskList(_0x424e08 = false) {
  return new Promise(_0x512375 => {
    const _0x5a5a71 = {
      sourceType: 3,
      version: 1
    };
    const _0x80596b = {
      method: "POST",
      url: "https://appapi.lvcchong.com/appBaseApi/scoreUser/task/getTaskList",
      headers: {},
      form: _0x5a5a71
    };
    _0x80596b.headers.token = userToken;
    _0x80596b.headers["Content-Type"] = "application/x-www-form-urlencoded";
    _0x80596b.headers["User-Agent"] = "Mozilla/5.0 (Linux; Android 15; 22061218C Build/AQ3A.241006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 XWEB/1160117 MMWEBSDK/20250503 MMWEBID/6435 MicroMessenger/8.0.61.2861(0x28003D41) WeChat/arm64 Weixin GPVersion/1 NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx0132aa93a8b214ae";
    const _0x37417d = _0x80596b;
    request(_0x37417d, (_0xec38dd, _0x1ee988, _0x5d2be7) => {
      {
        try {
          if (_0xec38dd || !_0x5d2be7) {
            return _0x512375(null);
          }
          const _0xb462a8 = JSON.parse(_0x5d2be7);
          if (_0xb462a8.code === 200 && _0xb462a8.success && Array.isArray(_0xb462a8.data)) {
            if (_0x424e08) {
              {
                const _0x1b3ed1 = _0xb462a8.data.find(_0x5c0343 => _0x5c0343.type === 7);
                if (_0x1b3ed1) {
                  const _0x26948d = _0x1b3ed1.status === 2 ? "✅" : _0x1b3ed1.finishTimes >= _0x1b3ed1.times ? "🎁" : "⏳";
                  log("📺 看视频: " + _0x1b3ed1.finishTimes + "/" + _0x1b3ed1.times + " " + _0x26948d);
                }
              }
            }
            return _0x512375(_0xb462a8.data);
          }
        } catch (_0x2c779d) {}
        _0x512375(null);
      }
    });
  });
}
async function handleSignIn(_0x2d87aa) {
  log("执行签到...");
  return new Promise(_0x1c1109 => {
    {
      const _0x69ec55 = {
        sourceType: "3"
      };
      const _0x54a4e4 = {
        method: "POST",
        url: "https://appapi.lvcchong.com/appBaseApi/scoreUser/sign/userSign",
        headers: {},
        form: _0x69ec55
      };
      _0x54a4e4.headers.token = userToken;
      _0x54a4e4.headers["content-type"] = "application/x-www-form-urlencoded";
      _0x54a4e4.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x6309080f)XWEB/14185";
      _0x54a4e4.headers.Origin = "https://h5.lvcchong.com";
      _0x54a4e4.headers.Referer = "https://h5.lvcchong.com/";
      const _0x382dad = _0x54a4e4;
      request(_0x382dad, (_0x5c203a, _0xd822c3, _0x424729) => {
        {
          try {
            if (_0x5c203a || !_0x424729) {
              {
                log("签到失败: 网络错误");
                const _0x205efe = {
                  name: "签到",
                  status: "失败",
                  score: 0
                };
                _0x2d87aa.push(_0x205efe);
                return _0x1c1109();
              }
            }
            const _0x265da4 = JSON.parse(_0x424729);
            if (_0x265da4.code == 200 && _0x265da4.success) {
              isSigned = true;
              let _0x136a63 = 0;
              if (_0x265da4.data?.["signConfigList"]) {
                const _0x540217 = _0x265da4.data.signConfigList.find(_0x187d34 => _0x187d34.isToday === 1);
                _0x136a63 = _0x540217 ? _0x540217.score : _0x265da4.data?.["score"] || 0;
              } else {
                _0x136a63 = _0x265da4.data?.["score"] || 0;
              }
              if (_0x265da4.data?.["totalScore"]) {
                {
                  userScore = _0x265da4.data.totalScore;
                }
              }
              log("签到成功，获得 " + _0x136a63 + " 积分");
              const _0x171f08 = {
                name: "签到",
                status: "成功",
                score: _0x136a63
              };
              _0x2d87aa.push(_0x171f08);
            } else {
              {
                const _0x30c2f5 = _0x265da4.message || _0x265da4.msg || "错误码: " + _0x265da4.code;
                log("签到失败: " + _0x30c2f5);
                const _0x3a61e8 = {
                  name: "签到",
                  status: "失败",
                  score: 0,
                  reason: _0x30c2f5
                };
                _0x2d87aa.push(_0x3a61e8);
              }
            }
          } catch (_0x3824e3) {
            log("签到处理出错: " + _0x3824e3.message);
            const _0x5ba3c2 = {
              name: "签到",
              status: "错误",
              score: 0
            };
            _0x2d87aa.push(_0x5ba3c2);
          }
          _0x1c1109();
        }
      });
    }
  });
}
function sendAllAccountsSummary() {
  const _0x1d4e9a = accounts.length;
  const _0x466234 = allAccountSummary.filter(_0x253f7e => _0x253f7e.status === "完成").length;
  const _0x5db58a = allAccountSummary.reduce((_0x41d5e2, _0x2e35fd) => _0x41d5e2 + _0x2e35fd.earnedScore, 0);
  const _0x471875 = new Date();
  const _0x25622c = new Date(_0x471875.getTime() + 28800000);
  const _0x185588 = {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  const _0xa113fc = _0x25622c.toLocaleString("zh-CN", _0x185588);
  const _0x4041c5 = allAccountSummary.filter(_0x380585 => _0x380585.status !== "完成").length;
  let _0xd780c5 = "⚡ **驴充充任务概览**\n";
  _0xd780c5 += "总计: " + _0x1d4e9a + " | 成功: " + _0x466234 + " | 失败: " + _0x4041c5 + "\n";
  _0xd780c5 += "💰 获得积分: " + _0x5db58a + "\n";
  _0xd780c5 += "--------------------------------\n";
  allAccountSummary.forEach(_0x220a53 => {
    if (_0x220a53.status === "完成") {
      {
        _0xd780c5 += "✅ " + _0x220a53.mark + ": +" + _0x220a53.earnedScore + " (总" + _0x220a53.totalScore + ")\n";
      }
    } else {
      _0xd780c5 += "❌ " + _0x220a53.mark + ": " + _0x220a53.status + "\n";
    }
  });
  sendNotify("驴充充", _0xd780c5.trim());
}
function wait(_0xfdbc99) {
  return new Promise(_0x1508ca => setTimeout(_0x1508ca, _0xfdbc99));
}
main();