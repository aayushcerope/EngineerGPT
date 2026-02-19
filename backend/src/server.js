import app from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';

const start = async () => {
  try {
    await connectDb();
    app.listen(env.port, () => {
      console.log(`Backend running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Server bootstrap failed', error);
    process.exit(1);
  }
};

start();
