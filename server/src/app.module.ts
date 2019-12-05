import { Module } from '@nestjs/common';
import { join } from 'path';

import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [GraphQLModule.forRoot({
    definitions: {
      path: join(process.cwd(), '/src/graphql.schema.d.ts'),
      outputAs: 'class',
    },
    typePaths: ['./**/*.graphql'],
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  }),PrismaModule, MessagesModule],
})
export class AppModule {}
