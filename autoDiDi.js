const my = require('./core/main');// 核心
const schedule = require('node-schedule'); // 定时任务
const YAML = require('yamljs'); //读取配置文件
const fs = require("fs"); // 解析
yaml_file="main.yml" //配置文件路径
const moment = require('moment');// 时间
const data = YAML.parse(fs.readFileSync(yaml_file).toString());


const  scheduleCronstyle = ()=>{
   
    schedule.scheduleJob( data['config']['scheduleJob'],()=>{
        log=moment(Date.now()).format('YYYY-MM-DD-HH')+": 开始批量打卡"
        console.log(log);
        my(true)
        log=moment(Date.now()).format('YYYY-MM-DD-HH')+": 结束批量打卡"
        console.log(log);
    }); 
}

scheduleCronstyle();
