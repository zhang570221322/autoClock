const puppeteer = require('puppeteer');//模拟操作
const moment = require('moment');// 时间
const schedule = require('node-schedule'); // 定时任务
const YAML = require('yamljs'); //读取配置文件
const fs = require("fs"); // 解析
const sendMail = require('./mail') //发送邮件
yaml_file="./temp_main.yml" //配置文件路径
const data = YAML.parse(fs.readFileSync(yaml_file).toString());
async function my_main(_user,test,sign) {
  
    var browser;
    
    try {
      // 打卡浏览器
      browser= await get_mybrowser();
     console.log(moment(Date.now()).format('YYYY-MM-DD-HH-mm-ss')+":开始填报"+"----"+String(_user['username']))
  
       const sleepTime=5000
      
        const page = await browser.newPage()
        const navigationPromise = page.waitForNavigation()
        
        await page.goto('http://one2020.xjtu.edu.cn/EIP/user/index.htm')
      
        await page.waitFor(sleepTime)
        // 登陆
        const username= await page.waitForSelector('.main > .main_info > .loginState > #form1 > .username')
        // 账户
        await username.type(String(_user['username']), {delay: 1});
        // 密码
        const password = await page.waitForSelector('.main > .main_info > .loginState > #form1 > .pwd')
        await password.type(String(_user['password']), {delay: 1});
        await page.waitForSelector('.organizational #account_login')
        await page.click('.organizational #account_login') 
        await navigationPromise
        await page.waitFor(sleepTime)
        // 健康每日报
        await page.goto('http://jkrb.xjtu.edu.cn/EIP/user/index.htm')
        await navigationPromise

        if (_user['type']  == "研究生") {
            // 选择研究生填报
            await page.waitFor(sleepTime)
            frames1= await page.frames()
            const frame_48 =  frames1.find(f => f.url().includes('elobby/service/portlet.htm'))
            await frame_48.waitForSelector('#form > div.service-wrap > div > ul.service-hall.hottest-services > li:nth-child(1) > div > a > div > div')
            await frame_48.click('#form > div.service-wrap > div > ul.service-hall.hottest-services > li:nth-child(1) > div > a > div > div')
            await navigationPromise 
        } else if(_user['type']  == "本科生") {
            // 选择本科生填报
            await page.waitFor(sleepTime)
            frames1= await page.frames()
            const frame_48 =  frames1.find(f => f.url().includes('elobby/service/portlet.htm'))
            await frame_48.waitForSelector('#form > div.service-wrap > div > ul.service-hall.hottest-services > li:nth-child(2) > div > a > div > div')
            await frame_48.click('#form > div.service-wrap > div > ul.service-hall.hottest-services > li:nth-child(2) > div > a > div > div')
            await navigationPromise
        }else{
          console.log("_user['type']："+_user['type']+"输入有误");
        }
    
        //选择返校后填报
        await page.waitFor(sleepTime)
        frames2= await page.frames()
        const frame_50 =  frames2.find(f => f.url().includes('/elobby/service/start.htm'))
        await frame_50.waitForSelector('body > div > div.service-right-sidebar > div.service-entrance > ul > li:nth-child(2)')
        await frame_50.click('body > div > div.service-right-sidebar > div.service-entrance > ul > li:nth-child(2)')
        await navigationPromise

        // 开始填报
        await page.waitFor(sleepTime)
        await page.waitFor(sleepTime)
        await page.waitFor(sleepTime)
        frames2= await page.frames()
        const frame_51 = frames2.find(f => f.url().includes('flow/flowForm'))
        await frame_51.evaluate((_user) => {
          // 随机温度
          var random=Math.floor(Math.random()*10);
          // 绿色
          $(document.querySelector("#mini-2\\$ck\\$2")).click()
          // 到过校园
          document.querySelector("#mini-72\\$ck\\$0").click();
          // 哪个校园
          document.querySelector("#SZXQ\\$value").value=_user['campus']
          // 36.5 
          document.querySelector("#BRTW\\$text").value ="36."+random
          mini.get("BRTW").value="36."+random
          // 近14日内本人或家属是否去过中高风险区？
          document.querySelector("#mini-95\\$ck\\$1").click()
          // 14日内本人或家属是否同中高风险区返回人员接触过？
          document.querySelector("#mini-99\\$ck\\$1").click()
        },_user)
        //上午下午
        // const x_y=(await (await frame_51.$("#SXW > .mini-buttonedit-border > .mini-buttonedit-buttons > .mini-buttonedit-button")).boundingBox());
        // await page.mouse.move(x_y['x'],x_y['y']);
        // await page.mouse.down();
        // await page.mouse.up();
        // if (new Date().getHours() < 12) {
        //   frame_51.click('.mini-grid-rows-content > .mini-listbox-items > tbody > #mini-72\\$0 > td:nth-child(2)')
        // }else{
        //   // document.querySelector("#SXW\\$value").value="下午"
        //   // mini.get("SXW").value="下午"
        //   frame_51.click('.mini-grid-rows-content > .mini-listbox-items > tbody > #mini-72\\$1 > td:nth-child(2)')
        // }
        
    
        // 提交按钮
        frames4 = await page.frames()
        const frame_53 = frames4.find(f => f.url().includes('cooperative/openCooperative.htm'))
        await frame_53.waitForSelector('table #sendBtn')
        await frame_53.click('table #sendBtn')
        // 截图
        await page.screenshot({path: moment(Date.now()).format('YYYY-MM-DD-HH-mm-ss')+"_1.png"});//截个图
        
        // 确定按钮
        await page.waitFor(sleepTime)
        frames5 = await page.frames()
        const frame_5_1 = frames5.find(f => f.url().includes('cooperative/openCooperative.htm'))
        // 确定
        var done= await frame_5_1.waitForSelector("#mini-17")
        await  done.click()
        // 截图
        var screenshot_dir_2=moment(Date.now()).format('YYYY-MM-DD-HH-mm-ss')+"_2.png"
        await page.screenshot({path: screenshot_dir_2});//截个图
        await page.waitFor(sleepTime)
         //验证打卡成功否
        await page.waitFor(sleepTime)
        frames2= await page.frames()
        const frame_55 =  frames2.find(f => f.url().includes('/elobby/service/start.htm'))
        await frame_55.waitForSelector('.service-right-sidebar > .service-entrance > ul > .bl-item:nth-child(2) > .business-btn-text')
        await frame_55.click('.service-right-sidebar > .service-entrance > ul > .bl-item:nth-child(2) > .business-btn-text')
        await browser.close()
        console.log(moment(Date.now()).format('YYYY-MM-DD-HH-mm-ss')+":结束填报"+"----"+String(_user['username']))
        // 发送邮件
        sendMail(_user['revMail'], "打卡成功 Clock Successfully ", screenshot_dir_2,"./"+screenshot_dir_2)
        return true;
  
      } catch(err){
        
        console.log(err);
        var message;
        if(sign==2){
          message="注意,系统第二次尝试打卡失败或已经打过卡. 如无,请手动打卡"
        }
        if(sign==1){
          message= "注意,打卡失败或已经打过卡. 系统会再尝试打卡一次"
        }
   
        if(test){
        console.log(moment(Date.now()).format('YYYY-MM-DD-HH-mm-ss')+":结束填报,打卡失败"+"----"+String(_user['username']))
        sendMail(_user['revMail'], message, screenshot_dir_2,"")
        await browser.close()
        }
         return   false
      }
  
}
async function get_mybrowser(){
  browser = await puppeteer.launch({
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
    args: [`--window-size=${1540},${1080}`,'--no-sandbox', '--disable-setuid-sandbox','--start-fullscreen'] //全屏打卡页面
 });
 return browser;
}
function my(test){
 
  (async () => { 
 
     //  遍历users
     var _user;
   
    for(id in data['users']){
        // 锁定user
        _user=data['users'][id];
        // 打卡第一次
        temp1= await my_main(_user,test,1)
        if(!temp1){
          console.log("temp1=",temp1);
          await  my_main(_user,test,2)
        }
      }
  
})()
}
module.exports = my;
