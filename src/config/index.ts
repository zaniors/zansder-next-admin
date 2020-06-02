import dev from './dev.config';
import prod from './prod.config';

export interface IConfig {
  apiUrl: string;
  tokenKey: string;
}

const env = process.env.NODE_ENV || 'development';

const config = env === 'production' ? prod : dev;
export default config;