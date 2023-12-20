import { connectToDB } from '@/lib/connect-db';
import UserModel from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  connectToDB();
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id')?.toString();
    const user = await UserModel.find({ _id: id });
    console.log('first', user);

    // Bypassing some values that will not be sent to the client
    user.password = null;
    user.recentChats = null;

    if (!user) {
      return NextResponse.json(
        {
          res: false,
          msg: 'User not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        res: true,
        info: user[0],
      },
      { status: 200 }
    );
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
