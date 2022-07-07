const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const ToDoList = require('./models/todoitems');

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://user123:Password123@cluster0.tjfyc2u.mongodb.net/?retryWrites=true&w=majority"
);

// Create

// Read

// Update

// Delete

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});