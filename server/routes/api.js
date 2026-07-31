import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import Event from '../models/Event.js';
import Glossary from '../models/Glossary.js';
import TeamMember from '../models/TeamMember.js';
import Roster from '../models/Roster.js';
import User from '../models/User.js';
import { defaultProjects, defaultEvents, defaultGlossary, defaultTeam, defaultRoster } from '../mockData.js';

dotenv.config();

const router = express.Router();





cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'mock',
  api_key: process.env.CLOUDINARY_API_KEY || 'mock',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'mock',
});


let upload;
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'yantronix',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
  });
  upload = multer({ storage });
} else {
  console.warn('Cloudinary environment configuration missing! Falling back to Mock uploads.');
  const storage = multer.memoryStorage();
  upload = multer({ storage });
}


router.post('/upload', upload.single('image'), (req, res) => {
  if (req.file && req.file.path) {
    
    return res.json({ url: req.file.path });
  }

  
  const placeholderImages = [
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1616391182219-e080b4d1043a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  ];
  const randomUrl = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
  return res.json({ url: randomUrl });
});




router.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const cleanUsername = username.trim().toLowerCase();

    let user = await User.findOne({ username: cleanUsername });
    if (!user) {
      user = await User.findOne({ username: username.trim() });
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid access credentials.' });
    }

    return res.json({
      role: user.role,
      name: user.username.toUpperCase(),
      id: user.targetId
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put('/users/credentials', async (req, res) => {
  try {
    const { targetId, newUsername, newPassword } = req.body;
    if (!targetId || (!newUsername && !newPassword)) {
      return res.status(400).json({ message: 'targetId and at least one of newUsername/newPassword are required.' });
    }
    const cleanUsername = newUsername ? newUsername.trim().toLowerCase() : null;

    if (cleanUsername) {
      const conflict = await User.findOne({ username: cleanUsername });
      if (conflict && conflict.targetId !== targetId) {
        return res.status(400).json({ message: 'Username is already taken by another user.' });
      }
    }

    const updateFields = {};
    if (cleanUsername) updateFields.username = cleanUsername;
    if (newPassword) updateFields.password = newPassword;

    const updated = await User.findOneAndUpdate(
      { targetId },
      { $set: updateFields },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'User account not found.' });
    }

    return res.json({ message: 'Credentials updated successfully.', username: updated.username });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


router.post('/users/create', async (req, res) => {
  try {
    const { name, username, password, position } = req.body;
    if (!name || !username || !password || !position) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const cleanUsername = username.trim().toLowerCase();
    const existingUser = await User.findOne({ username: cleanUsername });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }

    let userRole = 'core';
    let targetId = '';

    if (position === 'president') {
      const teamMember = await TeamMember.create({
        name, type: 'president', role: 'Club President',
        github: '', linkedin: '', email: '', image: '', order: 2
      });
      const rosterMember = await Roster.create({
        name, roll: 'Pending', phone: 'Pending', email: 'Pending',
        year: '1st Year', sem: '1st Sem',
        teamMemberId: teamMember._id.toString(),
        github: '', linkedin: '', image: '', order: 2
      });
      teamMember.rosterId = rosterMember._id.toString();
      await teamMember.save();
      await User.create({ username: cleanUsername, password, role: 'super', targetId: teamMember._id.toString() });

    } else if (position === 'vice_president') {
      const teamMember = await TeamMember.create({
        name, type: 'core', role: 'Vice President',
        github: '', linkedin: '', email: '', image: '', order: 3
      });
      const rosterMember = await Roster.create({
        name, roll: 'Pending', phone: 'Pending', email: 'Pending',
        year: '1st Year', sem: '1st Sem',
        teamMemberId: teamMember._id.toString(),
        github: '', linkedin: '', image: '', order: 3
      });
      teamMember.rosterId = rosterMember._id.toString();
      await teamMember.save();
      await User.create({ username: cleanUsername, password, role: 'super', targetId: teamMember._id.toString() });

    } else if (position === 'web_coordinator') {
      const teamMember = await TeamMember.create({
        name, type: 'core', role: 'Web Coordinator',
        github: '', linkedin: '', email: '', image: '', order: 4
      });
      const rosterMember = await Roster.create({
        name, roll: 'Pending', phone: 'Pending', email: 'Pending',
        year: '1st Year', sem: '1st Sem',
        teamMemberId: teamMember._id.toString(),
        github: '', linkedin: '', image: '', order: 4
      });
      teamMember.rosterId = rosterMember._id.toString();
      await teamMember.save();
      await User.create({ username: cleanUsername, password, role: 'super', targetId: teamMember._id.toString() });

    } else if (position === 'faculty') {
      const teamMember = await TeamMember.create({
        name, type: 'coordinator', role: 'Faculty Coordinator',
        github: '', linkedin: '', email: '', image: '', order: 1
      });
      const rosterMember = await Roster.create({
        name, roll: 'Pending', phone: 'Pending', email: 'Pending',
        year: '1st Year', sem: '1st Sem',
        teamMemberId: teamMember._id.toString(),
        github: '', linkedin: '', image: '', order: 1
      });
      teamMember.rosterId = rosterMember._id.toString();
      await teamMember.save();
      await User.create({ username: cleanUsername, password, role: 'core', targetId: teamMember._id.toString() });

    } else if (position === 'core committee') {
      const teamMember = await TeamMember.create({
        name, type: 'core', role: 'Core Committee Member',
        github: '', linkedin: '', email: '', image: '', order: 5
      });
      const rosterMember = await Roster.create({
        name, roll: 'Pending', phone: 'Pending', email: 'Pending',
        year: '1st Year', sem: '1st Sem',
        teamMemberId: teamMember._id.toString(),
        github: '', linkedin: '', image: '', order: 5
      });
      teamMember.rosterId = rosterMember._id.toString();
      await teamMember.save();
      await User.create({ username: cleanUsername, password, role: 'core', targetId: teamMember._id.toString() });

    } else if (position === 'member') {
      const rosterMember = await Roster.create({
        name, roll: 'Pending', phone: 'Pending', email: 'Pending',
        year: '1st Year', sem: '1st Sem',
        github: '', linkedin: '', image: '', order: 99
      });
      const teamMember = await TeamMember.create({
        name, type: 'member', role: 'Club Member',
        rosterId: rosterMember._id.toString(),
        github: '', linkedin: '', email: '', image: '', order: 99
      });
      rosterMember.teamMemberId = teamMember._id.toString();
      await rosterMember.save();
      await User.create({ username: cleanUsername, password, role: 'member', targetId: rosterMember._id.toString() });
    } else {
      return res.status(400).json({ message: 'Invalid position specified.' });
    }

    return res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});






router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




router.get('/glossary', async (req, res) => {
  try {
    const glossary = await Glossary.find().sort({ name: 1 });
    res.json(glossary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/glossary', async (req, res) => {
  try {
    const item = new Glossary(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/glossary/:id', async (req, res) => {
  try {
    const item = await Glossary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/glossary/:id', async (req, res) => {
  try {
    await Glossary.findByIdAndDelete(req.params.id);
    res.json({ message: 'Glossary entry deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




router.get('/team', async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1, createdAt: 1 });
    const membersWithCreds = await Promise.all(
      members.map(async (m) => {
        const user = await User.findOne({ targetId: { $in: [m._id.toString(), m.rosterId].filter(Boolean) } });
        const mObj = m.toObject();
        if (user) {
          mObj.username = user.username;
          mObj.password = user.password;
        }
        return mObj;
      })
    );
    res.json(membersWithCreds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/team', async (req, res) => {
  try {
    const member = new TeamMember(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/team/:id', async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (member && member.rosterId) {
      await Roster.findByIdAndUpdate(member.rosterId, {
        name: member.name,
        email: member.email || 'Pending',
        github: member.github || '',
        linkedin: member.linkedin || '',
        image: member.image || '',
        roll: member.roll || 'Pending',
        phone: member.phone || 'Pending',
        year: member.year || '1st Year',
        sem: member.sem || '1st Sem',
        order: member.order
      });
    }
    res.json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/team/:id', async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (member) {
      await User.deleteMany({ targetId: { $in: [member._id.toString(), member.rosterId].filter(Boolean) } });
      if (member.rosterId) {
        await Roster.findByIdAndDelete(member.rosterId);
      }
      await TeamMember.findByIdAndDelete(req.params.id);
    }
    res.json({ message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




router.get('/roster', async (req, res) => {
  try {
    const roster = await Roster.find().sort({ order: 1, createdAt: 1 });
    const rosterWithCreds = await Promise.all(
      roster.map(async (r) => {
        let user = await User.findOne({ targetId: r._id.toString() });
        if (!user && r.teamMemberId) {
          user = await User.findOne({ targetId: r.teamMemberId });
        }
        const rObj = r.toObject();
        if (user) {
          rObj.username = user.username;
          rObj.password = user.password;
        }
        return rObj;
      })
    );
    res.json(rosterWithCreds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/roster', async (req, res) => {
  try {
    const student = new Roster(req.body);
    await student.save();
    
    
    const username = `member_${student.name.toLowerCase().replace(/\s+/g, '')}`;
    await User.create({
      username,
      password: 'member123',
      role: 'member',
      targetId: student._id.toString()
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/roster/:id', async (req, res) => {
  try {
    const student = await Roster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (student && student.teamMemberId) {
      await TeamMember.findByIdAndUpdate(student.teamMemberId, {
        name: student.name,
        email: student.email,
        github: student.github || '',
        linkedin: student.linkedin || '',
        image: student.image || '',
        roll: student.roll || 'Pending',
        phone: student.phone || 'Pending',
        year: student.year || '1st Year',
        sem: student.sem || '1st Sem'
      });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/roster/:id', async (req, res) => {
  try {
    const student = await Roster.findById(req.params.id);
    if (student) {
      await User.deleteMany({ targetId: { $in: [student._id.toString(), student.teamMemberId].filter(Boolean) } });
      if (student.teamMemberId) {
        await TeamMember.findByIdAndDelete(student.teamMemberId);
      }
      await Roster.findByIdAndDelete(req.params.id);
    }
    res.json({ message: 'Roster record deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
