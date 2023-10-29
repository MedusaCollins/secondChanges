import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import Iyzipay from "iyzipay";
import User from "./model/users.js";
import Product from "./model/products.js";
import { v4 as uuidv4 } from 'uuid';

import fileUpload from "express-fileupload";
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3001;
const uploadDir = './uploads';
const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use('/uploads', express.static(uploadDir));

mongoose.connect(`${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend server started on port ${PORT}`);
  });
  })
  .catch((err) => {
    console.error(`Mongodb connection error: ${err}`);
  });



  app.post("/saveUserData", async (req, res) => {
    let isChanged = 0;
    const user = await User.findById(req.body.user._id);
    const updatedData = req.body;
  
    try {
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      console.log(updatedData);
  
      if(updatedData.filePath!==null){
        user.img = updatedData.filePath
        isChanged=1;
      }
      if (updatedData.username && updatedData.username!==user.username){
          const existingUser = await User.findOne({ username: updatedData.username });
          if (existingUser) {
            return res.status(202).json({ error: "Username not unique." });
          }else{
            user.username = updatedData.username;
            isChanged=1;
            // return(res.status(200).json({error:''}))
          }
      }
      if(updatedData.email && updatedData.email!==user.email){
        const existingEmail = await User.findOne({ email: updatedData.email });
          if (existingEmail) {
            return res.status(202).json({ error: "Email not unique." });
          }else{
            isChanged=1;
            user.email = updatedData.email;
          }
      }

      if(updatedData.oldPassword==='' && updatedData.newPassword!==''){
        return res.status(202).json({error: "Old password cannot be empty."})
      }
      if (updatedData.oldPassword !== '') {
        // Yeni şifreyi kontrol etmek için bcrypt.compare kullanımı
        bcrypt.compare(updatedData.oldPassword, user.password, async (err, result) => {
          if (err) {
            console.log(err);
            res.status(202).json({ error: err });
          } else if (result) {
            if (updatedData.newPassword!=='') {
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(updatedData.newPassword, salt);
              user.password = hashedPassword;
              await user.save();
              isChanged=1;
              res.status(202).json({ message: "Success.", newPassword: updatedData.newPassword, email: updatedData.email });
            }else{
              res.status(202).json({ error: "Password cannot be empty." });
            }
          } else {
            res.status(202).json({ error: "Wrong password." });
          }
        });
      } else {
        
        if(isChanged){
          await user.save();
          res.status(202).json({ message: "Success.", email: updatedData.email});
        }else{
          res.status(202).json({error: "Nothing changed."})
        }
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

  app.post("/upload", async (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "Dosya yüklenemedi." });
    }
  
    const uploadedFile = req.files.file;
    uploadedFile.mv(`${uploadDir}/${uploadedFile.name}`, (err) => {
      if (err) {
        return res.status(500).json({ error: "Dosya kaydedilirken bir hata oluştu." });
      }
  
      // Dosya başarıyla kaydedildi
      res.json({ filePath: `/uploads/${uploadedFile.name}` });
    });
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

app.post("/editProduct",async(req,res)=>{
  try {
    const productId = req.body.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Ürün bulunamadı." });
    }
    product.name = req.body.name;
    product.description = req.body.description;
    product.img = req.body.img;
    product.price = req.body.price;
    product.dprice = req.body.dprice;
    product.gender = req.body.gender;

    await product.save();
    res.status(200).json({ message: "Ürün başarıyla güncellendi." });
  } catch (error) {
    res.status(500).json({ error: "Ürün güncellenirken bir hata oluştu." });
  }

})
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
  var { username, email, password} = req.body
  if(!username || !email || !password){
    return res.status(400).json({ error: "Username, email and password is can not be empty." });
  }else{
    User.findOne({ $or: [{ email: email }, { username: username }] }).then((user)=>{
      if(user){
        return res.status(202).json({ error: "The username/email is already associated with an existing account."})
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
  User.findOne({ $or: [{ email: req.body.emailorusername }, { username: req.body.emailorusername }] })
    .then((user) => {
      if (!user) {
        return res.status(202).json({ error: "Böyle bir hesap bulunamadı." });
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: err });
        }
        if (result) {
          return res.status(200).json(user);
        } else {
          return res.status(202).json({ error: "Şifre yanlış." });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});




  app.post('/api/products', async (req, res) => {
    try {
      const query = {};
      if (req.body.name) {
        const regexPattern = new RegExp(req.body.name, 'i');
        query.name = regexPattern;
      }
      if (req.body.gender) {
        query.gender = req.body.gender;
      }
      if(req.body.seller){
        query.seller = req.body.seller
      }
  
      const products = await Product.find(query);
      res.status(202).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Veritabanından ürünler alınamıyor.' });
    }
  });
  
  

app.get('/likes/:userName', async(req,res)=>{
  try {
    const user = await User.findOne({ username: req.params.userName });
    const products = await Product.find({likes: user._id})
    if(user){
      res.status(200).json(products)
    }else{
      res.status(500).json({error: 'User not find.'})
    }
  } catch (error) {
    console.log(error);
  }
});

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
    .populate({
      path: 'reviews.userId',
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

app.post('/paymentConfirm', async (req, res) => {
  // const { cardItems, user } = req.body;

  // try {
  //   const product = await Product.findById('652ee539b63906e5c5353bea');
  //   if (!product) {
  //     return res.status(404).json({ error: 'Product not found.' });
  //   }

  //   const newUser = await User.findById(user._id);
  //   if (newUser) {
  //     console.log("Kullanıcı bulundu.");
  //     const newBuyer = {
  //       _id: user,
  //       status: "Ürün hazırlanıyor.",
  //     };
  //     console.log(newBuyer)
  //     product.buyers.push(newBuyer);
  //     console.log(product)
  //     await product.save();
  //     res.status(200).json(newBuyer);
  //   } else {
  //     res.status(404).json({ error: 'User not found.' });
  //   }
  // } catch (error) {
  //   res.status(500).json(error);
  // }

  try {
    const productId = "652ee539b63906e5c5353bea"; // Ürünün _id değerini girin
  
    const product = await Product.findById(productId);
  
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
  
    // Hard code ile eklemek istediğiniz alıcı verisini oluşturun
    const newBuyer = {
      _id: "65268b1d5d258f6f2e494e2b", // Kullanıcının _id değeri
      status: "Ürün hazırlanıyor.",
      rating: 5, // Kullanıcının verdiği derecelendirme (isteğe bağlı)
      comment: "Ürünü beğendim." // Kullanıcının yorumu (isteğe bağlı)
    };
  
    product.buyers = newBuyer; // Alıcı bilgisini atama
  
    await product.save();
  
    res.status(200).json(newBuyer);
  } catch (error) {
    res.status(500).json(error);
  }

});
  
  // console.log(user);
  // try {
  //   for (let i = 0; i < cardItems.length; i++) {
  //     const cardItem = cardItems[i];
  //     const product = await Product.findById(cardItem._id);
  //     console.log(product)
      
  //     const buyer ={
  //       _id: user._id
  //     };
  //     product.buyers.push(buyer)

  //     await product.save();
  //   }

    // res.status(200).send("Satın alım başarılı.");
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("Bir hata oluştu.");
  // }
// });






app.post("/payment",(req,res)=>{
  const {cardHolderName,cardNumber,expireMonth,expireYear,cvc,contactName,phoneNumber,city,country,address,state,zipCode,user,cardItem} = req.body
  const id= uuidv4();
  let totalPrice = 0;
  let basketItems = [];

  const iyzipay = new Iyzipay({
    apiKey: process.env.IYZI_API_KEY,
    secretKey: process.env.IYZI_SEC_KEY,
    uri: process.env.IYZI_BASEURL
  });

  for (let i = 0; i < cardItem.length; i++) {
    const cardItem1 = cardItem[i];
    const itemPrice = cardItem1.dprice > 0 ? parseFloat(cardItem1.dprice) : parseFloat(cardItem1.price);
    totalPrice += itemPrice;

    basketItems.push({
      id: cardItem1._id,
      name: cardItem1.name,
      category1: cardItem1.gender,
      category2: cardItem1.type,
      itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
      price: cardItem1.dprice>0? cardItem1.dprice : cardItem1.price
  });
  }

  cardItem.map((product)=>{
      let totalPrice = 0;
        totalPrice += product.dprice > 0 ? parseFloat(product.dprice) : parseFloat(product.price);
  })


  const request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: uuidv4(),
    price: totalPrice,
    paidPrice: totalPrice,
    currency: Iyzipay.CURRENCY.USD,
    installment: '1',
    basketId: 'B67832',
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
        cardHolderName: cardHolderName,
        cardNumber: cardNumber,
        expireMonth: expireMonth,
        expireYear: expireYear,
        cvc: cvc,
        registerCard: '0'
    },
    buyer: {
        id: user._id,
        name: user.username,
        surname: user.username,
        gsmNumber: phoneNumber,
        email: user.email,
        identityNumber: user.username,
        lastLoginDate: ' ',
        registrationDate: '',
        registrationAddress: address,
        ip: '',
        city,
        country,
        zipCode
    },
    shippingAddress: {
        contactName,
        city,
        country,
        address,
        zipCode
    },
    billingAddress: {
      contactName,
      city,
      country,
      address,
      zipCode
    },
    basketItems: basketItems
};
iyzipay.payment.create(request, function (err, result) {
  if (err) {
    res.status(200).send("Hata: ", err);
  } else {
    res.status(200).send(result)
  }
});
})