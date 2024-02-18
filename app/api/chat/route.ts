import { connectToDB } from '@/lib/connect-db';
import Character from '@/lib/models/character';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req: Request, res: Response) {
  connectToDB();
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id')?.toString();
    const character = await Character.findById(id);

    return NextResponse.json(
      {
        res: true,
        charData: character,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      res: false,
      msg: error,
    });
  }
}

export async function POST(req: Request, res: Response) {
  connectToDB();

  try {
    const { history, characterID, isFirstMSG } = await req.json();
    const { name, greeting, rudeness, anger, excitement, avatar } = (await Character.findById(
      characterID
    )) as {
      name: string;
      greeting: string;
      rudeness: number;
      anger: number;
      excitement: number;
      avatar: string;
    };

    if (name) {
      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        messages: history,
      });

      const gptRes = chatCompletion?.choices[0]?.message?.content;

      return NextResponse.json({
        res: true,
        responseGPT: {
          role: 'assistant',
          msg: gptRes,
          character: {
            cName: name,
            cAvatar: avatar,
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      res: false,
      msg: error,
    });
  }
}
