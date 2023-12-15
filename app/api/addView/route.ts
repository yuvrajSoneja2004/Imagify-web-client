// Import necessary modules and models
import { connectToDB } from '@/lib/connect-db';
import Character from '@/lib/models/character';
import UserModel from '@/lib/models/user';
import { NextResponse } from 'next/server';

// Define the function to handle POST requests
export async function POST(req: Request, res: Response) {
  // Connect to the database
  connectToDB();

  try {
    // Extract userId and botId from the request's JSON payload
    const { userId, botId } = await req.json();

    // Check if userId and botId are provided
    if (!userId || !botId) {
      console.log('Provide userId and botId');
    }

    // Find the bot in the database based on the provided botId
    const [bot] = await Character.find({ _id: botId });

    if (bot.views.includes(userId)) {
      return NextResponse.json(
        {
          res: false,
          msg: 'User already viewed',
        },
        { status: 400 }
      );
    }

    // Add the userId to the bot's likes array
    bot.views.push(userId);

    // Save the updated bot in the database
    await bot.save();

    // Return a JSON response indicating success
    return NextResponse.json(
      {
        res: true,
        msg: 'View updated successfully',
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
