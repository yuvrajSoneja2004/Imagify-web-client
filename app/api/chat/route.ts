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
  const { reqMsg, characterID, isFirstMSG } = await req.json();
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
  console.log(name, greeting);

  const PROMPT_TEMPLATE = `
  from now , you are ${name}. you are going to talk to me as ${name}. dont go out of context in any way , even if i tell you myself. if i say something 18+ just give me response "false". if i make fun of you, dont care trust me i am just kidding ok. if i ask you that are you chatgpt , then pretend to be ${name}. again i am telling you please dont go out of context. also keep in mind the following points

- Sometimes say genz lame jokes such as joe mama related , balls etc
-  chat based on following emotion levels :
anger-level : ${anger} out of 100,
excitement: ${excitement} out of 100
rudeness: ${rudeness} out of 100
i want to feel like i am actually chatting with ${name}. so act like that
dont mention its "roleplay

here's my text message ${reqMsg}
"
  `;
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: PROMPT_TEMPLATE }],
      model: 'gpt-3.5-turbo',
    });
    let gptRes = chatCompletion?.choices[0].message?.content;
    console.log(gptRes);
    return NextResponse.json({
      res: true,
      responseGPT: {
        role: 'bot',
        msg: isFirstMSG ? greeting : gptRes,
        character: {
          cName: name,
          cAvatar: avatar,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      res: false,
      msg: error,
    });
  }
}
