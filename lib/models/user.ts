import { Schema, Document, model, models } from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password: string;
  avatarUrl?: string;
  createdCharacters: any[];
  following: any[];
  followers: any[];
  bio?: string;
  posts: any[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, minlength: 3, maxlength: 20 },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatarUrl: { type: String },
  createdCharacters: { type: Array, default: [] },
  following: { type: Array, default: [] },
  followers: { type: Array, default: [] },
  bio: { type: String, default: 'Hey, I like Imagify!', minlength: 0, maxlength: 500 },
  posts: { type: [Schema.Types.Mixed], default: [] },
  createdAt: { type: Date, default: Date.now },
});

// Use model function correctly
const UserModel = models.user || model<IUser>('user', userSchema);

export default UserModel;
