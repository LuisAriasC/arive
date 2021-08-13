/* Nestjs Dependencies */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
/* External dependencies */
import { LoggerModule } from 'nestjs-pino';
/* Modules dependencies */
import { DatabaseModule } from 'src/modules/database/database.module';
import { UserModule } from 'src/modules/users/user.module';
import { HobbyModule } from 'src/modules/hobbies/hobby.module';
/* Local dependencies */
import appConfig from 'src/config/app.config';
import appSchema from 'src/config/app.schema';
import { GraphQLError } from 'graphql';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      validationSchema: appSchema,
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          pinoHttp: { level: configService.get<string>('LOG_LEVEL', 'info') },
        };
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      subscriptions: false,
      playground: true,
      context: async ({ req, request }) => {
        return;
      },
      formatError: (error: GraphQLError) => {
        return error
      },
    }),
    DatabaseModule,
    UserModule,
    HobbyModule
  ],
  exports: [ConfigModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
