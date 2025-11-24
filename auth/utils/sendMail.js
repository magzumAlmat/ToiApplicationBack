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
    pass: '586rtflf43DDD!' // Замените на свой пароль от электронной почты Gmail
  }
});

function sendEmail(to,subject,text) {
    const mailOptions = {
      from: 'almatmagzum8@gmail.com', 
      to: to, 
      subject: subject,
      html:text,
    };
  // Отправляем письмо
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email отправлен: ' + info.response);
    }
  });
}

module.exports=sendEmail;