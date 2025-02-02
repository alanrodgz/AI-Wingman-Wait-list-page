import { connectToDB } from '@/lib/db'; // Import Mongoose connection
import Email from '@/models/Email'; // Import your Mongoose model

export async function POST(request) {
  const { email } = await request.json();

  if (!email) {
    return new Response(JSON.stringify({ message: 'Email is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Connect to MongoDB via Mongoose
    await connectToDB();

    // Check if email exists using the Mongoose model
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return new Response(JSON.stringify({ message: 'Email already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert email using the Mongoose model
    const newEmail = new Email({ email });
    await newEmail.save();

    return new Response(JSON.stringify({ message: 'Email saved successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to save email', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}