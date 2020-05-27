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
> 如果下载太慢
```js
npm config set registry https://registry.npm.taobao.org
npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
```

```js
npm install
```

------------
## 修改账户密码和其他

```yml
config: 
# 显示UI
# linux下必须为true
  noShowUI: false
user: 
  username: xxxxxx
  password: xxxxxx
  # 到过校园
  # 创新港校区 || 兴庆校区 || 雁塔校区 || 曲江校区
  campus: 创新港校区
# 每天8点和13点的1分30秒定时执行一次
scheduleJob: 30 1 8,13 * * *
```
## 测试
```js
// 进行一次打卡
// 保存多张截图
node autoDiDi_test.js
```

## 运行
```js
node autoDiDi.js
```

## Q&A
### 1
```bash
# linux下报错 
(node:27123) UnhandledPromiseRejectionWarning: Error: Failed to launch the browser process!
/root/autoClock/node_modules/puppeteer/.local-chromium/linux-756035/chrome-linux/chrome: error while loading shared libraries: libatk-bridge-2.0.so.0: cannot open shared object file: No such file or directory
# 解决办法 (因为缺少依赖)
cd /root/autoClock/node_modules/puppeteer/.local-chromium/linux-756035/chrome-linux/
# 检查缺少依赖
ldd chrome|grep not
# 结果
	libatk-bridge-2.0.so.0 => not found
	libXss.so.1 => not found
	libatspi.so.0 => not found
	libgtk-3.so.0 => not found
	libgdk-3.so.0 => not found
# 安装依赖
yum install at-spi2-atk -y
yum install libXScrnSaver* -y
yum install gtk3 -y
```
