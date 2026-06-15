import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['super', 'core', 'member'], required: true },
  targetId: { type: String } 
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
