//***************************كود ثابت لتشغيل الموقع *************************************************
//1)=============================================
const express = require('express');
const app = express();
const port = 8080;
const Order = require('./models/artSchema');
const helmet = require("helmet");
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); 

//2)=========== auto refresh ====================
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
//*****************************************************************************************************
//*****************************************************************************************************



//*************************** Data Base ***************************************************************
//1)========== connect with Data Base =================
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://eslam:esllam@cluster0.22mxnnj.mongodb.net/All_Orders?retryWrites=true&w=majority")
  
.then(result => {
    console.log(`Example app listening on port ${port}`)
})
.catch(err => {
  console.log(err);
});

//2)========== save in Data Base  =================
app.post("/products", (req, res) => {
  const order = new Order(req.body);

  order.save()
    .then((result) => { res.redirect('/products' )})
    .catch((err)   => { console.log(err);})
});

//3)========== delete in Data Base  ===============  
app.delete("/delet/:id", (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then((params) => {})
    .catch((err) => {
      console.log(err);
    });
}); 
app.get('/delet/:id',  (req, res) => { res.redirect('/admin_All_Orders')})
//*****************************************************************************************************
//*****************************************************************************************************




//***************************اكواد خاصه بروابط الموقع **********************************************
//1)===========* كود الصفحة الرئيسية  *========
app.get('/',    (req, res) => { res.redirect('/home')})
app.get('/home',(req, res) => { res.render('index', {mytitle: "home"} )})

//2)===========* كود الصفحات الفرعيه  *========
app.get('/products',   (req, res) => { res.render('products' , {mytitle: "products"}  )})
app.get('/cart',       (req, res) => { res.render('cart',      {mytitle: "cart"}      )})
app.get('/favorite',   (req, res) => { res.render('favorite',  {mytitle: "favorite"}  )})
app.get('/about',      (req, res) => { res.render('about',     {mytitle:"about"}      )})

//3)===========* كود صفحة الطلبات  *============
app.get('/admin_All_Orders', (req, res) => {
  Order.find()
  .then((result) => {res.render('All_Orders',{mytitle: "All_Orders" , myorders: result })})
  .catch((err) => {console.log(err);}) 
});
//*****************************************************************************************************
//*****************************************************************************************************


//*************************** اكواد توضع في نهاية الملف *********************************************
//1)========* كود عدم وجود صفحه فرعيه  *=========
app.use((req, res, next) => {
  res.status(404).send("هذه الصفحة غير موجودة")
})

//2)========*    console كود خاص بــ    *=========
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
//*****************************************************************************************************
//*****************************************************************************************************