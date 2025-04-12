'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId

var fields = {
   title:{type:String},
   image:{type:String},
   description:{type:String},
   date:{type:String}
}

var blogSchema = new Schema(fields, {timestamps: true});
  
module.exports = mongoose.model('blog', blogSchema);