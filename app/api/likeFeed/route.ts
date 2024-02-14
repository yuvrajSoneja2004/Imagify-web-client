// Import necessary modules and models
import { connectToDB } from '@/lib/connect-db';
import Feed from '@/lib/models/post';
import { NextResponse } from 'next/server';

// Define the function to handle POST requests
export async function POST(req: Request, res: Response) {
  // Connect to the database
  console.log('Likes DB');
  connectToDB();
  try {
    const { feedId, email } = await req.json();
    // Get Particular feed
    console.log(email, 'Wh ynull');
    const particularFeed = await Feed.findById(feedId);
    console.log(particularFeed);

    // console.log(particularFeed);
    if (particularFeed.likes.includes(email)) {
      console.log('Already liked');
      return NextResponse.json(
        {
          res: false,
          msg: 'user already liked',
        },
        { status: 400 }
      );
    } else {
      particularFeed.likes.push(email);
      const saveNew = await particularFeed.save();
      console.log('Success push');
      return NextResponse.json(
        {
          res: true,
          msg: 'Successfully liked the feed',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error, 'push err');
  }
}
