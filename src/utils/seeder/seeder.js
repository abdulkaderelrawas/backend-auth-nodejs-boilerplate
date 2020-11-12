import dotenv from 'dotenv';
import users from './data/users.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    await User.insertMany(users);

    console.log('Data Imported!'.green.inverse);

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);

    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log('Data Detroyed!'.red.inverse);

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);

    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
