const mongoose = require('mongoose');

const todoitemsSchema = new mongoose.Schema(
    {
        item: {
            type: String,
            required: true
        },
        dateCreated: {
            type: Date,
            default: Date.now()
        },
        dateDue: {
            type: Date,
            required: false
        },
        done: {
            type: Boolean,
            default: false
        }
    }
)

const ToDoList = mongoose.model('ToDoList', todoitemsSchema);
module.exports = ToDoList;