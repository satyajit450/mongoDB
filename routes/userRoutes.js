const express = require('express');
const router = express.Router();

const { getCollection } = require('../db/connection');

router.post('/submit', async (req, res) => {

    const { name, age, class: studentClass } = req.body;

    const collection = getCollection();

    await collection.insertOne({
        Name: name,
        Age: parseInt(age),
        Class: studentClass
    });

    res.send("Data saved ✅");
});

module.exports = router;