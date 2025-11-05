import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // TODO: Implement actual authentication logic
    // This is a mock implementation for demonstration

    // Mock user data
    const mockUsers = [
      {
        id: '1',
        email: 'admin@ics.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'ICS',
        role: 'admin',
        country: 'Vietnam',
        companyName: 'ICS Security',
        position: 'Administrator',
      },
      {
        id: '2',
        email: 'user@ics.com',
        password: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
        country: 'Vietnam',
        companyName: 'ICS',
        position: 'Developer',
        androidTimes: 45,
        iosTimes: 50,
      },
    ];

    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate mock token
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
