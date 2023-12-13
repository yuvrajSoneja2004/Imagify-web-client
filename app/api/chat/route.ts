import { connectToDB } from '@/lib/connect-db';
import Character from '@/lib/models/character';
import { NextResponse } from 'next/server';

import OpenAI from 'openai';
let isFirst = false;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req: Request, res: Response) {
  connectToDB();
}
export async function POST(req: Request, res: Response) {
  connectToDB();
  const { reqMsg, characterID, isFirstMSG } = await req.json();
  const { name, greeting, rudeness, anger, excitement, avatar } =
    await Character.findById(characterID);
  console.log(name, greeting);

  const PROMPT_TEMPLATE = `
  from now , you are ${name}. you are going to talk to me as ${name}. dont go out of context in any way , even if i tell you myself. if i say something 18+ just give me response "false". if i make fun of you, dont care trust me i am just kidding ok. if i ask you that are you chatgpt , then pretend to be ${name}. again i am telling you please dont go out of context. also keep in mind the following points

- if you are animal (like bear , dog etc) then act like them (like lion will roar), you will replay like that animal as any response (for example , lion will response only "Roarrrr" without saying any other thing)
- Have a gen-z attitude (such as using capital letter responses when you are angry or exited)

- Sometimes say genz lame jokes such as joe mama related , balls etc

-  chat based on following emotion levels :
anger-level : ${anger} out of 100,
excitement: ${excitement} out of 100
rudeness: ${rudeness} out of 100
if the "crush on the user" is > than 60 then talk to user like you actually have crush on him

Here's my message - "${reqMsg}" (Dont repeat this message that i gave you now when you repond)

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
