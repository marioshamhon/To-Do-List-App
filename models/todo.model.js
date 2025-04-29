import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo: { 
          type: String, 
          required: [true, 'A todo is required'],
    },

    userId: {
        type: String, 
        required: [true, 'User id is required'],
    },
}, {timestamps: true});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;