[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/zhang570221322/autoClock)

# autoClock | 西安交通大学每日健康打卡脚本

> 疫情 健康 打卡 XJTU  
> 需要进行过一次手动打卡，系统自动填充表单数据

## 功能

程序会根据`Crontab`的时间参数随机定时进行有浏览器窗口(UI)或无 UI 的打卡,成功会发送截图至反馈邮箱.
表单其他数据都会按默认,脚本自动完成的填写有.

1. 选择健康每日填报
2. 选择绿色码
3. 已经阅知
4. 已取得西安市一码通
5. 填写学院
6. 填写当前体温，随机温度 36.X
   > 截图命名方式为 **YYYY-MM-DD-HH-mm-ss_1.png** , **YYYY-MM-DD-HH-mm-ss_2.png**

## 软件包

- widows  
  [nodejs32 位](https://npm.taobao.org/mirrors/node/v14.4.0/node-v14.4.0-x86.msi)  
  [nodejs64 位](https://npm.taobao.org/mirrors/node/v14.4.0/node-v14.4.0-x64.msi)
- linux  
  `curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -`
- Ubuntu  
  `curl -sL https://deb.nodesource.com/setup_14.x | bash -`  
  `apt-get install -y nodejs`

## 快速开始

```bash
git clone https://github.com/zhang570221322/autoClock
cd autoClock
# 使用 cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
# 执行安装
cnpm install
# 修改main.yml来修改账户密码和其他

# 打卡一次
node autoDiDi_Once.js
# 定时执行打卡
node autoDiDi.js

```

## main.yml 配置文件

```yml
config:
  # 显示UI
  # linux下必须为true以不显示UI
  noShowUI: false
  # 每天7点的1分20秒定时执行一次
  scheduleJob: 20 1 7 * * *
  # 每次操作间隔时间,依据网速来定.默认5000毫秒,电脑网速过慢可以增加.
  interval: 5000
users:
  - # 用户1
    username: xxxxxx
    password: xxxxxx
    # 本科生 || 研究生
    type: 研究生
    # 到过校园
    # 创新港校区 || 兴庆校区 || 雁塔校区 || 曲江校区
    campus: 创新港校区
    # 所在学院
    school: "XXXX"
    # 接受打卡成功反馈的邮箱
    revMail: xxxxxxxxx@qq.com
  - #用户2
    username: 2
    password: xxxxxx
    # 本科生 || 研究生
    type: 研究生
    # 到过校园
    # 创新港校区 || 兴庆校区 || 雁塔校区 || 曲江校区
    campus: 创新港校区
    # 所在学院
    school: "XXXX"
    # 接受打卡成功反馈的邮箱
    revMail: xxxxxxxxx@qq.com
```

## 后台运行

- widows 下两种方法  
  1.将`node autoDiDi_Once.js`添加为 windows 定时计划任务  
  2.使用**easy-service**将`node autoDiDi_Once.js`注册为系统服务.
- linux 内核下
  ```bash
  nohup  node autoDiDi.js > log.out 2>&1 &
  #或 $ (node autoDiDi.js > log.out 2>&1 &)
  exit # 必须通过exit退出xshell
  ```
- 强制关闭后台进程
  ```bash
  kill -9  $(ps -aux | grep autoDiDi | awk -F " " '{print $2}'| sed -n '2p')
  ```

## FQA

- 遇见 /xxx/autoClock/node_modules/puppeteer/.local-chromium/linux-756035/chrome-linux/chrome: `error` while loading shared libraries:
  ### Ubuntu 下解决方案
  ```bash
  cd /xxxx/autoClock/node_modules/puppeteer/.local-chromium/linux-756035/chrome-linux/
  ldd chrome|grep not
  #输出
  libgbm.so.1 => not found
  ......
  # 对没找到的包去https://packages.ubuntu.com/search?下搜索
  #然后对应安装
  sudo apt install libgbm-dev
  ```
- linux 下报错 Failed to launch the browser process!
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
- Ubuntu 下报错 Failed to launch the browser process! 感谢 DongjinLiu
  ```bash
  sudo apt-get install libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libnss3 libcups2 libxss1 libxrandr2 libasound2 libpangocairo-1.0-0 libatk1.0-0 libatk-bridge2.0-0 libgtk-3-0
  ```
- linux 下截图乱码  
  原始是因为 linux 默认不安装中文字体  
  此错误不解决，不影响程序功能  
  解决可参考博客 [Linux 安装中文字体](https://www.cnblogs.com/huangyanqi/p/10609587.html)

- Failed to set up Chromium r756035! Set "PUPPETEER SKIP DOWNLOAD" env variable to skip download.  
  原因是 puppeteer 中的 Chromium 下载不了。解决方案  
  使用`cnpm`

## 更新

1. 2020 年 6 月 7 日 22 点 49 分  
   新增多用户,只对 autoDiDi.js 修改.

2. 2020 年 6 月 12 日 09:19:28  
   解决 Bug，因为研究生按钮和本科生按钮换了 css 位置.

3. 2020 年 6 月 14 日 07:37:25  
   解决 Bug， Cannot read property 'contentDocument' of undefined  
   换为 page.frame 方式找到 iframe，然后 evaluate 操作 DOM  
   更新 autoDiDi_servidce_mode 和 autoDiDi_test

4. 2020 年 6 月 15 日 08:30:17  
   解决 Bug，css 位置又乱了。  
   服务器太慢，等待时间增加。  
   优化项目目录结构。

5. 2020 年 6 月 16 日 09:28:36  
   适应新版

6. 2020 年 7 月 18 日 10:03:11  
   9 日到 15 日一共 12 次打开失败,加入失败后重新打开机制
7. 2020 年 8 月 4 日 18:32:31  
   更新逻辑，存储一个循环列表，从列表尾部开始 pop，打卡失败，重新添加进队首，多次循环这个列表，尝试指定次数后仍失败会发送打卡失败提醒。
8. 2020 年 8 月 6 日 10:27:35  
   解决循环列表 pop 后下次再执行仍为空。
9. 2020 年 8 月 7 日 19:13:53  
   采纳 telepathphd 的建议，在运行 autoDiDi.js 时大概输出一下在做什么。
10. 2020 年 8 月 12 日 15:33:07  
    采纳 [telepathphd](https://github.com/telepathphd)的建议,在触发时间后的随机一小时内执行.
11. 2020 年 9 月 1 日 02:07:19  
    更新以适应新版,每天打卡一次,添加学院 school 选项.
12. 2020 年 11 月 19 日 16 点 06 分
    页面逻辑更改了,改为打开http://jkrb.xjtu.edu.cn/EIP/user/index.htm 这个网站。
13. 2021 年 1 月 1 日 15:49:13
    fix bug
14. 2021 年 1 月 1 日 16:28:04
    更改一些打卡逻辑。有些步骤不需要
15. 2021 年 3 月 1 日 12:59:06
    修改 bug,目前可用。

---

## 如果觉得此程序对您有用,给作者买个肉夹馍吧.

![avatar](https://github.com/zhang570221322/Figure_bed/blob/master/WeChat_Alipay.jpg?raw=true)
