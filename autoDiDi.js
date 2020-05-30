const puppeteer = require('puppeteer');//模拟操作
const moment = require('moment');// 时间
const schedule = require('node-schedule'); // 定时任务
const YAML = require('yamljs'); //读取配置文件
const fs = require("fs"); // 解析
const sendMail = require('./mail') //发送邮件
yaml_file="main.yml" //配置文件路径
const data = YAML.parse(fs.readFileSync(yaml_file).toString());
function my() {
  (async () => { 
    console.log(moment(Date.now()).format('YYYY-MM-DD-HH-mm-ss')+":开始填报")
    
    const browser = await puppeteer.launch({
      slowMo: 20,    //放慢速度
      headless: data['config']['noShowUI'],
      defaultViewport: {
        width: 1540,
        height: 1080,
        hasTouch: true,
        isMobile: false,
        deviceScaleFactor: 3,
      },
      ignoreHTTPSErrors: false, //忽略 https 报错
      args: [`--window-size=${1540},${1080}`,'--no-sandbox', '--disable-setuid-sandbox','--start-fullscreen'] //全屏打开页面
  });
      const page = await browser.newPage()
      const navigationPromise = page.waitForNavigation()
      
      await page.goto('http://one2020.xjtu.edu.cn/EIP/user/index.htm')
    
  
      // 登陆
      const username= await page.waitForSelector('.main > .main_info > .loginState > #form1 > .username')
      // 账户
      await username.type(data['user']['username'], {delay: 1});
      //密码
      const password = await page.waitForSelector('.main > .main_info > .loginState > #form1 > .pwd')
      await password.type(String(data['user']['password']), {delay: 1});
      await page.waitForSelector('.organizational #account_login')
      await page.click('.organizational #account_login') 
      await navigationPromise
      //进入服务大厅
      await page.waitForSelector('.header > .hall-tabs > ul > li:nth-child(1) > a')
      await page.click('.header > .hall-tabs > ul > li:nth-child(1) > a')
      await navigationPromise
    
      //选择研究生填报
      await page.waitFor(3000)
      frames1= await page.frames()
      const frame_48 =  frames1.find(f => f.url().includes('nonlogin/visitor/hallPage.htm'))
      await frame_48.waitForSelector('#popular-services > li:nth-child(3) > .card-link > .card-info-box > .card-info > .service-name')
      await frame_48.click('#popular-services > li:nth-child(3) > .card-link > .card-info-box > .card-info > .service-name')
      await navigationPromise
  
      //选择返校后填报
      await page.waitFor(3000)
      frames2= await page.frames()
      const frame_50 =  frames2.find(f => f.url().includes('/elobby/service/start.htm'))
      await frame_50.waitForSelector('.service-right-sidebar > .service-entrance > ul > .bl-item:nth-child(2) > .business-btn-text')
      await frame_50.click('.service-right-sidebar > .service-entrance > ul > .bl-item:nth-child(2) > .business-btn-text')
      await navigationPromise
      
      
      //开始填报
      await page.waitFor(12000)
      await page.evaluate((data) => {
        var my=(document.getElementsByTagName("iframe")[2]).contentDocument.getElementsByTagName("iframe")[0];
        //随机温度
        var random=Math.floor(Math.random()*10);
        // 绿色
        my.contentDocument.querySelector("#mini-2\\$ck\\$2").click();
        // 到过校园
        my.contentDocument.querySelector("#mini-72\\$ck\\$0").click();
        // 哪个校园
        my.contentDocument.querySelector("#XQ\\$value").value=data['user']['campus']
        // 36.5
        my.contentDocument.querySelector("#BRTW\\$text").value ="36."+random
        my.contentWindow.mini.get("BRTW").value="36."+random
      },data)
  
      //提交按钮
      frames4 = await page.frames()
      const frame_53 = frames4.find(f => f.url().includes('cooperative/openCooperative.htm'))
      await frame_53.waitForSelector('table #sendBtn')
      await frame_53.click('table #sendBtn')
      // 截图
      await page.screenshot({path: moment(Date.now()).format('YYYY-MM-DD-HH-mm-ss')+"_1.png"});//截个图
  
      // 确定按钮
      await page.waitFor(5000)
      frames5 = await page.frames()
      const frame_5_1 = frames5.find(f => f.url().includes('cooperative/openCooperative.htm'))
      // 确定
      var done= await frame_5_1.waitForSelector("#mini-17")
      await  done.click()
      // 截图
      var screenshot_dir_2=moment(Date.now()).format('YYYY-MM-DD-HH-mm-ss')+"_2.png"
      await page.screenshot({path: screenshot_dir_2});//截个图
      await browser.close()
      console.log(moment(Date.now()).format('YYYY-MM-DD-HH-mm-ss')+":结束填报")
      // 发送邮件
      sendMail(data['revMail'], screenshot_dir_2, screenshot_dir_2,"./"+screenshot_dir_2)
  })()
  

}

const  scheduleCronstyle = ()=>{

    schedule.scheduleJob( data['scheduleJob'],()=>{
      my()
    }); 
}

scheduleCronstyle();

