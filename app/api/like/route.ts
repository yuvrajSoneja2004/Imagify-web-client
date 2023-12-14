import { connectToDB } from '@/lib/connect-db';
import Character from '@/lib/models/character';
import UserModel from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  connectToDB();
  try {
    const { userId, botId } = await req.json();

    if (!userId || !botId) {
      console.log('Error: Invalid userid or botid');
    }
    const user = await UserModel.findById(userId);
    const bot = await UserModel.findById(botId);

    if (!user || !bot) {
      console.log('Error: user or bot not found');
    }
  } catch (error) {}
}
