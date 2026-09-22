import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import Event from '../models/Event.js';
import Glossary from '../models/Glossary.js';
import TeamMember from '../models/TeamMember.js';
import Roster from '../models/Roster.js';
import User from '../models/User.js';
import Gallery from '../models/Gallery.js';
import { defaultProjects, defaultEvents, defaultGlossary, defaultTeam, defaultRoster } from '../mockData.js';

dotenv.config();

const router = express.Router();





cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'mock',
  api_key: process.env.CLOUDINARY_API_KEY || 'mock',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'mock',
});




let upload;
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

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
  console.warn('Cloudinary environment configuration missing! Falling back to Local DiskStorage uploads.');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  upload = multer({ storage });
}


router.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    if (req.file.path && (req.file.path.startsWith('http://') || req.file.path.startsWith('https://'))) {
      return res.json({ url: req.file.path });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    return res.json({ url: fileUrl });
  }
  return res.status(400).json({ error: 'No file uploaded or invalid file type.' });
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

    const member = await TeamMember.findOne({
      $or: [
        { _id: user.targetId },
        { rosterId: user.targetId }
      ]
    });
    if (member && member.endDate) {
      const cleanEnd = member.endDate.trim().toLowerCase();
      if (cleanEnd !== '' && cleanEnd !== 'present' && cleanEnd !== 'till present') {
        let isPast = true;
        const endDateTime = Date.parse(member.endDate);
        if (!isNaN(endDateTime)) {
          isPast = endDateTime < Date.now();
        } else {
          const yearRegex = /^[12][0-9]{3}$/;
          if (yearRegex.test(member.endDate.trim())) {
            const endYear = parseInt(member.endDate.trim());
            const currentYear = new Date().getFullYear();
            isPast = endYear < currentYear;
          }
        }
        if (isPast) {
          return res.status(403).json({ message: 'Access denied. User account is disabled for past members.' });
        }
      }
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
      if (conflict && conflict.targetId !== targetId && conflict._id.toString() !== targetId) {
        return res.status(400).json({ message: 'Username is already taken by another user.' });
      }
    }

    const updateFields = {};
    if (cleanUsername) updateFields.username = cleanUsername;
    if (newPassword) updateFields.password = newPassword;

    let updated = await User.findOneAndUpdate(
      { $or: [{ targetId: targetId }, { _id: targetId }] },
      { $set: updateFields },
      { new: true }
    );

    if (!updated) {
      const tm = await TeamMember.findOne({ $or: [{ _id: targetId }, { rosterId: targetId }] });
      if (tm) {
        updated = await User.findOneAndUpdate(
          { $or: [{ targetId: tm._id.toString() }, { targetId: tm.rosterId }] },
          { $set: updateFields },
          { new: true }
        );
      }
    }

    if (!updated) {
      const rm = await Roster.findOne({ $or: [{ _id: targetId }, { teamMemberId: targetId }] });
      if (rm) {
        updated = await User.findOneAndUpdate(
          { $or: [{ targetId: rm._id.toString() }, { targetId: rm.teamMemberId }] },
          { $set: updateFields },
          { new: true }
        );
      }
    }

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
        name, type: 'president', role: 'Club President', position: 'president',
        github: '', linkedin: '', email: '', image: '', order: 2,
        startDate: '', endDate: 'Present'
      });
      const rosterMember = await Roster.create({
        name, roll: 'Pending', phone: 'Pending', email: 'Pending',
        year: '1st Year', sem: '1st Sem',
        teamMemberId: teamMember._id.toString(),
        github: '', linkedin: '', image: '', order: 2,
        startDate: '', endDate: 'Present'
      });
      teamMember.rosterId = rosterMember._id.toString();
      await teamMember.save();
      await User.create({ username: cleanUsername, password, role: 'super', targetId: teamMember._id.toString() });

    } else if (position === 'vice_president') {
      const teamMember = await TeamMember.create({
        name, type: 'core', role: 'Vice President', position: 'vice_president',
        github: '', linkedin: '', email: '', image: '', order: 3,
        startDate: '', endDate: 'Present'
      });
      const rosterMember = await Roster.create({
        name, roll: 'Pending', phone: 'Pending', email: 'Pending',
        year: '1st Year', sem: '1st Sem',
        teamMemberId: teamMember._id.toString(),
        github: '', linkedin: '', image: '', order: 3,
        startDate: '', endDate: 'Present'
      });
      teamMember.rosterId = rosterMember._id.toString();
      await teamMember.save();
      await User.create({ username: cleanUsername, password, role: 'super', targetId: teamMember._id.toString() });

    } else if (position === 'web_coordinator') {
      const teamMember = await TeamMember.create({
        name, type: 'core', role: 'Web Coordinator', position: 'web_coordinator',
        github: '', linkedin: '', email: '', image: '', order: 4,
        startDate: '', endDate: 'Present'
      });
      const rosterMember = await Roster.create({
        name, roll: 'Pending', phone: 'Pending', email: 'Pending',
        year: '1st Year', sem: '1st Sem',
        teamMemberId: teamMember._id.toString(),
        github: '', linkedin: '', image: '', order: 4,
        startDate: '', endDate: 'Present'
      });
      teamMember.rosterId = rosterMember._id.toString();
      await teamMember.save();
      await User.create({ username: cleanUsername, password, role: 'super', targetId: teamMember._id.toString() });

    } else if (position === 'student_representative') {
      const teamMember = await TeamMember.create({
        name, type: 'core', role: 'Student Representative', position: 'student_representative',
        github: '', linkedin: '', email: '', image: '', order: 6,
        startDate: '', endDate: 'Present'
      });
      const rosterMember = await Roster.create({
        name, roll: 'Pending', phone: 'Pending', email: 'Pending',
        year: '1st Year', sem: '1st Sem',
        teamMemberId: teamMember._id.toString(),
        github: '', linkedin: '', image: '', order: 6,
        startDate: '', endDate: 'Present'
      });
      teamMember.rosterId = rosterMember._id.toString();
      await teamMember.save();
      await User.create({ username: cleanUsername, password, role: 'rep', targetId: teamMember._id.toString() });

    } else if (position === 'faculty') {
      const teamMember = await TeamMember.create({
        name, type: 'coordinator', role: 'Faculty Coordinator', position: 'faculty',
        github: '', linkedin: '', email: '', image: '', order: 1,
        startDate: '', endDate: 'Present'
      });
      const rosterMember = await Roster.create({
        name, roll: 'Pending', phone: 'Pending', email: 'Pending',
        year: '1st Year', sem: '1st Sem',
        teamMemberId: teamMember._id.toString(),
        github: '', linkedin: '', image: '', order: 1,
        startDate: '', endDate: 'Present'
      });
      teamMember.rosterId = rosterMember._id.toString();
      await teamMember.save();
      await User.create({ username: cleanUsername, password, role: 'core', targetId: teamMember._id.toString() });

    } else if (position === 'core committee') {
      const teamMember = await TeamMember.create({
        name, type: 'core', role: 'Core Committee Member', position: 'core committee',
        github: '', linkedin: '', email: '', image: '', order: 5,
        startDate: '', endDate: 'Present'
      });
      const rosterMember = await Roster.create({
        name, roll: 'Pending', phone: 'Pending', email: 'Pending',
        year: '1st Year', sem: '1st Sem',
        teamMemberId: teamMember._id.toString(),
        github: '', linkedin: '', image: '', order: 5,
        startDate: '', endDate: 'Present'
      });
      teamMember.rosterId = rosterMember._id.toString();
      await teamMember.save();
      await User.create({ username: cleanUsername, password, role: 'core', targetId: teamMember._id.toString() });

    } else if (position === 'member') {
      const rosterMember = await Roster.create({
        name, roll: 'Pending', phone: 'Pending', email: 'Pending',
        year: '1st Year', sem: '1st Sem',
        github: '', linkedin: '', image: '', order: 99,
        startDate: '', endDate: 'Present'
      });
      const teamMember = await TeamMember.create({
        name, type: 'member', role: 'Club Member', position: 'member',
        rosterId: rosterMember._id.toString(),
        github: '', linkedin: '', email: '', image: '', order: 99,
        startDate: '', endDate: 'Present'
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




router.get('/gallery', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/gallery', async (req, res) => {
  try {
    const item = new Gallery(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/gallery/:id', async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/gallery/:id', async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery item deleted' });
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

        // Link with roster to ensure phone, email, year, sem, roll, etc. are populated
        const rosterQuery = [];
        if (m.rosterId) rosterQuery.push({ _id: m.rosterId });
        rosterQuery.push({ teamMemberId: m._id.toString() });
        if (m.name) rosterQuery.push({ name: m.name });

        const rosterDoc = await Roster.findOne({ $or: rosterQuery });
        if (rosterDoc) {
          if (!mObj.phone || mObj.phone === 'Pending') mObj.phone = rosterDoc.phone;
          if (!mObj.email || mObj.email === 'Pending') mObj.email = rosterDoc.email;
          if (!mObj.roll || mObj.roll === 'Pending') mObj.roll = rosterDoc.roll;
          if (!mObj.year || mObj.year === '1st Year') mObj.year = rosterDoc.year;
          if (!mObj.sem || mObj.sem === '1st Sem') mObj.sem = rosterDoc.sem;
          if (!mObj.github) mObj.github = rosterDoc.github;
          if (!mObj.linkedin) mObj.linkedin = rosterDoc.linkedin;
          if (!mObj.image) mObj.image = rosterDoc.image;
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
    if (req.body.position) {
      if (req.body.position === 'faculty') {
        req.body.type = 'coordinator';
      } else if (req.body.position === 'president') {
        req.body.type = 'president';
      } else if (req.body.position === 'member') {
        req.body.type = 'member';
      } else {
        req.body.type = 'core';
      }
    }
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (member) {
      if (req.body.position) {
        let newRole = 'core';
        if (['president', 'vice_president', 'web_coordinator'].includes(req.body.position)) {
          newRole = 'super';
        } else if (req.body.position === 'student_representative') {
          newRole = 'rep';
        } else if (req.body.position === 'member') {
          newRole = 'member';
        }
        await User.findOneAndUpdate({ targetId: member._id.toString() }, { $set: { role: newRole } });
      }

      if (member.rosterId) {
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
          order: member.order,
          startDate: member.startDate || '',
          endDate: member.endDate || 'Present'
        });
      }
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
        sem: student.sem || '1st Sem',
        startDate: student.startDate || '',
        endDate: student.endDate || 'Present'
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
