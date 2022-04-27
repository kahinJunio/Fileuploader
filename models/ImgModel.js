const mongoose=require('mongoose');

const imgSchema=new mongoose.Schema({

    imgUrl:{
        type:String
    }
})

module.exports=new mongoose.model('ImgModel',imgSchema)