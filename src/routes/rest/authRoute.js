const express = require('express');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        res.status(201).json('Success');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
});

router.post('/signin', async (req, res) => {
     try {
        res.status(201).json('Success');
    } catch (error) {
        res.status(500).send('Error signing user');
    }
});

module.exports = router;