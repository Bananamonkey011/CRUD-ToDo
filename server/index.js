const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const ToDoItemModel = require('./models/todoitems');

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

//default
app.get('/', (req, res) => {
    res.send("Hello, World!");
});
app.get('/test', (req, res) => {
    res.json({text: "Hello, World!"});
});
// Create
app.post('/addItem', async (req, res) => {
    const item = req.body;
    const newItem = new ToDoItemModel(item);
    await newItem.save()
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
    // console.log(req.body);
    ToDoItemModel.deleteOne({_id: req.body._id}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});


app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3001");
});