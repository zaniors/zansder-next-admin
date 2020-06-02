import dev from './dev.config';
import prod from './prod.config';

export interface Config {
  apiUrl: string;
}

const env = process.env.NODE_ENV || 'development';

export const config = env === 'production' ? prod : dev;