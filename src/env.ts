import * as dotenv from 'dotenv';

import { cleanEnv, str } from 'envalid';

dotenv.config();
export const env = cleanEnv(process.env, {
  PATH_CONNECTION_DB: str(),
  PORT: str(),
});
