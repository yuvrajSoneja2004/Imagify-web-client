// api/register
import { connectToDB } from '@/lib/connect-db';
import UserModel from '@/lib/models/user';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

connectToDB();
export const GET = async (req: Request, res: Response) => {
  return NextResponse.json({
    res: 'Yup , it indeed is working.',
  });
};
export const POST = async (req: Request, res: Response) => {
  // Extracting user information from request body
  try {
    const { username, email, password } = await req.json();
    const hashedPassword = bcrypt.hash(password, 10);
    const user = new UserModel({ username, email, password: (await hashedPassword).toString() });
    await user.save();
    console.log('Sucessfully registered');

    return NextResponse.json({ res: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ res: false, cause: error.toString() }, { status: error.statusCode });
  }
};
