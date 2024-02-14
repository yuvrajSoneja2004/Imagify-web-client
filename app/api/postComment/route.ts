// Import necessary modules and models
import { connectToDB } from '@/lib/connect-db';
import Character from '@/lib/models/character';
import Feed from '@/lib/models/post';
import UserModel from '@/lib/models/user';
import { NextResponse } from 'next/server';

// Define the function to handle POST requests
export async function POST(req: Request, res: Response) {
  // Connect to the database
  connectToDB();

  try {
    // Extract userId and botId from the request's JSON payload
    const { comment, createdAt, profileName, profilePic, input, feedId } = await req.json();

    // Check if userId and botId are provided
    if (!feedId || !comment || !profileName || !input) {
      console.log('Provide essential info from client');
    }
    // Find the particular feed
    const particularFeed = await Feed.findOne({ _id: feedId });

    // Check if the feed exists
    if (!particularFeed) {
      return NextResponse.json(
        {
          res: false,
          msg: 'Feed not found',
        },
        { status: 404 }
      );
    }

    // Update the comments array in the feed document
    particularFeed.comments.push({
      text: comment,
      createdAt,
      profileName,
      profilePic,
      input,
    });

    // Save the updated feed to the MongoDB database
    await particularFeed.save();

    // Send a success response
    return NextResponse.json(
      {
        res: true,
        msg: 'Posted comment successfully',
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
    console.log(error);
  }
}
