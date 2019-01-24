import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers/index';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

export { server as default };
