var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
config = require('../config/config'),
nodemailer=require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'poojanaidu772@gmail.com',
      pass: 'ndirdtxgtrxqzsvb' // Not your email password!
    }
  })

function sendContactUsEmail (name, mobileNo, emailId, subject, message){
    console.log("User email verify")
    console.log("--sendContactUsEmail----",name, mobileNo, emailId, subject, message)
    var mailOptions = {
        from: emailId,
        to: "poojanaidu772@gmail.com",
        subject: "ONEONNN - Contact Us",
       // html: "<p><p>Dear "+childName+",</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Gabha - the best academic Marathi Learning App for school students. As a part of our promotional offer, you can avail FREE access to our App for "+days+" days, starting today. Your trial period expires on "+endSubscriptionDate+".</p> <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Feel free to email us for any queries or feedback on contact@thegabha.com. We would like to hear from you.</p>Thanks,</br><br>Team Gabha</p>"
        html: "<p><p>Dear "+name+",</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is conract form Name "+name+"</p>"
       };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
      });
  }

  function sendSuperStockerEmail (childName,email,days,endSubscriptionDate){
    console.log("User email verify")
    var mailOptions = {
        from: "poojanaidu772@gmail.com",
        to: email,
        subject: "ONEONNN - Super Stocker ",
        html: "<p><p>Dear "+childName+",</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Super Stocker Form</p>Thanks,</br><br>Team Oneonnn</p>"
       };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
      });
  }

  function sendEnquiryEmail (childName,email,days,endSubscriptionDate){
    console.log("User email verify")
    var mailOptions = {
        from: "poojanaidu772@gmail.com",
        to: email,
        subject: "ONEONNN - Enquiry Form",
        html: "<p><p>Dear "+childName+",</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ebquiry Form</p>Thanks,</br><br>Team Oneonnn</p>"
       };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
      });
  }


  module.exports = {
    sendContactUsEmail,
    sendSuperStockerEmail,
    sendEnquiryEmail
  }

