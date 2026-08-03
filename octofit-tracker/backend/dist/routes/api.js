"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
router.get('/users/', async (_req, res) => {
    const users = await User_1.User.find().sort({ displayName: 1 });
    res.status(200).json({ users });
});
router.get('/teams/', async (_req, res) => {
    const teams = await Team_1.Team.find().sort({ name: 1 });
    res.status(200).json({ teams });
});
router.get('/activities/', async (_req, res) => {
    const activities = await Activity_1.Activity.find()
        .populate('user', 'username displayName')
        .populate('team', 'name mascot')
        .sort({ completedAt: -1 });
    res.status(200).json({ activities });
});
router.get('/leaderboard/', async (_req, res) => {
    const leaderboard = await Leaderboard_1.Leaderboard.find()
        .populate('user', 'username displayName')
        .populate('team', 'name mascot')
        .sort({ rank: 1 });
    res.status(200).json({ leaderboard });
});
router.get('/workouts/', async (_req, res) => {
    const workouts = await Workout_1.Workout.find().sort({ difficulty: 1, title: 1 });
    res.status(200).json({ workouts });
});
exports.default = router;
