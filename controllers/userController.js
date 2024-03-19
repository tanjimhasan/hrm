const User = require('../model/User');

const getAllUser = async (req,res)=>{
    const user = await User.find();

    if(!user) return res.status(204).json({'message': 'No users found'});
}