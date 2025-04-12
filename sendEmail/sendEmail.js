var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
config = require('../config/config');
var request = require("request");
var nodemailer=require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail', // or 'hotmail', etc.
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password' // Not your email password!
    }
  })

function sendContactUsEmail (childName,email,days,endSubscriptionDate){
    console.log("User email verify")
    var mailOptions = {
        from: "marathigabha@gmail.com",
        to: email,
        subject: "Gabha - Registration Complete ",
        html: "<p><p>Dear "+childName+",</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Gabha - the best academic Marathi Learning App for school students. As a part of our promotional offer, you can avail FREE access to our App for "+days+" days, starting today. Your trial period expires on "+endSubscriptionDate+".</p> <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Feel free to email us for any queries or feedback on contact@thegabha.com. We would like to hear from you.</p>Thanks,</br><br>Team Gabha</p>"
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
        from: "marathigabha@gmail.com",
        to: email,
        subject: "Gabha - Registration Complete ",
        html: "<p><p>Dear "+childName+",</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Gabha - the best academic Marathi Learning App for school students. As a part of our promotional offer, you can avail FREE access to our App for "+days+" days, starting today. Your trial period expires on "+endSubscriptionDate+".</p> <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Feel free to email us for any queries or feedback on contact@thegabha.com. We would like to hear from you.</p>Thanks,</br><br>Team Gabha</p>"
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
        from: "marathigabha@gmail.com",
        to: email,
        subject: "Gabha - Registration Complete ",
        html: "<p><p>Dear "+childName+",</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Gabha - the best academic Marathi Learning App for school students. As a part of our promotional offer, you can avail FREE access to our App for "+days+" days, starting today. Your trial period expires on "+endSubscriptionDate+".</p> <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Feel free to email us for any queries or feedback on contact@thegabha.com. We would like to hear from you.</p>Thanks,</br><br>Team Gabha</p>"
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

