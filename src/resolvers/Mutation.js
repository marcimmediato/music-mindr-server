const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ email: args.data.email });

    if (userExists) {
      throw new Error('Email exists');
    }

    return await prisma.mutation.createUser({ data: args.data }, info);
  }
};

export { Mutation as default };
