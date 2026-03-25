const express = require('express');
const router = express.Router();
const { categories, items } = require('../app');

// GET /items
router.get('/', (req, res) => {
    res.json(items);
});

// POST /items (Add new item with validation)
router.post('/', (req, res) => {
    const categoryId = parseInt(req.body.categoryId);
    const { name, quantity} = req.body;

    // Validation: Check if category exists
    const categoryExists = categories.find(c => c.id === categoryId);
    if (!categoryExists) {
        return res.status(404).json({ error: "Category ID does not exist" });
    }

    const newItem = {
        id: items.length + 1,
        name,
        quantity: parseInt(quantity),
        categoryId
    };
    items.push(newItem);
    
    res.redirect('/'); // This tells the browser to go back to the home page
    res.status(201).json(newItem);
});

// PUT /items/:id (Update quantity)
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
    
    if (item) {
        item.quantity = parseInt(req.body.quantity);
        res.json(item);
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

// DELETE /items/:id
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // Note: To truly delete from the array in app.js, 
    // you would usually use a database. With in-memory, we find the index and remove it.
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

module.exports = router;