import mongoose from 'mongoose';

export const connectToDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((res) => {
      if (res) {
        console.log('Successfully connected to DB');
      }
    })
    .catch((err) => {
      console.log('Error connecting to DB', err);
    });
};
