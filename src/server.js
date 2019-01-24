import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import typeDefs from './schema.graphql';
import resolvers from './resolvers/index';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({ schema });

export { server as default };
