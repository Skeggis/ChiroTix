const nodemailer = require('nodemailer');
const {createReceiptEmail} = require('../emails/receiptEmail')
const config = {
  mailserver: {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'carroll.erdman@ethereal.email',
      pass: 'y2jnQMBHpMacRdkAM9'
    }
  },

};

async function sendReceiptMail(link, from, to, subject, attachmentBuffer, orderDetails) {
  // create a nodemailer transporter using smtp
  console.log('about to send mail')
  let transporter = nodemailer.createTransport(config.mailserver);
  console.log('printing orderdetails')
  console.log(orderDetails)
  const mail = {
    from: from,
    to: to,
    subject: subject,
    html: createReceiptEmail(link, orderDetails.orderNr, orderDetails.eventName, orderDetails.buyerInfo.name, orderDetails.tickets.length, orderDetails.price),
    attachments:[{
      filename:"tickets.pdf",
      content: attachmentBuffer
    },{
      filename: 'chirotix.jpg',
      path: './images/chirotix.png',
      cid: 'chiroTix@kreata.ee'
    }
  ]
  }

  // send mail using transporter
  let info = await transporter.sendMail(mail);

  console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
};

module.exports={sendReceiptMail}

//sendReceiptMail().catch(console.error);