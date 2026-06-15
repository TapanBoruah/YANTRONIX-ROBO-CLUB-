import mongoose from 'mongoose';

const GlossarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  theory: { type: String, required: true },
  working: [{ type: String }],
  symbol: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Glossary', GlossarySchema);
