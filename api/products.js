const apiErrors = require('../utils/apiErrors');
const apiResponse = require('../utils/apiResponse');
const { route } = require('./admin');


var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Product = mongoose.models.product,
    ObjectId = mongoose.Types.ObjectId

    const addProduct = function(req, res){
        try{
            let product = new Product(req.body)
            product.save(function(err){
                if(err){
                    return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
                } else {
                    return apiResponse.sendResponse({message:"Product added successfully"}, 200, res)
                }
            })
        } catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const updateProduct = function(req, res){
        try{
            let productId = req.body.product_id
            Product.updateOne({"_id":ObjectId(productId)}, function(err, updatedProduct){
                if(err){
                    return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
                } else {
                    return apiResponse.sendResponse({message:"Product updated successfully"}, 200, res)
                }
            })
        } catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const getAllProductList = function(req, res){
        try{
            Product.find({}, function(err, productObjectList){
                if(err){
                    return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
                } else {
                    return apiResponse.sendResponse(productObjectList, 200, res)
                }
            })
        } catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const deleteProduct = function(req, res){
        try{
            let productId = req.query.product_id
            Product.deleteOne({"_id":ObjectId(productId)}, function(err, deletedProductObject){
                if(err){
                    return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
                } else {
                    return apiResponse.sendResponse({message:"Product deleted successfully"}, 200, res)
                }
            })
        } catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    router.post('/product/addProduct', addProduct)
    router.put('/product/updateProduct', updateProduct)
    router.get('/product/getAllProductList', getAllProductList)
    router.delete('/product/deleteProduct', deleteProduct)

    module.exports = router