import UserModel from '@/lib/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request, res: Response) {
  try {
    // Extrating info from request body
    const { email, password } = await req.json();

    // Check if email and password is valid
    if (!email || !password) {
      return NextResponse.json({
        res: false,
        msg: 'Invalid email or password',
      });
    }

    // Find the user by email
    const user = await UserModel.findOne({ email });
    console.log(user);

    if (!user) {
      return NextResponse.json(
        {
          res: false,
          msg: 'User not found',
        },
        { status: 404 }
      );
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      console.log('Password is valid');
      return NextResponse.json(
        {
          res: true,
          data: user,
        },
        { status: 200 }
      );
    } else {
      console.log('Invalid password');
      return NextResponse.json(
        {
          res: false,
          msg: 'User with this info not found',
        },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        res: false,
        msg: 'Error: ' + error.toString(),
      },
      { status: 500 }
    );
  }
}
