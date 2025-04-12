const apiErrors = require('../utils/apiErrors');
const apiResponse = require('../utils/apiResponse');
const { route } = require('./admin');


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

            return sendContactUsEmail(name, mobileNo, emailId, subject, message)
        }catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const addSuperStockerForm = function(req, res){
        try{
            let name = req.body.name

            return sendSuperStockerEmail(name)
        } catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const addEnquiryForm = function(req, res){
        try{
            let name = req.body.name

            return sendEnquiryEmail(name)
        } catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    router.post('/contactus/addContactUsForm', addContactUsForm)
    router.post('/superStocker/addSuperStockerForm', addSuperStockerForm)
    router.post('/enquiry/addEnquiryForm', addEnquiryForm)

    module.exports = router