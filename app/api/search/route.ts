import Character from '@/lib/models/character';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  try {
    // Extract query from URL
    const url = new URL(req.url);
    const query = url.searchParams.get('query')?.toString();

    const results = await Character.find({
      // Use a regular expression to perform a case-insensitive search
      name: { $regex: new RegExp(query as any, 'i') },
    });

    if (results.length === 0) {
      return NextResponse.json({
        resMsg: 'No results found',
      });
    } else {
      return NextResponse.json({
        res: true,
        data: results,
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
