import { connectToDB } from '@/lib/connect-db';
import Character from '@/lib/models/character';
import { NextResponse } from 'next/server';

connectToDB();

export async function POST(req: Request, res: Response) {
  // Extrating info from request body
  const { name, intro, avatar, anger, rudeness, kindness, excitement, createdBy } =
    await req.json();
  console.log('got hit bro');
  try {
    // Checking if all required parameters are passed from client
    if (!name || !intro || !anger || !rudeness || !kindness || !excitement || !createdBy) {
      return NextResponse.json(
        {
          res: false,
          msg: 'Fill all the fields and requirements',
        },
        { status: 401 }
      );
    }

    const createBot = new Character({
      name,
      greeting: intro,
      avatar,
      anger,
      rudeness,
      kindness,
      excitement,
      createdBy,
    });

    const saveBot = await createBot.save();

    if (saveBot) {
      console.log('Created bot');
      return NextResponse.json(
        {
          res: true,
          msg: 'Created bot successfully',
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      res: false,
      msg: error,
    });
  }
}
