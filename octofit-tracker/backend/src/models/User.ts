import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    fitnessGoal: { type: String, required: true, trim: true },
    level: { type: String, required: true, trim: true },
    joinedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const User = model('User', userSchema);