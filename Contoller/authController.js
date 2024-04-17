const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/user');
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(401).json({  status: 401, message: 'not provide field' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '8h'
        });
        res.status(201).json({
            status: 201,
            message: "User created successfully",
            token: token,
            data: user
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '8h'
        });
        res.status(200).json({
            status: 200,
            message: "User login successfully",
            token,
            data: user
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: error.name });
    }
}

module.exports = {
    createUser,
    userLogin
}
