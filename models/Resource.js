import { Schema, model, models } from "mongoose";

const resourceSchema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: true
    },
    fileUrl: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, { timestamps: true });

const Resource = models.Resource || model('Resource', resourceSchema);
export default Resource;