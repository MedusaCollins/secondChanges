import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: String,
    location: String,
    phoneNumber: String,
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    favoriteProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  };
  
  const User = mongoose.model("User", userSchema);
  export default User;