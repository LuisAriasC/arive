import { registerAs } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as flagsmith from "flagsmith-nodejs";

export interface DatabaseConfig {
  mongodb: Partial<MongooseModuleOptions>;
}

export default registerAs(
  'database',
  async (): Promise<Partial<DatabaseConfig>> => {
    try {

      let mongodbUrl: string = '';
    
      await flagsmith.init({
        environmentID: String(process.env.VAULT_KEY)
      });
  
      await flagsmith.getValue("mongo_uri")
      .then((value) => {
          mongodbUrl = String(value)
      });

      const mongodb: Partial<MongooseModuleOptions> = {
        uri: process.env.MONGODB_URL || mongodbUrl,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      };

      return {
        mongodb,
      };
    } catch (error) {
      throw error;
    }
  },
);
