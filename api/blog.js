const apiErrors = require('../utils/apiErrors');
const apiResponse = require('../utils/apiResponse');
const { route } = require('./admin');


var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Blog = mongoose.models.blog,
    ObjectId = mongoose.Types.ObjectId

    const addBlog = function(req, res){
        try{
            let blog = new Blog(req.body)
            blog.save(function(err){
                if(err){
                    return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
                } else{
                    return apiResponse.sendResponse({message:"Blog added successfully"}, 200, res)
                }
            })
        } catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const updateBlog = function(req, res){
        try{
            let blogId = req.body.blog_id
            Blog.updateOne({"_id":ObjectId(blogId)},{$set:req.body}, function(err, updatedBlog){
                if(err){
                    return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
                } else {
                    console.log("---updatedBlog---",updatedBlog)
                    return apiResponse.sendResponse({message:"Blog updated successfully"}, 200, res)
                }
            })
        } catch(err){
            console.log("error",err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const getAllBlog = function(req, res){
        try{
            Blog.find({}, function(err, blogObjectList){
                if(err){
                    return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
                } else {
                    return apiResponse.sendResponse(blogObjectList, 200, res)
                }
            })
        } catch(err){
            console.log("error", err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }

    const deleteBlog = function(req, res){
        try{
            let blogId = req.query.blog_id

            Blog.deleteOne({"_id":ObjectId(blogId)}, function(err, deletedBlogObject){
                if(err){
                    return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
                } else {
                    return apiResponse.sendResponse({message:"Blog deleted successfully"}, 200, res)
                }
            })
        } catch(err){
            console.log("error", err)
            return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
        }
    }
    

    router.post('/blog/addBlog', addBlog)
    router.put('/blog/updateBlog', updateBlog)
    router.get('/blog/getAllBlog', getAllBlog)
    router.delete('/blog/deleteBlog', deleteBlog)


module.exports = router