import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Event from './models/Event.js';
import Glossary from './models/Glossary.js';
import TeamMember from './models/TeamMember.js';
import Roster from './models/Roster.js';
import User from './models/User.js';
import Gallery from './models/Gallery.js';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/yantronix';

import { defaultProjects, defaultEvents, defaultGlossary, defaultTeam, defaultRoster } from './mockData.js';


const seedDB = async () => {
  try {
    console.log(`Connecting to MongoDB at: ${mongoURI}`);
    await mongoose.connect(mongoURI, { family: 4 });
    console.log('MongoDB connected.');


    console.log('Checking database status...');

    // 1. Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const projects = await Project.insertMany(defaultProjects);
      console.log(`Seeded ${projects.length} default Projects.`);
    } else {
      console.log(`Project collection already has ${projectCount} items. Skipping seeding default projects.`);
    }

    // 2. Events
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      const events = await Event.insertMany(defaultEvents);
      console.log(`Seeded ${events.length} default Events.`);
    } else {
      console.log(`Event collection already has ${eventCount} items. Skipping seeding default events.`);
    }

    // 3. Glossary
    const glossaryCount = await Glossary.countDocuments();
    if (glossaryCount === 0) {
      const glossary = await Glossary.insertMany(defaultGlossary);
      console.log(`Seeded ${glossary.length} default Glossary entries.`);
    } else {
      console.log(`Glossary collection already has ${glossaryCount} items. Skipping seeding default glossary.`);
    }

    // 4. Gallery
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      console.log('Seeding default gallery items...');
      const defaultGalleryItems = [];
      await Gallery.insertMany(defaultGalleryItems);
      console.log('Seeded gallery items.');
    } else {
      console.log(`Gallery collection already has ${galleryCount} items. Skipping seeding default gallery.`);
    }

    // 5. Team members
    const teamCount = await TeamMember.countDocuments();
    if (teamCount === 0) {
      const team = await TeamMember.insertMany(defaultTeam);
      console.log(`Seeded ${team.length} default Team members.`);
    } else {
      console.log(`TeamMember collection already has ${teamCount} items. Skipping seeding default team members.`);
    }

    // 6. Roster entries
    const rosterCount = await Roster.countDocuments();
    if (rosterCount === 0) {
      const roster = await Roster.insertMany(defaultRoster);
      console.log(`Seeded ${roster.length} default Roster entries.`);
    } else {
      console.log(`Roster collection already has ${rosterCount} items. Skipping seeding default roster entries.`);
    }

    // 7. Default user accounts with profiles
    console.log('Checking default user accounts with profiles...');
    const defaultAccounts = [
      { name: 'DR. MANJULA D GHATAK', username: 'faculty', position: 'faculty', role: 'Faculty Coordinator', type: 'coordinator', userRole: 'core', order: 1 },
      { name: 'PINTU KR SAH', username: 'pintukrsah', position: 'president', role: 'Club President', type: 'president', userRole: 'super', order: 2 },
      { name: 'TAPAN BORUAH', username: 'tapanboruah', position: 'vice_president', role: 'Vice President', type: 'core', userRole: 'super', order: 3 },
      { name: 'KRISH PRASAD', username: 'krishprasad', position: 'web_coordinator', role: 'Web Coordinator', type: 'core', userRole: 'super', order: 4 }
    ];

    for (const admin of defaultAccounts) {
      const cleanUsername = admin.username.trim().toLowerCase();

      // Check if user already exists
      const existingUser = await User.findOne({ username: cleanUsername });
      if (existingUser) {
        console.log(`User "${cleanUsername}" already exists. Skipping.`);
        continue;
      }

      // Check if team member already exists with this name
      let teamMember = await TeamMember.findOne({ name: admin.name });
      if (!teamMember) {
        console.log(`Creating new TeamMember for default user: ${admin.name}`);
        teamMember = await TeamMember.create({
          name: admin.name,
          type: admin.type,
          role: admin.role,
          position: admin.position,
          github: '', linkedin: '', email: '', image: '', order: admin.order,
          startDate: '2024-08-01',
          endDate: 'Present'
        });
      } else {
        console.log(`Existing TeamMember found for default user: ${admin.name}. Reusing it.`);
      }

      // Check if roster record already exists with this name
      let rosterMember = await Roster.findOne({ name: admin.name });
      if (!rosterMember) {
        console.log(`Creating new Roster record for default user: ${admin.name}`);
        rosterMember = await Roster.create({
          name: admin.name,
          roll: 'Pending', phone: 'Pending', email: 'Pending',
          year: '1st Year', sem: '1st Sem',
          teamMemberId: teamMember._id.toString(),
          github: '', linkedin: '', image: '', order: admin.order,
          startDate: '2024-08-01',
          endDate: 'Present'
        });
      } else {
        console.log(`Existing Roster record found for default user: ${admin.name}. Reusing it.`);
        if (!rosterMember.teamMemberId) {
          rosterMember.teamMemberId = teamMember._id.toString();
          await rosterMember.save();
        }
      }

      if (!teamMember.rosterId) {
        teamMember.rosterId = rosterMember._id.toString();
        await teamMember.save();
      }

      console.log(`Creating User account for: ${cleanUsername}`);
      await User.create({
        username: cleanUsername,
        password: 'admin123',
        role: admin.userRole,
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
