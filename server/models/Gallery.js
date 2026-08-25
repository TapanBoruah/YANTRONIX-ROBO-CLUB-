import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model('Gallery', GallerySchema);
