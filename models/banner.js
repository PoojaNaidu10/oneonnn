'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId

var fields = {
   type:{type:String},
   image:{type:String},
   position:{type:String}
}

var bannerSchema = new Schema(fields, {timestamps: true});
  
module.exports = mongoose.model('banner', bannerSchema);