import { config } from 'dotenv';

config({path: './.env'});

export const { PORT, DBConnectionURL, JWT_SECRET, JWT_EXPIRES_IN } = process.env