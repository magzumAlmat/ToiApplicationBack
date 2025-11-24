// const nodemailer = require('nodemailer');

// // Создаем транспорт для отправки писем через Gmail SMTP
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'almat.magzum@gmail.com', // Замените на свой адрес электронной почты Gmail
//     pass: 'wxhprftlxvgljeyn' // Замените на свой пароль от электронной почты Gmail
//   }
// });

// function sendEmail(to,subject,text) {
//     const mailOptions = {
//       from: 'almat.magzum@gmail.com', 
//       to: to, 
//       subject: subject,
//       html:text,
//     };
//   // Отправляем письмо
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email отправлен: ' + info.response);
//     }
//   });
// }

// module.exports=sendEmail;












const nodemailer = require('nodemailer');

// Создаем транспорт для отправки писем через Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'almatmagzum8@gmail.com', // Замените на свой адрес электронной почты Gmail
    pass: 'gyio oakj gvkl fxfa' // Замените на свой пароль от приложений
  }
});

function sendEmail(to,subject,text) {
    console.log('--- [sendMail.js] Attempting to send email ---');
    console.log('TO: ' + to);
    console.log('SUBJECT: ' + subject);
    const mailOptions = {
      from: 'almatmagzum8@gmail.com',
      to: to,
      subject: subject,
      html:text,
    };
  // Отправляем письмо
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('--- [sendMail.js] Error sending email ---');
      console.error(error);
    } else {
      console.log('--- [sendMail.js] Email sent successfully ---');
      console.log('Response: ' + info.response);
    }
  });
}

module.exports=sendEmail;