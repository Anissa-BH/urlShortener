import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://abh:********@cluster0.yttisk0.mongodb.net/urls'); // 
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

export default connectToDatabase;
