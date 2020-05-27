autoClock 西安交通大学每日健康打卡脚本
=========
>  疫情 健康 打卡  XJTU 

> 需要进行过一次手动打卡，系统自动填充表单数据
## 依赖
```js
nodejs v12.16.3
const puppeteer = require('puppeteer');
const moment = require('moment');// 时间
const schedule = require('node-schedule'); // 定时任务
const YAML = require('yamljs'); //读取配置文件
const fs = require("fs"); 
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

```yml
config: 
# 是否显示UI
  noShowUI: false
user: 
  username: xxxxxx
  password: xxxxxx
# 每天8点和13点的1分30秒定时执行一次
scheduleJob: 30 1 8,13 * * *
```
## 测试
```js
// 进行一次打卡
node autoDiDi_test.js
```

## 运行
```js
node autoDiDi.js
```

