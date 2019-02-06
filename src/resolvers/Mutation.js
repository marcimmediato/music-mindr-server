import bcrypt from 'bcryptjs';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ email: args.data.email });

    if (args.data.password.length < 8) {
      throw new Error('Password must be 8 characters or longer.')
    }
    
    if (userExists) {
      throw new Error('Email exists');
    }

    const password = await bcrypt.hash(args.data.password, 10)

    return await prisma.mutation.createUser({ 
      data: {
        ...args.data, 
        password
      } 
    }, info);
  }
};

export { Mutation as default };
