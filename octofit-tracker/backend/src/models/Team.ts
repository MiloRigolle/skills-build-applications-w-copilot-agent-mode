import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    mascot: { type: String, required: true, trim: true },
    memberCount: { type: Number, required: true, min: 0 },
    weeklyGoalMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const Team = model('Team', teamSchema);