const apiErrors = require('../utils/apiErrors');
const apiResponse = require('../utils/apiResponse');
const { route } = require('./admin');


var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Banner = mongoose.models.banner,
    ObjectId = mongoose.Types.ObjectId

    const addHomeScreenBanner = function(req, res){
        try{
            let banner = new Banner(req.body)
            banner.save(function(err){
                if(err){
                    return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
                } else {
                    return apiResponse.sendResponse({message:"Home screen banner added successfully"}, 200, res)
                }
            })
        } catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const updateHomescreen = function(req, res){
        try{
            let bannerId = req.body.banner_id
            Banner.updateOne({"_id":ObjectId(bannerId)},{$set:req.body}, function(err, updatedBanner){
                if(err){
                    return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
                } else {
                    return apiResponse.sendResponse({message:"Home screen updated successfully"}, 200, res)
                }
            })
        } catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const getAllHomeScreenList = function(req, res){
        try{
            Banner.find({}, function(err, bannerObjectList){
                if(err){
                    return apiResponse.apiErrors(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
                } else {
                    return apiResponse.sendResponse(bannerObjectList, 200, res)
                }
            })
        } catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const deleteHomeScreenBanner = function(req, res){
        try{
            let bannerId = req.query.banner_id
            Banner.deleteOne({"_id":ObjectId(bannerId)}, function(err, deletedObject){
                if(err){
                    return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
                } else {
                    return apiResponse.sendResponse({message:"Home screen banner deleted successfully"}, 200, res)
                }
            })
        } catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const isPositionExist = async function(req, res){
        try{
            let position = req.query.position
            let isPositionExistObject = await Banner.findOne({"position":position})
            if(isPositionExistObject != null){
                return apiResponse.sendResponse({"isExist":true}, 200, res)
            } else {
                return apiResponse.sendResponse({"isExist":false}, 200, res)
            }
        } catch(err){
            console.log("----err-----",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const isUpdatePositionExist = async function (req, res) {
        try {
            const position = req.query.position;
            const bannerId = req.query.banner_id; 
    
            
            // const query = {
            //     position: position
            // };
            // if (bannerId) {
            //     query._id = { $ne: bannerId };
            // }
    
            const isPositionExistObject = await Banner.findOne({$and:[{"position":position},{"_id":{$ne:bannerId}}]});
            console.log("-----isPositionExistObject------",isPositionExistObject)
            if (isPositionExistObject != null) {
                return apiResponse.sendResponse({ isExist: true }, 200, res);
            } else {
                return apiResponse.sendResponse({ isExist: false }, 200, res);
            }
        } catch (err) {
            console.log("----err-----", err);
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res);
        }
    }
    

    router.post("/banner/addHomeScreenBanner", addHomeScreenBanner)

    router.get("/banner/isPositionExist", isPositionExist)
    router.get("/banner/isUpdatePositionExist", isUpdatePositionExist)

    router.put("/banner/updateHomescreen", updateHomescreen)
    router.get("/banner/getAllHomeScreenList", getAllHomeScreenList)
    router.delete("/banner/deleteHomeScreenBanner", deleteHomeScreenBanner)

    module.exports = router