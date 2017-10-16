var nodemailer = require('nodemailer')
var nmailconfig = require('./nmailconfig.js')

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: nmailconfig
})

module.exports = (toList,subject,content) => {
var mailOptions = {
  from: 'hive@ms442.org', // sender address
  to: toList, // list of receivers
  subject: subject, // Subject line
  html: '<img src="cid:unique@kreata.ee" height=50/><br/>' + content,// plain text body
  attachments: [{
        filename: 'hivelogo.png',
        path: 'http://jaredasutton.com:3000/public/img/hivelogo.png',
        cid: 'unique@kreata.ee' //same cid value as in the html img src
    }]
}

transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
})

}