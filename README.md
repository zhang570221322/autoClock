# autoClock | 西安交通大学每日健康打卡脚本

> 疫情 健康 打卡  XJTU  
> 需要进行过一次手动打卡，系统自动填充表单数据

## 功能

程序会根据`Crontab`的时间参数随机定时进行有浏览器窗口(UI)或无UI的打卡,成功会发送截图至反馈邮箱.
表单其他数据都会按默认,脚本自动完成的填写有.
1. 选择健康每日填报
2. 选择绿色码
3. 已经阅知
4. 已取得西安市一码通
5. 填写学院
6. 填写当前体温，随机温度 36.X  
> 截图命名方式为 **YYYY-MM-DD-HH-mm-ss_1.png** ,  **YYYY-MM-DD-HH-mm-ss_2.png**
## 软件包
* widows  
  [nodejs32位](https://npm.taobao.org/mirrors/node/v14.4.0/node-v14.4.0-x86.msi)   
  [nodejs64位](https://npm.taobao.org/mirrors/node/v14.4.0/node-v14.4.0-x64.msi)
* linux   
  `curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -`
* Ubuntu  
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
  -
    # 用户1
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
  -
    #用户2
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


##  后台运行
* widows下两种方法   
1.将`node autoDiDi_Once.js`添加为windows定时计划任务  
2.使用**easy-service**将`node autoDiDi_Once.js`注册为系统服务.  
* linux内核下  
  ```bash
  nohup  node autoDiDi.js > log.out 2>&1 &
  #或 $ (node autoDiDi.js > log.out 2>&1 &)
  exit # 必须通过exit退出xshell
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
  原因是puppeteer中的Chromium下载不了。解决方案  
  使用`cnpm`
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

6. 2020年7月18日10:03:11  
   9日到15日一共12次打开失败,加入失败后重新打开机制
7. 2020年8月4日18:32:31  
   更新逻辑，存储一个循环列表，从列表尾部开始pop，打卡失败，重新添加进队首，多次循环这个列表，尝试指定次数后仍失败会发送打卡失败提醒。
8. 2020年8月6日10:27:35  
   解决循环列表pop后下次再执行仍为空。
9. 2020年8月7日19:13:53   
   采纳 telepathphd 的建议，在运行autoDiDi.js时大概输出一下在做什么。  
10. 2020年8月12日15:33:07  
    采纳 [telepathphd](https://github.com/telepathphd)的建议,在触发时间后的随机一小时内执行.
11. 2020年9月1日02:07:19  
    更新以适应新版,每天打卡一次,添加学院school选项.
12. 2020年11月19日 16点06分
    页面逻辑更改了,改为打开http://jkrb.xjtu.edu.cn/EIP/user/index.htm 这个网站。
------

如果觉得此程序对您有用,给作者买个肉夹馍吧.
--------------
![avatar](https://github.com/zhang570221322/Figure_bed/blob/master/WeChat_Alipay.jpg?raw=true)