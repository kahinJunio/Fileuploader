const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const multer=require('multer')
const fs=require('fs')
const app=express()

const ImgModel=require('./models/ImgModel')

app.set('view engin','html')
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'views'))

mongoose.connect('mongodb://localhost:27017/FileUploader')
.then(()=>console.info('db connected..'))
.catch(err=>console.error('mongoose error',err));

//multer config
//set storage
const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./public/uploads')
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+'-'+file.originalname)
  }
})

var upload=multer({storage:storage})

app.get('/',(req,res)=>{
  res.render('index')
})

app.post('/',upload.single('img'),(req,res)=>{

  const img=new ImgModel();
  img.imgUrl=req.file.originalname;
  img.save();
  
  res.render('success')
})
app.listen(3000,()=>{
  console.log('App started ....')
})