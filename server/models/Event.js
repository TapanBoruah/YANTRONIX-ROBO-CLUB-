import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['Workshop', 'Competition', 'Webinar'], default: 'Workshop' },
  location: { type: String, required: true },
  image: { type: String, default: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' }
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);
