const mongoose = require('mongoose') 
const Schema = mongoose.Schema;


const UserAuthSchema = new Schema ({
    _id: String,
    email: String, 
    password: String, 
    date: Date,
}, {
    collection: 'userAuths'
});

const UserAuthModel = mongoose.model('userAuth', UserAuthSchema)

module.exports =  {
    UserAuthModel,
}

