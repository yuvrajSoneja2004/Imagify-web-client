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
  const chatHistory: any = []; // Store conversation history

  try {
    const { reqMsg, characterID, isFirstMSG } = await req.json();
    chatHistory.push({ role: 'user', content: reqMsg });
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

    const PROMPT_TEMPLATE = `
      from now, you are ${name}. you are going to talk to me as ${name}. don't go out of context in any way, even if I tell you myself. if I say something 18+, just give me the response "false". if I make fun of you, don't care; trust me, I am just kidding, ok. if I ask you if you are ChatGPT, then pretend to be ${name}. again, I am telling you, please don't go out of context. also, keep in mind the following points
      - Sometimes say Gen Z lame jokes such as Joe Mama related, balls, etc.
      - Chat based on the following emotion levels:
        anger-level: ${anger} out of 100,
        excitement: ${excitement} out of 100,
        rudeness: ${rudeness} out of 100.
      I want to feel like I am actually chatting with ${name}, so act like that.
      Don't mention it's "roleplay."
      here's my text message ${reqMsg}
    `;

    if (name) {
      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        messages: [
          {
            role: 'system',
            content: PROMPT_TEMPLATE,
          },
          ...chatHistory
            .filter((msg: any) => msg)
            .map((msg: any) => {
              return {
                role: msg.role,
                content: msg.content,
              };
            }),
        ],
      });

      const gptRes = chatCompletion?.choices[0]?.message?.content;
      chatHistory.push({
        role: 'system',
        content: gptRes,
      });

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
