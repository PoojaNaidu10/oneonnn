const apiErrors = require('../utils/apiErrors');
const apiResponse = require('../utils/apiResponse');
const { route } = require('./admin');
const sendMessage = require('../sendEmail/sendEmail')

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose')

    const addContactUsForm = function(req, res){
        try{
            let name = req.body.name
            let mobileNo = req.body.mobile_no
            let emailId = req.body.email_id
            let subject = req.body.subject
            let message = req.body.message
            console.log("---sendContactUsEmail----",name, mobileNo, emailId, subject, message)
            sendMessage.sendContactUsEmail(name, mobileNo, emailId, subject, message)
            return apiResponse.sendResponse({message:"Email sent sucessfully"}, 200, res)
        }catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const addSuperStockerForm = function(req, res){
        try{
            let name = req.body.name
            let businessName = req.body.business_name
            let state = req.body.state
            let city = req.body.city
            let emailId = req.body.email_id
            let mobileNo = req.body.mobile_no
            let existingDistributionExperience = req.body.existing_distribution_experience
            let wantToJoin = req.body.want_to_join

            sendMessage.sendSuperStockerEmail(name, businessName, state, city, emailId, mobileNo, existingDistributionExperience, wantToJoin)
            return apiResponse.sendResponse({message:"Email sent sucessfully"}, 200, res)
        } catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const addEnquiryForm = function(req, res){
        try{
            let name = req.body.name
            let businessName = req.body.business_name
            let emailId = req.body.email_id
            let mobileNo = req.body.mobile_no
            let city = req.body.city
            let typeOfEnquiry = req.body.type_of_enquiry
            let message = req.body.message

            sendMessage.sendEnquiryEmail(name, businessName, emailId, mobileNo, city, typeOfEnquiry, message)
            return apiResponse.sendResponse({message:"Email sent sucessfully"}, 200, res)
        } catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    router.post('/contactus/addContactUsForm', addContactUsForm)
    router.post('/superStocker/addSuperStockerForm', addSuperStockerForm)
    router.post('/enquiry/addEnquiryForm', addEnquiryForm)

    module.exports = router