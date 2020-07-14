# autoClock | 西安交通大学每日健康打卡脚本

> 疫情 健康 打卡  XJTU  
> 需要进行过一次手动打卡，系统自动填充表单数据

## 功能

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

> 打卡成功会发送截图至反馈邮箱

## 软件包

[nodejs32位](https://npm.taobao.org/mirrors/node/v14.4.0/node-v14.4.0-x86.msi)   
[nodejs64位](https://npm.taobao.org/mirrors/node/v14.4.0/node-v14.4.0-x64.msi)


## 快速开始

```bash 
git clone https://github.com/zhang570221322/autoClock
cd autoClock
# 添加npm淘宝镜像
npm config set registry https://registry.npm.taobao.org
# 添加electron淘宝镜像
npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
# 执行安装
npm install

## 修改账户密码和其他
# 修改main.yml

# 打开一次
node temp_autoDiDi.js
# 定时打开
node autoDiDi.js

```


## 修改账户密码和其他

如果觉得网速过慢（默认5秒），可以改core/main.js的`const sleepTime=5000`  

main.yml 配置文件

```yml
config: 
# 显示UI
# linux下必须为true
  noShowUI: false
# 每天10点和16点的1分20秒定时执行一次
  scheduleJob: 20 1 10,16 * * *
users: 
  -
    # 用户1
    username: xxxxxx
    password: xxxxxx
    # 本科生 || 研究生
    type: 研究生
    # 到过校园
    # 创新港校区 || 兴庆校区 || 雁塔校区 || 曲江校区
    campus: 创新港校区
    # 接受打卡成功反馈的邮箱
    revMail: xxxxxxxxx@qq.com
  -
    #用户2
    username: 2
    password: xxxxxx
    # 本科生 || 研究生
    type: 研究生
    # 到过校园
    # 创新港校区 || 兴庆校区 || 雁塔校区 || 曲江校区
    campus: 创新港校区
    # 接受打卡成功反馈的邮箱
    revMail: xxxxxxxxx@qq.com
```



> linux 下后台运行

```bash
nohup  node autoDiDi.js > log.out 2>&1 &
# 必须通过exit 退出xshell
exit
```

脚本定时执行，一次打卡成功会生成日志和两张截图.   
截图命名方式为`YYYY-MM-DD-HH-mm-ss_1.png` ,  `YYYY-MM-DD-HH-mm-ss_2.png`

## 添加注册为windows服务模式

> 推荐一个工具 easy-service

> 依赖配置好以后

```bash
node temp_autoDiDi.js
# 运行task.bat，执行一次 
# 可以注册为系统定时任务
```

## FQA

- linux下报错   Failed to launch the browser process!
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
- Ubuntu下报错   Failed to launch the browser process! 感谢DongjinLiu
  ```bash
  sudo apt-get install libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libnss3 libcups2 libxss1 libxrandr2 libasound2 libpangocairo-1.0-0 libatk1.0-0 libatk-bridge2.0-0 libgtk-3-0
  ``` 
- linux下截图乱码  
原始是因为linux默认不安装中文字体  
此错误不解决，不影响程序功能   
解决可参考博客 [Linux安装中文字体](https://www.cnblogs.com/huangyanqi/p/10609587.html)

- Failed to set up Chromium r756035! Set "PUPPETEER SKIP DOWNLOAD" env variable to skip download.  
  原因是puppeteer与nodejs的版本冲突问题。解决方案
  ```Bash
  sudo npm install puppeteer@1.8.0 --unsafe-perm=true --allow-root
  ```
  或更新nodejs至12.X+
## 更新
1. 2020年6月7日 22点49分  
新增多用户,只对autoDiDi.js修改. 

2. 2020年6月12日09:19:28  
解决Bug，因为研究生按钮和本科生按钮换了css位置.

3. 2020年6月14日07:37:25  
解决Bug， Cannot read property 'contentDocument' of undefined  
换为page.frame方式找到iframe，然后evaluate操作DOM  
更新autoDiDi_servidce_mode和autoDiDi_test  

4. 2020年6月15日08:30:17  
解决Bug，css位置又乱了。  
服务器太慢，等待时间增加。  
优化项目目录结构。  

5. 2020年6月16日09:28:36  
适应新版

如果觉得此程序对您有用,给作者买个肉夹馍吧.
--------------
![avatar](https://www.cszhang.cn/WeChat_Alipay.jpg) 