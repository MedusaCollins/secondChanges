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

  // Örnek bir kullanıcı oluştur
// const user1 = new User({
//   username: 'exampleuser1',
//   email: 'user1@example.com',
//   password: 'password1',
// });

// const freshUser = new User({
//   username: 'Satıcı18',
//   email: 'satici@example.com',
//   password: 'sattimgitti',
//   img: 'https://images.gardrops.com/uploads/2712017/avatar_photo/2712017-avatar-large.jpg',
//   location: 'Turkey',
//   phoneNumber: '5442859156',
//   products: [{ _id: '652033a619ef510ced82dd8e' }],
//   favoriteProducts: [{ _id: '652064b0a0037fe4650e53b1' }],
  // reviews: [
  //   {
  //     _id: '651d5af90e8dd5e4b145ce84',
  //     rating: 5,
  //     comment: 'Gerçekten güzel bir ürünmüş, iyi ki almışım!',
  //   },
  //   {
  //     _id: '6520269ff6ae91043fd18290',
  //     rating: 2,
  //     comment: 'Berbat bir ürün, aldığım ürünün hiç yazdığı gibi yeni değil aksine çok eskimiş.',
  //   },
  //   {
  //     _id: '6520269ff6ae91043fd1828f',
  //     rating: 3,
  //     comment: 'Yaani ne çok kötü ne çok iyi.',
  //   },
  // ],
// });
// freshUser.save();
// const product3 = new Product({
//   name: 'American Vintage',
//   description: "Mınık leke var . Yıkama yapmadım cıkabılır . SON FİYATTIR ☘️ Boyum 172 kılom 60 m bedenim bende gorseldekı gıbı duruyor. Depoda kaldıgı ıcın kirlidir yıkama yapılmalı bılgınız olsun. 🌸",
//   img: ['https://dolap.dsmcdn.com/dlp_230503_2/product/org/kadin/gomlek/s-36-american-vintage_1248542116.jpg', 'https://dolap.dsmcdn.com/dlp_230817_1/product/org/kadin/gomlek/s-36-american-vintage_1248542117.jpg','https://dolap.dsmcdn.com/dlp_230817_1/product/org/kadin/gomlek/s-36-american-vintage_1248542118.jpg','https://dolap.dsmcdn.com/dlp_230817_1/product/org/kadin/gomlek/s-36-american-vintage_1248542119.jpg'],
//   price: '35',
//   dprice: '',
//   type: 'Giyim',
//   gender: 'Women',
//   usability: 'Az Kullanılmış',
//   brand: 'Collins',
//   size: 'S',
//   seller: '6522a031db2c4a18d6faf7fc',
//   likes: ['6520269ff6ae91043fd1828f','6520269ff6ae91043fd18290'],
//   asks: [
//     {
//       _id: '6520269ff6ae91043fd1828f',
//       comment: 'Vayyy çokiyimis',
//       replies: [
//         {
//           _id: '6522a031db2c4a18d6faf7fc',
//           comment: 'Aynen',
//         },
//       ],
//     },
//     {
//       _id: '6520269ff6ae91043fd18290',
//       comment: 'A',
//     },
//   ],
//   offers: [
//     {
//       _id: '6520269ff6ae91043fd1828f',
//       comment: '20 olur mu',
//       replies: [
//         {
//           _id: '6522a031db2c4a18d6faf7fc',
//           comment: 'Hayır',
//         },
//       ],
//     }
//   ],
// });
// product3.save()




app.post("/addComment", async (req, res) => {
  // console.log(req.body)
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

      product.asks.push(newComment);
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

  console.log(req.body);
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

    product.asks[req.body.askIndex].replies.push(newReply)

    await product.save();
    res.status(200).json(newReply);
  } catch (error) {
    console.log(error)
  }
  // try {
  //   console.log(req.body)
  //   const { commentId, userId, comment } = req.body;


  //   // Parametre denetimi
  //   if (!commentId || !userId || !comment) {
  //     return res.status(400).json({ error: 'Missing parameters.' });
  //   }

  //   // Ürünü ve kullanıcıyı sorgula
  //   const product = await Product.findById(commentId);        Productdata notdefined çözmek için product'ı önce findbyid ile bulmasını sağla
  //   const user = await User.findById(userId, 'username img');

  //   if (!product) {
  //     return res.status(404).json({ error: 'Product not found.' });
  //   }

  //   if (!user) {
  //     return res.status(404).json({ error: 'User not found.' });
  //   }

  //   // Yeni yanıt oluştur
  //   const newReply = {
  //     userId: userId,
  //     comment: comment,
  //   };

  //   // Yanıtı ekleyip kaydet
  //   product.asks.forEach((ask) => {
  //     ask.replies.push(newReply);
  //   });

  //   await product.save();

  //   res.status(200).json(newReply);
  // } catch (error) {
  //   res.status(500).json({ error: 'An error occurred.' });
  // }
});

app.post("/createProduct", async(req,res)=>{
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    const seller = await User.findById(req.body.seller);
    seller.products.push(newProduct);
    await seller.save();
    res.status(200).json(seller);
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

app.post('/findUser', async(req,res)=>{
  try {
    const user = await User.findbyId(req.body._id)
    res.status(202).json(user)
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err});
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
      path: 'offers._id',
      model: 'User',
      select: 'username img'
    })
    .populate({
      path: 'offers.replies._id',
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
