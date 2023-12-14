import { connectToDB } from '@/lib/connect-db';
import Character from '@/lib/models/character';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  connectToDB();
  const { botId } = await req.json();
  try {
    const findBot = await Character.findById(botId);
    console.log(findBot);
    // Find the post by ID and increment the views
    const updateView = await Character.findByIdAndUpdate(
      botId,
      { $inc: { views: 1 } }, // Increment the views by 1
      { new: true } // Return the updated document
    );

    if (!updateView) {
      return NextResponse.json({ message: 'Bot not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'View added successfully', views: updateView.views });
  } catch (error) {
    console.log(error);
  }
}
