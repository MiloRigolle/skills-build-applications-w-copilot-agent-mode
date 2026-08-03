import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Power Pumpers',
        description: 'Strength-focused teammates chasing consistent weekly lifts.',
        mascot: 'Barbell Bolt',
        memberCount: 12,
        weeklyGoalMinutes: 720,
      },
      {
        name: 'Cardio Crusaders',
        description: 'Runners, cyclists, and rowers stacking endurance minutes.',
        mascot: 'Sprint Spark',
        memberCount: 15,
        weeklyGoalMinutes: 900,
      },
      {
        name: 'Flex Force',
        description: 'Mobility-first athletes balancing recovery and performance.',
        mascot: 'Mobility Moon',
        memberCount: 9,
        weeklyGoalMinutes: 540,
      },
    ]);

    const users = await User.insertMany([
      {
        username: 'alex_runner',
        email: 'alex.runner@example.com',
        displayName: 'Alex Rivera',
        fitnessGoal: 'Run a sub-25 minute 5K',
        level: 'Intermediate',
        joinedAt: new Date('2026-01-12'),
      },
      {
        username: 'maya_lifts',
        email: 'maya.lifts@example.com',
        displayName: 'Maya Chen',
        fitnessGoal: 'Build full-body strength',
        level: 'Advanced',
        joinedAt: new Date('2025-11-03'),
      },
      {
        username: 'sam_mobility',
        email: 'sam.mobility@example.com',
        displayName: 'Sam Patel',
        fitnessGoal: 'Improve mobility and recovery',
        level: 'Beginner',
        joinedAt: new Date('2026-02-19'),
      },
      {
        username: 'jordan_rows',
        email: 'jordan.rows@example.com',
        displayName: 'Jordan Brooks',
        fitnessGoal: 'Increase cardio capacity',
        level: 'Intermediate',
        joinedAt: new Date('2025-12-08'),
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[1]._id,
        type: 'Outdoor Run',
        durationMinutes: 42,
        distanceMiles: 4.6,
        caloriesBurned: 460,
        completedAt: new Date('2026-08-01T07:30:00Z'),
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 385,
        completedAt: new Date('2026-08-01T18:15:00Z'),
      },
      {
        user: users[2]._id,
        team: teams[2]._id,
        type: 'Yoga Flow',
        durationMinutes: 35,
        caloriesBurned: 145,
        completedAt: new Date('2026-08-02T12:00:00Z'),
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        type: 'Rowing Intervals',
        durationMinutes: 48,
        distanceMiles: 5.2,
        caloriesBurned: 520,
        completedAt: new Date('2026-08-02T16:45:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        user: users[1]._id,
        team: teams[0]._id,
        rank: 1,
        points: 1280,
        workoutsCompleted: 22,
        activeMinutes: 840,
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        rank: 2,
        points: 1215,
        workoutsCompleted: 19,
        activeMinutes: 795,
      },
      {
        user: users[0]._id,
        team: teams[1]._id,
        rank: 3,
        points: 1130,
        workoutsCompleted: 18,
        activeMinutes: 710,
      },
      {
        user: users[2]._id,
        team: teams[2]._id,
        rank: 4,
        points: 880,
        workoutsCompleted: 16,
        activeMinutes: 520,
      },
    ]);

    await Workout.insertMany([
      {
        title: '5K Pace Builder',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 38,
        focusAreas: ['Endurance', 'Pacing', 'Leg strength'],
        recommendedForGoal: 'Run a sub-25 minute 5K',
      },
      {
        title: 'Total Strength Circuit',
        category: 'Strength',
        difficulty: 'Advanced',
        durationMinutes: 50,
        focusAreas: ['Upper body', 'Core', 'Posterior chain'],
        recommendedForGoal: 'Build full-body strength',
      },
      {
        title: 'Recovery Mobility Reset',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 25,
        focusAreas: ['Hips', 'Shoulders', 'Breathing'],
        recommendedForGoal: 'Improve mobility and recovery',
      },
      {
        title: 'Row and Recover Intervals',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 44,
        focusAreas: ['Aerobic capacity', 'Back', 'Core'],
        recommendedForGoal: 'Increase cardio capacity',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
