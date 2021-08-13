import { registerAs } from '@nestjs/config';

export default registerAs('config', async () => {
  try {
    return {
      environment: process.env.NODE_ENV,
      port: parseInt(process.env.PORT) || 3000,
    };
  } catch (err) {
    console.log(err);
  }
});
