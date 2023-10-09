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
//   reviews: [
//     {
//       _id: '651d5af90e8dd5e4b145ce84',
//       rating: 5,
//       comment: 'Gerçekten güzel bir ürünmüş, iyi ki almışım!',
//     },
//     {
//       _id: '6520269ff6ae91043fd18290',
//       rating: 2,
//       comment: 'Berbat bir ürün, aldığım ürünün hiç yazdığı gibi yeni değil aksine çok eskimiş.',
//     },
//     {
//       _id: '6520269ff6ae91043fd1828f',
//       rating: 3,
//       comment: 'Yaani ne çok kötü ne çok iyi.',
//     },
//   ],
// });
// freshUser.save();
// const product3 = new Product({
//   name: 'Ürün 5',
//   description: "Ürün 5'in süper düper açıklaması.",
//   img: ['https://dolap.dsmcdn.com/dlp_230623_1/product/org/kadin/sweatshirt/m-38-diger_1247488759.jpg', 'https://dolap.dsmcdn.com/dlp_230711_2/product/org/kadin/sweatshirt/m-38-diger_1247488760.jpg','httpsdolap.dsmcdn.com/dlp_230418_2/product/org/kadin/sweatshirt/m-38-diger_1247488761.jpg','https://dolap.dsmcdn.com/dlp_230810_1/product/org/kadin/sweatshirt/m-38-diger_1247488762.jpg'],
//   price: '280',
//   dprice: '250',
//   type: 'Giyim',
//   gender: 'Woman',
//   usability: 'Yeni',
//   brand: 'Zara',
//   size: 'M',
//   seller: '6522a031db2c4a18d6faf7fc',
//   likes: ['6520269ff6ae91043fd1828f','6520269ff6ae91043fd18290'],
//   asks: [
//     {
//       _id: '6520269ff6ae91043fd1828f',
//       comment: 'Fişi yada etiketi bulunuyor mu?',
//       replies: [
//         {
//           _id: '6522a031db2c4a18d6faf7fc',
//           comment: 'Evet fiş bulunuyor ama etiketini söktüm.',
//         },
//       ],
//     },
//     {
//       _id: '6520269ff6ae91043fd18290',
//       comment: 'Güzel ürünmüş yıkandıktan sonra esneme oluyor mu?',
//     },
//   ],
// });
// product3.save()
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
    .populate('likes', 'username img')
    .populate({
      path: 'asks._id',
      model: 'User',
      select: 'username img'
    })
    // Ürünün satıcısını çekin
    // const seller = await User.findById(product.seller);

    if (!product) {
      // Ürün bulunamazsa 404 hatası döndürün
      return res.status(404).json({ error: 'Ürün bulunamadı' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ürün getirilirken bir hata oluştu.' });
  }
});

