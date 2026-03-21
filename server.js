const express = require('express');
const app = express();

// import DB
const { connectDB } = require('./db/connection');

// import routes
const userRoutes = require('./routes/userRoutes');

// middleware (form data read karega)
app.use(express.urlencoded({ extended: true }));

// public folder (HTML serve karega)
app.use(express.static('public'));

// routes use karo
app.use('/', userRoutes);

// database connect karo
connectDB();

// server start
app.listen(3000, () => {
    console.log("Server running on port 3000");
});