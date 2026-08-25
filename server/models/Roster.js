import mongoose from 'mongoose';

const RosterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  year: { type: String, required: true },
  sem: { type: String, required: true },
  teamMemberId: { type: String },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  image: { type: String, default: '' },
  order: { type: Number, default: 99 },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: 'Present' }
}, { timestamps: true });

export default mongoose.model('Roster', RosterSchema);
