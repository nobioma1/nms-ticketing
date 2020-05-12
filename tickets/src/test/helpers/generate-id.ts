import mongoose from 'mongoose';

export const generateID = (): string => {
  return mongoose.Types.ObjectId().toHexString();
};
