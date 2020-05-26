autoClock 西安交通大学每日健康打卡脚本
=========
## 依赖
```js
nodejs v12.16.3
const puppeteer = require('puppeteer');  
const moment = require('moment');  
const schedule = require('node-schedule'); 
```
## 安装依赖

```js
npm install
```

> 如果下载太慢

```js
npm config set registry https://registry.npm.taobao.org
npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
```
------------
## 修改账户密码和其他
```js
// 账户
await username.type('******', {delay: 1});
//密码
await password.type('**********', {delay: 1});
// 每天8点13点1分30秒定时执行一次:
schedule.scheduleJob('30 1 8,13 * * *',()=>{ my() }); 
//  体温随机
var random=Math.floor(Math.random()*10);
"36."+random
```

## 运行
```js
node autoDiDi.js
```