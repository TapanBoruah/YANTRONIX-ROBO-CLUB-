import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config({ path: process.cwd().endsWith('server') ? '.env' : './server/.env' });

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/yantronix';

const run = async () => {
  try {
    console.log(`Connecting to MongoDB at ${mongoURI.split('@').pop()}...`);
    await mongoose.connect(mongoURI, { family: 4 });
    console.log('Connected successfully.');

    // Remove legacy users with uppercase names or spaces
    const deleteResult = await User.deleteMany({
      username: { $in: ['tapan boruah', 'pintu kr sah', 'krish prasad', 'TAPAN BORUAH', 'PINTU KR SAH', 'KRISH PRASAD'] }
    });
    console.log(`Successfully deleted ${deleteResult.deletedCount} legacy user credentials from the database.`);

    // Also check for any users with targetId: 'super'
    const superDeleteResult = await User.deleteMany({ targetId: 'super' });
    console.log(`Successfully deleted ${superDeleteResult.deletedCount} users with targetId: 'super'.`);

    console.log('Cleanup completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error running cleanup:', err);
    process.exit(1);
  }
};

run();
