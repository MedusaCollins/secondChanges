import mongoose from "mongoose";
const productsSchema={
    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      img: [{
        type: String,
        required: true
      }],
      price: {
        type: String,
        required: true,
      },
      dprice: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      usability: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
      },
      size: {
        type: String,
      },
      seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
      asks: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        replies: [{
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          comment: {
            type: String,
          },
        }],
      }],
      offers: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        replies: [{
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          comment: {
            type: String,
          },
        }],
      }],
    };

const Product = mongoose.model("Product", productsSchema);
export default Product;