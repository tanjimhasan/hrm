const User = require('../model/User');

const getAllUsers = async (req,res)=>{
    const users = await User.find();

    if(!user) return res.status(204).json({'message': 'No users found'});
}