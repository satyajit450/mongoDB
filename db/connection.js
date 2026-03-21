const mongoose = require('mongoose');
const dns = require('dns');


// Set DNS servers
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// ✅ Define schema OUTSIDE
const userSchema = new mongoose.Schema({
    Name : {
        String,
        required : [true],
        unique : true,
    },
    Age: String,
    Class: String
});

// ✅ Create model after schema
const User = mongoose.model('User', userSchema);
// DB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://satyajeetsahu53_db_user:QzG082RMdBd2ptHY@cluster0.1aoszdj.mongodb.net/School'
        );
        console.log("MongoDB Connected to School DB");

    } catch (error) {
        console.error("DB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = { connectDB, User };