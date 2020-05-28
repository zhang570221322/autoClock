autoClock | 西安交通大学每日健康打卡脚本
=========
>  疫情 健康 打卡  XJTU 

> 需要进行过一次手动打卡，系统自动填充表单数据

功能
======
脚本会根据Crontab的时间参数定时执行打卡.  
可以选择有浏览器窗口(UI)的打卡方式和无UI的.   
有UI的可以看到打卡步骤,无UI的脚本静默运行.   
两者都可以查看过程截图.      
默认是每天8点和13点的1分30秒定时执行.  
表单其他数据都会按默认,脚本自动完成的填写有.
1. 选择返校后填报
2. 选择绿色码
3. 到过校园
4. 到过哪个校园
5. 当前体温，随机温度 36.X

依赖
======
```js
nodejs v12.16.3
const puppeteer = require('puppeteer');
const moment = require('moment');// 时间
const schedule = require('node-schedule'); // 定时任务
const YAML = require('yamljs'); //读取配置文件
const fs = require("fs"); 
```

安装依赖
======
> 如果下载太慢,可添加以下镜像
```js
// 添加npm淘宝镜像
npm config set registry https://registry.npm.taobao.org
// 添加electron淘宝镜像
npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
// 执行安装
npm install
```


修改账户密码和其他
======
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
测试
======
```js
// 进行一次打卡
// 保存多张截图
node autoDiDi_test.js
```
在没有打过卡的前提下  
测试成功会得到很多的截图  
测试的截图命名时间格式为   `YYYY-MM-DD-HH-mm-ss_test.png`  
最后一张截图为正在提交表示测试成功.

运行
======
```js
node autoDiDi.js
```
脚本定时执行，一次打卡成功会生成日志和两张截图.   
截图命名方式为`YYYY-MM-DD-HH-mm-ss_1.png` ,  `YYYY-MM-DD-HH-mm-ss_2.png`


Q&A
=====
1. linux下报错 
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
2. linux下截图乱码 

原始是因为linux默认不安装中文字体  
此错误不解决，不影响程序功能   
解决可参考博客 [Linux安装中文字体](https://www.cnblogs.com/huangyanqi/p/10609587.html)