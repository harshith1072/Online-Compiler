const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create the Mongoose schema for an Admin user
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique for each admin
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Use a pre-save hook to hash the password before saving a new admin
AdminSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare the provided password with the hashed password in the database
AdminSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the Admin model
module.exports = mongoose.model('Admin', AdminSchema);
