import { Router } from 'express';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const router = Router();

router.get('/users/', async (_req, res) => {
  const users = await User.find().sort({ displayName: 1 });
  res.status(200).json({ users });
});

router.get('/teams/', async (_req, res) => {
  const teams = await Team.find().sort({ name: 1 });
  res.status(200).json({ teams });
});

router.get('/activities/', async (_req, res) => {
  const activities = await Activity.find()
    .populate('user', 'username displayName')
    .populate('team', 'name mascot')
    .sort({ completedAt: -1 });
  res.status(200).json({ activities });
});

router.get('/leaderboard/', async (_req, res) => {
  const leaderboard = await Leaderboard.find()
    .populate('user', 'username displayName')
    .populate('team', 'name mascot')
    .sort({ rank: 1 });
  res.status(200).json({ leaderboard });
});

router.get('/workouts/', async (_req, res) => {
  const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
  res.status(200).json({ workouts });
});

export default router;