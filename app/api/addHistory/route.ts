// Import necessary modules and models
import { connectToDB } from '@/lib/connect-db';
import UserModel from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: NextResponse) {
  connectToDB();
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id')?.toString();
    const [history] = await UserModel.find({ _id: id });
    console.log('this is the godman history', history);

    return NextResponse.json({
      res: true,
      data: history.recentChats,
    });
  } catch (error) {
    return NextResponse.json(
      {
        res: false,
        msg: error,
      },
      { status: 500 }
    );
  }
}

// Define the function to handle POST requests
export async function POST(req: Request, res: Response) {
  // Connect to the database
  connectToDB();

  try {
    // Extract userId and botInfo from the request's JSON payload
    const { userId, botInfo } = await req.json();

    // Check if userId and botInfo are provided
    if (!userId || !botInfo) {
      console.log('Provide userId and bot info');
    }

    // Find the user in the database based on the provided userId
    const [user] = await UserModel.find({ _id: userId });
    console.log(user);

    // Add botinfo  to the user's history array
    user.recentChats.push({
      charName: botInfo.botName,
      charId: botInfo.botId,
      charAvatar: botInfo.botAvatar,
    });

    // Save the updated user in the database
    await user.save();

    // Return a JSON response indicating success
    return NextResponse.json(
      {
        res: true,
        msg: 'Recent chats  updated successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    // If an error occurs, return a JSON response with the error message
    return NextResponse.json(
      {
        res: false,
        msg: error,
      },
      { status: 500 }
    );
  }
}
