const prompt = require('prompt');
const bcrypt = require('bcrypt');
const Admin = require('../model/adminModel');

const mongoose = require('mongoose');
const dbConfig = require('../config/databaseConfig');

function validateEmail(email) {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
}

const schema = {
    properties: {
        email: {
            message: 'Please enter a valid email address',
            required: true,
            conform: validateEmail
        },
        password: {
            message: 'Password must be at least 5 characters long',
            hidden: true,
            required: true,
            minLength: 5
        }
    }
};


prompt.start();

prompt.get(schema, async (err, result) => {
    if (err) {
        console.error('Error while creating adminusing CLI');
        console.error('Error occurred:', err);
        return
    } 
    
    try {
        // DB Connection
        await mongoose.connect(dbConfig.url);

        const hashedPass = await bcrypt.hash(result.password, 10); 
        const newUser = new Admin({ email : result.email, password: hashedPass });
        await newUser.save();
        console.log('Admin user created successfully.');
    } catch (error) {
        console.error('Error creating admin user: \n', error);
    }
    finally {
        mongoose.disconnect();
    }
});
