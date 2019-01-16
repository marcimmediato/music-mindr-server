import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
      helloWorld: String!
    }
`;

const resolvers = {
  Query: {
    helloWorld() {
      return 'World!';
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The music-mindr server is up!');
});
