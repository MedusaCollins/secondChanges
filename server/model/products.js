import mongoose from "mongoose";
const productsSchema={
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    img: [{
        type: String,
        required: true
      }],
    price:{
        type:String,
        required:true
    },
    dprice:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    usability:{
        type:String,
        required:true
    },
    brand:{
        type:String
    },
    size:{
        type:String
    },
    seller:[{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }],
    likes:[{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }],
    reviews: [{
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
          },
          rating: {
            type: Number,
            required: true
          },
          comment: {
            type: String,
            required: true
          }
        }]
}

const Product = mongoose.model("Product", productsSchema);
export default Product;