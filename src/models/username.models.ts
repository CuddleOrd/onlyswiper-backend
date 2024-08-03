import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the User document
export interface IUserName extends Document {
    username: string;
    password: string;
}

// Define the User schema
const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the User model
const UserName = mongoose.model<IUserName>('UserName', UserSchema);

export default UserName;
