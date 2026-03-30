const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const dns = require('dns');
dns.setServers(['1.1.1.1'],['8.8.8.8'])

// =====================
// 🔗 DB CONNECTION
// =====================
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ Connection Error:", err);
        process.exit(1);
    }
};

// =====================
// 📚 AUTHOR SCHEMA
// =====================
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Author = mongoose.model('Author', authorSchema);

// =====================
// 📖 BOOK SCHEMA
// =====================
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
});

const Book = mongoose.model('Book', bookSchema);  // isee collection banta h

// =====================
// 🌱 INSERT DATA (SEED)
// =====================
const seedData = async () => {
    try {
        // Clear old data
        await Author.deleteMany();
        await Book.deleteMany();

        console.log("🧹 Old data cleared");

        // Create authors
        const author1 = await Author.create({ name: "J.K. Rowling" });
        const author2 = await Author.create({ name: "George R.R. Martin" });

        // Create books with reference
        await Book.create([
            {
                title: "Harry Potter",
                author: author1._id
            },
            {
                title: "Game of Thrones",
                author: author2._id
            },
            {
                title: "Fantastic Beasts",
                author: author1._id
            }
        ]);

        console.log("📚 Sample data inserted");
    } catch (err) {
        console.error("❌ Seed Error:", err);
    }
};

// =====================
// 🔍 FETCH DATA WITH POPULATE
// =====================
const showData = async () => {
    try {
        const books = await Book.find().populate('author');

        console.log("\n📖 Books with Authors:");
        books.forEach(book => {
            console.log(`- ${book.title} → ${book.author.name}`);
        });

    } catch (err) {
        console.error("❌ Fetch Error:", err);
    }
};

// =====================
// 🚀 RUN FLOW
// =====================
const run = async () => {
    await connectDB();
    await seedData();
    await showData();

    mongoose.connection.close();
};

run();


module.exports = {Author,Book}


//Dusre file me use krne ke liye
// const { Author, Book } = require('./yourFile');