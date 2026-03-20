const { MongoClient, ServerApiVersion } = require('mongodb');
const dns = require('dns');
dns.setServers(["1.1.1.1" , "8.8.8.8"]);
const client = new MongoClient("mongodb+srv://satyajeetsahu53_db_user:<db_password>@cluster0.1aoszdj.mongodb.net/?appName=Cluster0", {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let collection;

// DB connect function
const connectDB = async () => {
    try {
        await client.connect();
        console.log("Database connected successfully");

        const database = client.db('School');
        collection = database.collection('students');

    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

// collection getter
const getCollection = () => collection;

module.exports = { connectDB, getCollection };
