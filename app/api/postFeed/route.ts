// Import necessary modules and models
import { connectToDB } from '@/lib/connect-db';
import Feed from '@/lib/models/post';
import { NextResponse } from 'next/server';

// Define the function to handle POST requests
export async function POST(req: Request, res: Response) {
  // Connect to the database
  connectToDB();

  try {
    // Extract userId and botId from the request's JSON payload
    const { postDesc, conversation, userName, userAvatar } = await req.json();

    // Check if userId and botId are provided
    if (!postDesc || !conversation) {
      console.log('Provide postDesc and conversation');
    }
    // Create a new instance of the 'Feed' model
    const newFeed = new Feed({
      postDesc,
      conversation,
      userName,
      userProfilePic: userAvatar,
    });

    // Save the new feed to the MongoDB database
    const postRes = await newFeed.save();
    if (postRes) {
      console.log('LOOAKSdijfu');
    }

    return NextResponse.json(
      {
        res: true,
        msg: 'Posted successfully',
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
