const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({'message': 'Email and password are required.'});

    const foundUser = await User.findOne({ email: email}).exec();
    if(!foundUser) return res.sendStatus(401);

    //Evaluate Password
    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if(passwordMatch){
        const roles = Object.values(foundUser.roles).filter(Boolean);

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s'}
        )

        const refreshToken = jwt.sign(
            {
                "username": foundUser.usernaem
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d'}
        )

        foundUser.refreshToken = refreshToken;

        const result = await foundUser.save();

        //create Secure Cokie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ roles, accessToken });
    }else{
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };