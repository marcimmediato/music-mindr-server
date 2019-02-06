import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'dfjq54uasdilfjqw34059pusdfljp'
});

export { prisma as default };
