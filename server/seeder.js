import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Event from './models/Event.js';
import Glossary from './models/Glossary.js';
import TeamMember from './models/TeamMember.js';
import Roster from './models/Roster.js';
import User from './models/User.js';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/yantronix';

import { defaultProjects, defaultEvents, defaultGlossary, defaultTeam, defaultRoster } from './mockData.js';


const seedDB = async () => {
  try {
    console.log(`Connecting to MongoDB at: ${mongoURI}`);
    await mongoose.connect(mongoURI, { family: 4 });
    console.log('MongoDB connected.');


    console.log('Cleaning collections...');
    await Project.deleteMany({});
    await Event.deleteMany({});
    await Glossary.deleteMany({});
    await TeamMember.deleteMany({});
    await Roster.deleteMany({});
    await User.deleteMany({});
    console.log('Collections cleared.');


    const projects = await Project.insertMany(defaultProjects);
    console.log(`Seeded ${projects.length} Projects.`);

    const events = await Event.insertMany(defaultEvents);
    console.log(`Seeded ${events.length} Events.`);

    const glossary = await Glossary.insertMany(defaultGlossary);
    console.log(`Seeded ${glossary.length} Glossary entries.`);

    const team = await TeamMember.insertMany(defaultTeam);
    console.log(`Seeded ${team.length} Team members.`);

    const roster = await Roster.insertMany(defaultRoster);
    console.log(`Seeded ${roster.length} Roster entries.`);


    console.log('Seeding super admin user accounts with profiles...');
    const superAdminsList = [
      { name: 'TAPAN BORUAH', username: 'tapanboruah', position: 'president', role: 'Club President', order: 2 },
      { name: 'PINTU KR SAH', username: 'pintukrsah', position: 'vice_president', role: 'Vice President', order: 3 },
      { name: 'KRISH PRASAD', username: 'krishprasad', position: 'web_coordinator', role: 'Web Coordinator', order: 4 }
    ];

    for (const admin of superAdminsList) {
      const cleanUsername = admin.username.trim().toLowerCase();
      
      const teamMember = await TeamMember.create({
        name: admin.name,
        type: admin.position === 'president' ? 'president' : 'core',
        role: admin.role,
        github: '', linkedin: '', email: '', image: '', order: admin.order
      });

      const rosterMember = await Roster.create({
        name: admin.name,
        roll: 'Pending', phone: 'Pending', email: 'Pending',
        year: '1st Year', sem: '1st Sem',
        teamMemberId: teamMember._id.toString(),
        github: '', linkedin: '', image: '', order: admin.order
      });

      teamMember.rosterId = rosterMember._id.toString();
      await teamMember.save();

      await User.create({
        username: cleanUsername,
        password: 'admin123',
        role: 'super',
        targetId: teamMember._id.toString()
      });
    }
    console.log('All user authorization clearances established.');

    console.log('Database Seeding Completed Successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
};

seedDB();
