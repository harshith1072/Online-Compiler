const Admin = require('../models/AdminSchema');

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Public (should be restricted in a real-world app)
const adminRegister = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if an admin with the provided email already exists
        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        // Create a new admin
        const newAdmin = await Admin.create({
            name,
            email,
            password
        });

        // Respond with success message
        res.status(201).json({
            message: 'Admin registered successfully',
            admin: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// @desc    Authenticate admin & get token
// @route   POST /api/admin/login
// @access  Public
const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the admin by their email
        const admin = await Admin.findOne({ email });

        // If the admin exists and the password matches, return success
        if (admin && (await admin.matchPassword(password))) {
            // In a real app, you would create a session or token here.
            // For this simple example, we'll just send a success message.
            res.json({
                message: 'Login successful',
                admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                },
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

module.exports = {
    adminRegister,
    adminLogin,
};
