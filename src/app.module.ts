import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLError } from 'graphql';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      context: ({ req, res }) => ({ req, res }),
      formatError: (error: GraphQLError) => {
        console.log(error);
        const graphQLFormattedError = {
          message: error.message,
          path: error.path,
          error:
            error.extensions?.originalError['error'] ||
            error.extensions?.originalError['message'] ||
            'INTERNAL_SERVER_ERROR',
          statusCode: error.extensions.originalError['statusCode'] || 500,
        };
        // console.log(error);
        console.log('------------------------');
        console.log(error.extensions.originalError);
        console.log('------------------------');
        return graphQLFormattedError;
      },
    }),
    UserModule,
    PostModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
