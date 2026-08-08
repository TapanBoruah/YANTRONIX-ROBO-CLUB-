import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String }, 
  image: { type: String }, 
  github: { type: String },
  linkedin: { type: String },
  email: { type: String }, 
  type: { type: String, enum: ['coordinator', 'president', 'core', 'member'], required: true },
  rosterId: { type: String },
  roll: { type: String },
  phone: { type: String },
  year: { type: String },
  sem: { type: String },
  position: { type: String, default: 'core committee' },
  order: { type: Number, default: 99 }
}, { timestamps: true });

export default mongoose.model('TeamMember', TeamMemberSchema);
