//Thu Jul 10 2025 13:42:34 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const axios = require("axios");
const $ = {
  name: "雀巢会员",
  wait: a => new Promise(e => setTimeout(e, a)),
  logErr: e => console.error(e),
  done: () => console.log("任务完成")
};
const nestleList = process.env.NESTLE_TOKEN ? process.env.NESTLE_TOKEN.split(/[\n&]/) : [];
let message = "";
const baseUrl = "https://crm.nestlechinese.com";
function printBanner() {
  const a = "\n免责声明:\n\n所发布的所有资源文件，禁止任何公众号、自媒体进行任何形式的转载、发布。 \n对任何问题概不负责，包括但不限于由任何脚本错误导致的任何损失或损害。间接使用脚本的任何用户，\n包括但不限于建立VPS或在某些行为违反国家/地区法律或相关法规的情况下进行传播。\n对于由此引起的任何隐私泄漏或其他后果概不负责。如果任何单位或个人认为该项目的脚本可能涉嫌侵犯其权利，\n则应及时通知并提供身份证明，所有权证明，我们将在收到认证文件后删除相关脚本。\n任何以任何方式查看此项目的人或直接或间接使用该项目的任何脚本的使用者都应仔细阅读此声明。\n\n所发布的内容仅供学习，禁止用于其他用途，您必须在下载后的24小时内从计算机或手机中完全删除以上内容。严禁产生利益链！\n保留随时更改或补充此免责声明的权利。一旦使用或复制了任何相关脚本或Script项目的规则，则视为您已接受此免责声明。\n如您不同意，请马上删除所以相关文件。\n\nGithub:\nhttps://github.com/985Ming/qlk\n    ╔══════════════════════════════════════════════╗\n    ║                                              ║\n    ║   ██████  ██████  ███    ███                ║\n    ║   ██   ██ ██   ██ ████  ████                ║\n    ║   ██   ██ ██   ██ ██ ████ ██                ║\n    ║   ██   ██ ██   ██ ██  ██  ██                ║\n    ║   ██████  ██████  ██      ██                ║\n    ║                                              ║\n    ║     雀巢会员自动任务脚本                    ║\n    ║     Created by 大大鸣 - V1.0.0               ║\n    ║     联系方式: v:xolag29638099                ║\n    ║     大大鸣交流群：1025838653                 ║\n    ╚══════════════════════════════════════════════╝\n";
  console.log(a);
}
function getRandomUserAgent() {
  const a = ["Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"];
  return a[Math.floor(Math.random() * a.length)];
}
function getRandomWait(e, a) {
  return Math.floor(Math.random() * (a - e + 1) + e);
}
async function sendRequest(e, a, n, t = null) {
  try {
    const o = {
      url: e,
      method: a,
      headers: n,
      timeout: 10000,
      validateStatus: () => true
    };
    t && (a.toLowerCase() === "post" || a.toLowerCase() === "put") && (o.data = t);
    const r = await axios(o);
    return r.data;
  } catch (e) {
    console.error("请求失败: " + e.message);
    return {
      errcode: 500,
      errmsg: "请求失败: " + e.message
    };
  }
}
const headers = {
  "User-Agent": getRandomUserAgent(),
  "content-type": "application/json",
  referer: "https://servicewechat.com/wxc5db704249c9bb31/353/page-frame.html"
};
(async () => {
  printBanner();
  console.log("\n已随机分配 User-Agent\n\n" + headers["User-Agent"]);
  for (let e = 0; e < nestleList.length; e++) {
    const n = e + 1;
    console.log("\n*****第[" + n + "]个" + $.name + "账号*****");
    headers.authorization = "Bearer " + nestleList[e];
    message += "📣====" + $.name + "账号[" + n + "]====📣\n";
    await main();
    await $.wait(getRandomWait(2000, 2500));
  }
  message && console.log("\n执行结果汇总：\n" + message);
})().catch(e => $.logErr(e)).finally(() => $.done());
async function main() {
  await getUserInfo();
  await $.wait(getRandomWait(1000, 2000));
  await getTaskList();
  await $.wait(getRandomWait(1000, 2000));
  await getUserBalance();
}
async function getUserInfo() {
  try {
    const e = await sendRequest(baseUrl + "/openapi/member/api/User/GetUserInfo", "get", headers);
    if (200 !== e.errcode) {
      return console.error("获取用户信息失败：" + e.errmsg);
    }
    const {
      nickname: n,
      mobile: t
    } = e.data;
    console.log("用户：" + n + "(" + t + ")");
    message += "用户：" + n + "(" + t + ")\n";
  } catch (e) {
    console.error("获取用户信息时发生异常 -> " + e);
  }
}
async function getTaskList() {
  try {
    const e = await sendRequest(baseUrl + "/openapi/activityservice/api/task/getlist", "post", headers);
    if (200 !== e.errcode) {
      return console.error("获取任务列表失败：" + e.errmsg);
    }
    for (const n of e.data) {
      console.log("开始【" + n.task_title + "】任务");
      await doTask(n.task_guid);
      await $.wait(getRandomWait(2000, 2500));
    }
  } catch (e) {
    console.error("获取任务列表时发生异常 -> " + e);
  }
}
async function doTask(e) {
  try {
    const n = await sendRequest(baseUrl + "/openapi/activityservice/api/task/add", "post", headers, {
      task_guid: e
    });
    if (201 == n.errcode) {
      return console.error("任务失败 -> " + n.errmsg + "\n");
    }
    console.log("完成任务" + n.errcode + " -> " + n.errmsg + "\n");
  } catch (e) {
    console.error("完成任务时发生异常 -> " + e);
  }
}
async function getUserBalance() {
  try {
    const e = await sendRequest(baseUrl + "/openapi/pointsservice/api/Points/getuserbalance", "post", headers);
    if (200 !== e.errcode) {
      return console.error("获取用户积分余额失败：" + e.errmsg);
    }
    console.log("当前巢币：" + e.data);
    message += "当前巢币：" + e.data + "\n\n";
  } catch (e) {
    console.error("获取用户巢币时发生异常 -> " + e);
  }
}