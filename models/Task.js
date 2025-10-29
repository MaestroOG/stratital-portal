import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User", // assuming you have a User model
        required: true,
    },
    assignees: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        default: [],
    },
}, { timestamps: true });

const Task = models.Task || model("Task", taskSchema);
export default Task;