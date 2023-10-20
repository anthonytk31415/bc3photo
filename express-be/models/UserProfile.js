const mongoose = require('mongoose') 
const Schema = mongoose.Schema;


const UserProfileSchema = new Schema ({
    _id: String,
    user_id:  mongoose.Schema.Types.ObjectId,
    firstName: String, 
    lastName: String, 
    isAdmin: Boolean, 
    
}, {
    collection: 'userProfiles'
});

const UserProfileModel = mongoose.model('userProfile', UserProfileSchema)

module.exports =  {
    UserProfileModel,
}

