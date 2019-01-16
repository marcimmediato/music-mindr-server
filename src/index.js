import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    users() {
      return [
        {
          id: '1',
          name: 'Marc'
        },
        {
          id: '2',
          name: 'John'
        }
      ];
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
