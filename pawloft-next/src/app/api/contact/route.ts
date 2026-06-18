import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { requestType, name, email, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from('contact_queries')
      .insert([
        {
          request_type: requestType || 'General',
          name,
          email,
          message: message || '',
        }
      ]);

    if (error) {
      console.error('Error inserting query:', error);
      return NextResponse.json(
        { error: 'Failed to submit query' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
