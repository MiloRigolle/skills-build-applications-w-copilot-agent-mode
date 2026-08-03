import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    workoutsCompleted: { type: Number, required: true, min: 0 },
    activeMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);