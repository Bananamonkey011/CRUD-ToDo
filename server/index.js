const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const ToDoItemModel = require('./models/todoitems');

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://user123:Password123@cluster0.tjfyc2u.mongodb.net/ToDoList?retryWrites=true&w=majority"
);

// Create
app.post('/addItem', (req, res) => {
    const item = req.body;
    const newItem = new ToDoItemModel(item);
    newItem.save()
    res.json(item);
});

// Read
app.get('/getList', (req, res) => {
    ToDoItemModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});
// Update
app.put('/update', (req, res) => {
    const item = req.body;
    const updatedItem = ToDoItemModel(item);

    ToDoItemModel.updateOne({_id: req.body._id}, {item: updatedItem.item, dateCreated: updatedItem.dateCreated, dateDue: updatedItem.dateDue, done: updatedItem.done}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(updatedItem);
        }
    }); 
});

// Delete
app.delete("/removeTask", (req, res) => {
    ToDoItemModel.deleteOne({_id: req.body.id}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});