const apiErrors = require('../utils/apiErrors');
const apiResponse = require('../utils/apiResponse');


var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    md5 = require('md5'),
    config = require('../config/config')
    ObjectId = mongoose.Types.ObjectId,
    Admin = mongoose.models.admin


function createJWT(user) {
    var payload = {
        sub: { id: user._id},
        iat: moment().unix()
    }
    return jwt.encode(payload, config.TOKEN_SECRET);
}

const addAdmin = function (req, res) {

    let admin = new Admin(req.body)
    let name = req.body.name
    let emailId = req.body.email_id
    let password = req.body.password

    let hash = md5(password)
    admin.password = hash
    admin.save(function (err) {
        if (err) {
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        } else {
            return apiResponse.sendResponse(admin, 200, res)
        }
    })

}

const adminLogin = function (req, res) {
    let validationFields = []
    let emailId = req.body.email_id
    let password = req.body.password

    if (emailId == undefined || emailId == "") {
        validationFields.push('email')
    }

    if (password == undefined || password == "") {
        validationFields.push('password')
    }

        let hash = md5(password)
        Admin.findOne({ $and: [{ "email_id": emailId  }, { "password": hash }] }, async function (err, adminObject) {
            if (err) {
                return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
            } else {
                if (adminObject !== null) {
                    console.log(adminObject)
                    data = {}
                    data.token = createJWT(adminObject);   // create jwt
                    data.user = adminObject;

                    return apiResponse.sendResponse(data, 200, res);
                } else {
                    return apiResponse.sendErrorNoMobileEmail(null, 200, res)
                }
            }
        })
    
}



router.post('/admin/addAdmin', addAdmin)
router.post('/admin/adminLogin', adminLogin)




module.exports = router
