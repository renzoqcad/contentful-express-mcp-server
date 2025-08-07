import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mcpRoute from "./routes/mcpRoute";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/', mcpRoute);

app.listen(port, (error) => {
  if (error) {
    console.error('Failed to start server:', error);
  }
  console.log(`Server is running on port ${port}`);
});