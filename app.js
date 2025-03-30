const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
});

const User = mongoose.model('User ', userSchema);

// Insert a user
const insertUser  = async (userData) => {
    const user = new User(userData);
    try {
        const savedUser  = await user.save();
        console.log('User  saved:', savedUser );
    } catch (error) {
        console.error('Error saving user:', error);
    }
};

// Fetch all users
const fetchUsers = async () => {
    try {
        const users = await User.find();
        console.log('All users:', users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// Main function to run the app
const main = async () => {
    await connectDB();

    // Insert a user (you can change the user data as needed)
    await insertUser ({ name: 'ABC', email: 'abc@xyz.com', age: 18 });

    // Fetch all users
    await fetchUsers();

    // Close the connection
    mongoose.connection.close();
};

// Start the application
main();