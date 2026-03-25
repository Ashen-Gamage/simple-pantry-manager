const express = require('express');
const router = express.Router();
// Import the data from app.js
const { categories, items } = require('../app'); 

// GET /categories
router.get('/', (req, res) => {
    res.json(categories);
});

// POST /categories
router.post('/', (req, res) => {
    const newCategory = { 
        id: categories.length + 1, 
        name: req.body.name 
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

// GET /categories/:id/items (The Logic Challenge)
router.get('/:id/items', (req, res) => {
    const catId = parseInt(req.params.id);
    const filteredItems = items.filter(i => i.categoryId === catId);
    res.json(filteredItems);
});

module.exports = router;