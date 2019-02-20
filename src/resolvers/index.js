import { extractFragmentReplacements } from 'prisma-binding';

import Album from './Album';
import Artist from './Artist';
import Mindr from './Mindr';
import Mutation from './Mutation';
import Query from './Query';
import Track from './Track';
import User from './User';

const resolvers = {
  Album,
  Artist,
  Mutation,
  Query,
  Track,
  User
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
