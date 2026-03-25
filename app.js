const express = require('express');
const app = express();

// Route to render the main pantry page
app.get('/', (req, res) => {
    // We pass the data arrays into the EJS file
    res.render('index', { 
        pantryItems: items, 
        pantryCategories: categories 
    });
});

// 1. Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // This allows Express to read JSON data sent in the request body
app.set('view engine', 'ejs'); // Dynamically changing the content of the page

// 2. --- SHARED DATA ---
// We define data here and export it so route files can access it
let categories = [{ id: 1, name: "Fruit" }];
let items = [{ id: 1, name: "Apple", quantity: 10, categoryId: 1 }];

// Exporting data BEFORE requiring routes so they can access it
module.exports = { categories, items }; 

// 3. --- IMPORT ROUTERS ---
// These MUST be defined before you use them in app.use()
const categoriesRouter = require('./routes/categories');
const itemsRouter = require('./routes/items');
// const usersRouter = require('./routes/users'); // Uncomment if you use this later

// 4. --- USE ROUTERS ---
// This tells express to route any request starting with /categories to the categoriesRouter
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);
// app.use('/users', usersRouter);

// 5. --- START SERVER ---
// Only use ONE app.listen call at the very bottom
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});