const mongoose = require('mongoose');
const dns = require('dns');
const validator = require('validator')

// Set DNS servers
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// ✅ Schema
const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
    },
    Age: {
        type : String,
        validate : {
            validator : (value) => {
                return validator.isInt(value , {min : 1, max :120})
            },
            message : 'Input age from 1 to 120'
        }

    },
    Class: String,
    // validate : {
    //     validator : function(value) {
    //         return /^[a-zA-Z0-9]+$/.test(value)
    //     },
    //     message : "Username Only contains alpha numeric character"
    // }
    gender : {
        type :String,
        enum : ['Male','Female','Other'],
        default :'Other'
    }
});

// ✅ Model
const User = mongoose.model('User', userSchema);

// ✅ DB Connection
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

// ✅ Update Function
// const updateDoc = async () => {
//     try {
//         const result = await User.updateOne(
//             { Name: "Look" }, // filter
//             { $set: {Name : "Satya" } } // update
//         );

//         console.log("Update Result:", result);
//     } catch (error) {
//         console.error(error);
//     }
// };

// ✅ Run in correct order
const run = async () => {
    await connectDB();
    // await updateDoc();
};

run();

module.exports = { connectDB, User };