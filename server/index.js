import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import User from "./model/users.js";
import Product from "./model/products.js";

import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3002;
const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect(`${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend server started on port ${PORT}`);
  });
  })
  .catch((err) => {
    console.error(`Mongodb connection error: ${err}`);
  });



app.post("/addComment", async (req, res) => {
  try {
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const userId = req.body.userId;
    const user = await User.findById(userId, 'username img');

    console.log(user)
    if (user) {
      const newComment = {
        userId: user,
        comment: req.body.comment,
      };

      if(req.body.reqType==="asks"){
        product.asks.push(newComment);
      }else{
        product.offers.push(newComment);
      }
      await product.save();

      res.status(200).json(newComment);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/addReplies", async (req, res) => {
  console.log(req.body)
  try {
    const product = await Product.findById(req.body.productId)
    const user = await User.findById(req.body.userId)

    if(!product || !user){
      res.status(400).json({error:'Product/User not found.'})
    }

    const newReply = {
      userId: user,
      comment: req.body.comment
    }

    if(req.body.filter==="asks"){
      product.asks[req.body.askIndex].replies.push(newReply)
    }else{
      product.offers[req.body.askIndex].replies.push(newReply)
    }
    await product.save();
    res.status(200).json(newReply);
  } catch (error) {
    console.log(error)
  }
});


app.post("/like", async (req, res) => {
  try {
    const product = await Product.findById(req.body.productId);
    const user = await User.findById(req.body.userId);
    if (!product || !user) {
      res.status(400).json({ error: 'Product/User not found.' });
      return;
    }
    if (req.body.reqType) {
      product.likes.push(user._id);
      await product.save();
    } else {
      const index = product.likes.indexOf(user._id);
      if (index !== -1) {
        product.likes.splice(index, 1);
        await product.save();
      }
    }
    res.status(200).json({ message: 'Like updated successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});
app.post("/createProduct", async(req,res)=>{
  try {
    const newProduct = new Product(req.body);
    const seller = await User.findById(req.body.seller);
    if(!seller){
      res.status(400).json({error:'Product/User not found.'})
    }else{
      await newProduct.save();
      res.status(200).json(seller);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ürün oluşturulurken bir hata oluştu." });
  }
});

app.post('/createUser', async(req,res)=>{
  console.log(req.body)
  var { username, email, password} = req.body
  if(!username || !email || !password){
    return res.status(400).json({ error: "Username, email and password is not empty." });
  }else{
    User.findOne({username: username}).then((user)=>{
      if(user){
        return res.status(202).json({ error: "The username is already associated with an existing account."})
      }else{
        bcrypt.hash(password, 10, (err,hash)=>{
          if(err){
            res.status(500).json({error: "hashing error"})
          }else{
            const newUser = new User({
              username: username,
              email: email,
              password: hash,
              img: 'https://images.gardrops.com/uploads/2712017/avatar_photo/2712017-avatar-large.jpg'
            });
            newUser.save().then(savedUser => {
              console.log(savedUser.password + " account is created.");
              res.status(200).json(savedUser);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ error: "Kullanıcı kaydetme hatası." });
            });
          }});
      }});
  }
})

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          console.log(err);
        } else if (result) {
          res.status(200).json(user);
        } else {
          res.status(202).json({ error:"Şifre yanlış."})
        }
      })} 
    else {
    res.status(202).json({ error:"Böyle bir hesap bulunamadı."})
    }
  }).catch((err) => {
    res.status(500).json({ error: err })});
  });



app.post('/api/products', async(req,res)=>{
  try{
    const products = await Product.find(req.body);
    res.status(202).json(products)
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Veritabanından ürünler alınamıyor.'});
  }
})

app.get('/profiles/:userName', async(req,res)=>{
  try {
    const userName = req.params.userName;
    const user = await User.findOne({username: userName})
    .populate({
      path: 'reviews.userId',
      model: 'User',
      select: 'username img'
    })
    .populate({
      path: 'reviews.productId',
      model: 'Product',
      select: 'img'
    })
    if(user){
      res.status(200).json(user)
    }else{
      res.status(500).json({error: 'User not find.'})
    }
  } catch (error) {
    console.log(error);
  }
})

app.get('/products/:productId', async (req, res) => {
  try {    
    const productId = req.params.productId;
    
    // Ürünü veritabanından çekmek için Mongoose veya başka bir veritabanı kütüphanesi kullanın
    const product = await Product.findById(productId)
    .populate('seller', 'username img reviews')
    .populate({
      path: 'buyers._id',
      model: 'User',
      select: 'username img'
    })
    .populate({
      path: 'asks.userId',
      model: 'User',
      select: 'username img'
    })
    .populate({
      path: 'asks.replies.userId',
      model: 'User',
      select: 'username img'
    })
    .populate({
      path: 'offers.userId',
      model: 'User',
      select: 'username img'
    })
    .populate({
      path: 'offers.replies.userId',
      model: 'User',
      select: 'username img'
    })
    const seller = await User.findById(product.seller, '-password -location -phoneNumber -email -favoriteProducts -products')
    .populate({
      path: 'reviews._id',
      model: 'User',
      select: 'username img'
    })
    if (!product) {
      return res.status(404).json({ error: 'Ürün bulunamadı' });
    }
    res.json({product, seller});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ürün getirilirken bir hata oluştu.' });
  }
});
