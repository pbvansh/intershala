const mongoose = require('mongoose');
require('dotenv').config();

const connetDB = async() => {

    const URI = process.env.MONGO_URI;
    try {
        const conn = await mongoose.connect(URI)

        console.log(`connected to mongoDB ${conn.connection.host}`);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connetDB