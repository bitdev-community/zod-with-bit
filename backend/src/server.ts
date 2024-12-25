// src/server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import { z, ZodError } from 'zod';
import {
  LetsTalkSchema,
  LetsTalkSchemaType,
} from '@learnbit/zod-examples.lets-talk-schema';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// 4) Simple in-memory array to store requests (just for demo)
const requests: (LetsTalkSchemaType & { submittedAt: string })[] = [];

// Add this before the POST route
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

// 5) Endpoint to handle form submissions
// @ts-ignore
app.post('/lets-talk', (req: Request, res: Response) => {
  try {
    // Validate incoming data with Zod
    const validatedData: LetsTalkSchemaType = LetsTalkSchema.parse(req.body);

    // Destructure validated fields
    const { name, email, whyWeShouldTalk, suggestTime } = validatedData;

    // Save the validated request in memory (in a real app, you'd use a DB)
    requests.push({
      name,
      email,
      whyWeShouldTalk,
      suggestTime,
      submittedAt: new Date().toISOString(),
    });

    return res.status(201).json({ message: 'Form submission successful' });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      // Return a 400 with all the validation errors
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.issues,
      });
    }

    // For any other errors, return 500
    return res.status(500).json({ error: 'Server error' });
  }
});

// 6) Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
