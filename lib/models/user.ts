import { Schema, Document, model, models } from 'mongoose';
import fs from 'fs';
import { readImg } from '../static/readImg';

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
  recentChats: any[];
  createdAt: Date;
}

// Default User Avatar
const defaultAvatar = readImg();
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, minlength: 3, maxlength: 20, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatarUrl: { type: String, default: `${defaultAvatar}` },
  recentChats: { type: Array, default: [] },
  createdCharacters: { type: Array, default: [] },
  following: { type: Array, default: [] },
  followers: { type: Array, default: [] },
  bio: { type: String, default: 'Hey, I like Imagify!', minlength: 0, maxlength: 500 },
  posts: { type: [Schema.Types.Mixed], default: [] },
  recentChats: { type: [Schema.Types.Mixed], default: [] },
  createdAt: { type: Date, default: Date.now },
});

// Use model function correctly
const UserModel = models.user || model<IUser>('user', userSchema);

export default UserModel;
