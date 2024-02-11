import { connectToDB } from '@/lib/connect-db';
import Feed from '@/lib/models/post';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  console.log('hititititit');
  connectToDB();
  try {
    const posts = await Feed.find({});
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      res: false,
      msg: error,
    });
  }
}
