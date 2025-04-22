'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId

var fields = {
   product_name:{type:String},
   product_image:{type:String},
   ingredients:{type:String},
   weight:{type:String},
   details:{type:String},
   fat:{type:String},
   protein:{type:String},
   carbohydrates:{type:String},
   energy:{type:String},
   acidity_as_citric_acid:{type:String},
   sugar:{type:String},
   calcium:{type:String},
   trans_fat:{type:String},
   saturated_fat:{type:String},
   sodium:{type:String},
   total_fat:{type:String},
   citric_acid:{type:String},
   taurine:{type:String},
   caffeine:{type:String},
   inositol:{type:String},
   niacin:{type:String},
   vitamin_b6:{type:String},
   vitamin_b3:{type:String},
   vitamin_b12:{type:String}
}

var productSchema = new Schema(fields, {timestamps: true});
  
module.exports = mongoose.model('product', productSchema);