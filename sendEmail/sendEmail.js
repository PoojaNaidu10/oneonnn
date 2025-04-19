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
        from: "poojanaidu772@gmail.com",
        to: "poojanaidu772@gmail.com",
        subject: "ONEONNN - Contact Us",
       // html: "<p><p>Dear "+childName+",</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Gabha - the best academic Marathi Learning App for school students. As a part of our promotional offer, you can avail FREE access to our App for "+days+" days, starting today. Your trial period expires on "+endSubscriptionDate+".</p> <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Feel free to email us for any queries or feedback on contact@thegabha.com. We would like to hear from you.</p>Thanks,</br><br>Team Gabha</p>"
        html: "<p><p>Hi Team, </p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You have received a new inquiry through the Contact Us form on the website. Here are the details:<p>Name : "+name+"</p><p>Mobile No : "+mobileNo+"</p><p>Email Id : "+emailId+"</p><p>Subject : "+subject+"</p><p>Message : "+message+"</p>Please follow up with the user as soon as possible.</p></p>Thanks,</br><br>Team Oneonnn</p>"
       };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
      });
  }

  function sendSuperStockerEmail (name, businessName, state, city, emailId, mobileNo, existingDistributionExperience, wantToJoin){
    console.log("User email verify")
    var mailOptions = {
        from: "poojanaidu772@gmail.com",
        to: "poojanaidu772@gmail.com",
        subject: "ONEONNN - Super Stocker ",
        html: "<p><p>Hi Team, </p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You’ve received a new inquiry via the Super Stocker website's Contact Us form.Here are the details:<p>Name : "+name+"</p><p>Business Name : "+businessName+"</p><p>State : "+state+"</p><p>City : "+city+"</p><p>Email Id : "+emailId+"</p><p>Mobile No : "+mobileNo+"</p><p>Existing Distribution Experience : "+existingDistributionExperience+"</p><p>Want To Join : "+wantToJoin+"</p>Please respond to the user promptly.</p></p>Thanks,</br><br>Team Super Stocker web</p>"
       };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
      });
  }

  function sendEnquiryEmail (name, businessName, emailId, mobileNo, city, typeOfEnquiry, message){
    console.log("User email verify")
    var mailOptions = {
        from: "poojanaidu772@gmail.com",
        to: "poojanaidu772@gmail.com",
        subject: "ONEONNN - Enquiry Form",
        html: "<p><p>Hi Team, </p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A new inquiry has been submitted via the Super Stocker website. Please find the details below:<p>Name : "+name+"</p><p>Business Name : "+businessName+"</p><p>City : "+city+"</p><p>Email Id : "+emailId+"</p><p>Mobile No : "+mobileNo+"</p><p>Type Of Enquiry : "+typeOfEnquiry+"</p><p>Message : "+message+"</p>Please follow up with this user as soon as possible.</p></p>Thanks,</br><br>Team Inquiry web</p>"
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

