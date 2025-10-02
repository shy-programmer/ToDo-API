const UserModel = require('./users.model');
const jwt = require('../utils/jwt');

// Create a new user   
const signUp = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
   
    const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
    }
    
        try{
            const newUser = await UserModel.create({ username, password });
            const token = jwt.encode({ 
                id: newUser._id, 
                username: newUser.username 
            });
        res.status(201).json({
            message: 'User created successfully',
            data: {newUser, token}
        });  
    }
    catch (error) {
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }  
};

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    const user = await UserModel.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.encode({ 
        id: user._id, 
        username: user.username 
    });

    res.status(200).json({ 
        message: 'Login successful',
        data: {user, token}
    });
};


    

module.exports = {
    signUp,
    login
};