import { Module } from '@nestjs/common';
import { GraphQLModule, GqlModuleOptions } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { DateTimeResolver, EmailAddressResolver, UnsignedIntResolver } from 'graphql-scalars';
import { GraphQLJSONObject } from 'graphql-type-json'
import playground from './graphql/playground';
import path from 'path';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [LoggerModule],
      useFactory: async (logger: PinoLogger): Promise<GqlModuleOptions> => ({
        path: '/',
        subscriptions: '/',
        autoSchemaFile: true,
        logger,
        debug: true,
        cors: false,
        installSubscriptionHandlers: true,
        playground: {
          endpoint: '/graphql',
          subscriptionEndpoint: '/graphql',
          settings: {
            'request.credentials': 'include',
            'general.betaUpdates': true,
            'editor.cursorShape': 'line',
            'editor.theme': 'dark',
            'editor.reuseHeaders': true,
            'tracing.hideTracingResponse': true,
            'editor.fontSize': 12,
            'editor.fontFamily': '\'Roboto\', \'Consolas\', \'Inconsolata\', \'Droid Sans Mono\', \'Monaco\', monospace',
          },
          tabs: [
            {
              name: 'GraphQL API',
              endpoint: '/graphql',
              query: playground,
              headers: {
                authorization: '',
              },
            }
          ]
        },
        context: ({ req, res }): any => ({ req, res })
      }),
      inject: [PinoLogger]
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: {
          safe: true,
          // prettyPrint: configService.get<string>('NODE_ENV') !== 'production'
        }
      }),
      inject: [ConfigService]
    }),
    LessonModule,
    UsersModule,
  ],
})
export class AppModule { }
