// pages/api/submitForm.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PIPEDREAM_URL } from "@/lib/environment-variables";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const pipedreamUrl = PIPEDREAM_URL;

  if (req.method !== 'POST') {
    return res.status(405).end(); 
  }

  try {
    const { name, contact, message } = req.body;

    // Forward the data to Pipedream
    const pipedreamResponse = await fetch(pipedreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, contact, message }),
    });

    if (pipedreamResponse.ok) {
      res.status(200).json({ message: 'Form submitted successfully' });
    } else {
      res.status(500).json({ error: 'Error forwarding to Pipedream' });
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
