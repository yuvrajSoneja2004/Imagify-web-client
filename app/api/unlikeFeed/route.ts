// Import necessary modules and models
import { connectToDB } from '@/lib/connect-db';
import Feed from '@/lib/models/post';
import { NextResponse } from 'next/server';

// Define the function to handle POST requests
export async function POST(req: Request, res: Response) {
  // Connect to the database
  console.log('Dislike DB');
  connectToDB();

  const { currentUserE, feedId } = await req.json();
  try {
    const feed = await Feed.findById(feedId);

    if (!feed.likes.includes(currentUserE)) {
      return NextResponse.json({
        res: false,
        msg: 'This is bug',
      });
    } else {
      feed.likes = feed.likes.filter((email: string) => {
        return currentUserE != email;
      });

      const savedFeed = await feed.save();

      if (savedFeed) {
        console.log('Disliked Successfully');
        return NextResponse.json({
          res: true,
          msg: 'Disliked Successfully',
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
