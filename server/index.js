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
const user1 = new User({
  username: 'exampleuser1',
  email: 'user1@example.com',
  password: 'password1',
});

const user2 = new User({
  username: 'exampleuser2',
  email: 'user2@example.com',
  password: 'password2',
});

const product2 = new Product({
  name: 'Ürün 4',
  description: 'Ürün 3 açıklaması',
  img: ['https://dolap.dsmcdn.com/dlp_231003_1/product/org/kadin/bluz/s-36-h-m_1244524095.jpg', 'resim4.jpg'],
  price: '50',
  dprice: '45',
  type: 'Giyim',
  gender: 'Erkek',
  usability: 'Yeni',
  brand: 'Başka Bir Marka',
  size: 'XL',
  seller: [{ user: user2 }],
  likes: [{ user: user1 }],
  reviews: [
    {
      user: user1,
      rating: 5,
      comment: 'Harika bir ürün4!',
    },
    {
      user: user1,
      rating: 4,
      comment: 'Harika bir ürün3!',
    },
    {
      user: user1,
      rating: 5,
      comment: 'Harika bir ürün2!',
    },
    {
      user: user1,
      rating: 2,
      comment: 'Harika bir ürün1!',
    },
  ],
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

app.get('/products/:productId', async (req, res) => {
  try {    
    const productId = req.params.productId;
    
    // Ürünü veritabanından çekmek için Mongoose veya başka bir veritabanı kütüphanesi kullanın
    const product = await Product.findById(productId);
    
    if (!product) {
      // Ürün bulunamazsa 404 hatası döndürün
      return res.status(404).json({ error: 'Ürün bulunamadı' });
    }
    
    // Ürünü bulursanız, istemciye gönderin
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ürün getirilirken bir hata oluştu.' });
  }
});

