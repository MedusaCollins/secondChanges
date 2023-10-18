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
    reviews: [{
      _id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      rating:{
        type: Number,
        required: true,
      },
      comment:{
        type:String,
        required:true
      }
      }],
  };
  
  const User = mongoose.model("User", userSchema);
  export default User;