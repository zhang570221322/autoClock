const my = require('./core/main');// 核心
const schedule = require('node-schedule'); // 定时任务
const YAML = require('yamljs'); //读取配置文件
const fs = require("fs"); // 解析
yaml_file="main.yml" //配置文件路径
const data = YAML.parse(fs.readFileSync(yaml_file).toString());


const  scheduleCronstyle = ()=>{

    schedule.scheduleJob( data['config']['scheduleJob'],()=>{
        my(true)
    }); 
}

scheduleCronstyle();
