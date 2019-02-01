import fs from 'fs';
import { ApolloServer, gql } from 'apollo-server';
import resolvers from './resolvers/index';
import SpotifyAPI from './datasources/spotify';

const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}
`;

const dataSources = () => {
  return {
    spotifyAPI: new SpotifyAPI()
  };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});

export { server as default };
