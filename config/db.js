const mongoose = require('mongoose');
require('dotenv').config();

const connection = () =>{
    mongoose.connect(process.env.MONGODB_URL).then(() =>{
        console.log({msg : "Connection Successfully!"});
    }).catch((error) =>{
        console.log({msg : "Connection Failed!", error});
    })
}
module.exports = { connection };