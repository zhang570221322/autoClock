/**
 *
 * @Description 邮件发送 
 * 调用方法:sendMail('amor_zhang@qq.com','这是测试邮件', 'Hi Amor,这是一封测试邮件');
 * @Author zwl
 * @Created 2020年5月30日
 * 技术只是解决问题的选择,而不是解决问题的根本...
 * zwl,为发骚而生!
 *
 */
const email_user="zhangwl12306@163.com"
const email_pass="wdednd000"
const email_host="smtp.163.com"
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
smtpTransport = nodemailer.createTransport(smtpTransport({
    host:email_host,
    auth: {
        user: email_user,
        pass: email_pass
    }
}));
 
/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
var sendMail = function (recipient, subject,filename,path) {
    smtpTransport.sendMail({
        from: email_user,
        to: recipient,
        subject: subject,
        html:'<p>Clock Successfully .Have a nice day!</p>',
        //附加文件，提供cid给上面的img调用
        attachments:[
            {
               filename: filename,
               path:  path,
               cid:  filename 
            } 
        ]
 
    }, function (error, response) {
        if (error) {
            console.log("邮件发送失败");
            console.log(error);
        }
        console.log('邮件至:'+recipient+"成功")
    });
}
 
module.exports = sendMail;
