import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the document
interface ISwipe extends Document {
    uniqueId: string;
    likes: number;
}

// Define the schema
const swipeSchema: Schema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true, // Ensures the unique ID is unique in the collection
    },
    swipes: {
        type: Number,
        default: 0, // Sets the default value of likes to 0
    },
});

// Create the model
const SwipeModel = mongoose.model<ISwipe>('Like', swipeSchema);

// Export the model
export default SwipeModel;
