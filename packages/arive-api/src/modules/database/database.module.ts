import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import configuration from 'src/modules/database/database.config';

@Module({
  imports: [
    ConfigModule.forFeature(configuration),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(configuration)],
      useFactory: async (configService: ConfigService) =>
        configService.get<MongooseModuleOptions>('database.mongodb'),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
