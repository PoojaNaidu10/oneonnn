'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId

var fields = {
   name:{type:String},
   email_id:{type:String},
   password:{type:String}
}

var adminSchema = new Schema(fields, {timestamps: true});
  
module.exports = mongoose.model('admin', adminSchema);