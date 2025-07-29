const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    displayName :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
    },
    socketId:{
        type:String,
    },
    password:{
        type:String,
        //google se login toh no required
    },
},{
    timestamps:true,
}
)

userSchema.pre("save" , async function( next ){
    const password = this.password ;
    if(this.isModified("password")){
        const hashedPassword = await bcrypt.hash(password,10);
        this.password = hashedPassword ;
    }
    next();
})

const userModel = mongoose.model('userModel',userSchema) ;

module.exports = userModel ;