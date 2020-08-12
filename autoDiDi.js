const my = require('./core/main');// 核心
const schedule = require('node-schedule'); // 定时任务
const YAML = require('yamljs'); //读取配置文件
const fs = require("fs"); // 解析
yaml_file="main.yml" //配置文件路径
const moment = require('moment');// 时间
const data = YAML.parse(fs.readFileSync(yaml_file).toString());


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  
var myfunction =function(temp_random){
    if(temp_random==new Date().getMinutes()){
        my(true)
        clearInterval(myInterval);
    }
}
var myInterval;
   
temp_min=Number(data['config']['scheduleJob'].split(" ")[1])
console.log(moment(Date.now()).format('YYYY/MM/DD HH:mm:ss')+" : 开始批量打卡,等待时间触发");
const  scheduleCronstyle = ()=>{

    schedule.scheduleJob( data['config']['scheduleJob'],()=>{
        temp_random=getRndInteger(temp_min+1,60)
        console.log(moment(Date.now()).format('YYYY/MM/DD HH:mm:ss')+" : 时间触发,系统将在第"+temp_random+"分执行");
        myInterval=setInterval(myfunction,5000,temp_random);
    }); 
}

scheduleCronstyle();
