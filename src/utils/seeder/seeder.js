import dotenv from 'dotenv';
import users from './fakeData.js';
import User from '../../models/userModel.js';
import connectDB from '../../config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    await User.insertMany(users);

    console.log('Data Imported!');

    process.exit();
  } catch (error) {
    console.error(`${error}`);

    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log('Data Detroyed!');

    process.exit();
  } catch (error) {
    console.error(`${error}`);

    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
