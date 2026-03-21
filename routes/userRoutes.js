const express = require('express');
const router = express.Router();

const { User } = require('../db/connection');

router.post('/submit', async (req, res) => {
    try {
        const { name, age, class: studentClass } = req.body;

        // ✅ Use Mongoose model
        await User.create({
            Name: name,
            Age: parseInt(age),
            Class: studentClass
        });

        res.send("Data saved ✅");

    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving data ❌");
    }
});

module.exports = router;