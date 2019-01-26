import fs from 'fs';
import { ApolloServer, gql } from 'apollo-server';
import resolvers from './resolvers/index';
import MusicBrainzAPI from './datasources/musicbrainz';

const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}
`;

const dataSources = () => {
  return {
    musicBrainzAPI: new MusicBrainzAPI()
  };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});

export { server as default };
