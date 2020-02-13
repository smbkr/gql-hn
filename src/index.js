const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const { Query, Mutation, User, Link, Subscription } = require('./resolvers');

const resolvers = {
  Query: {
    ...Query,
    info: () => 'This is the API for a Hacker News clone.',
  },

  Mutation: {
    ...Mutation,
    updateLink: (parent, args, context) => {
      const { id, description, url } = args;
      return context.prisma.updateLink({
        data: {
          ...(description && { description }),
          ...(url && { url }),
        },
        where: { id },
      });
    },
    deleteLink: (parent, args, context) => {
      return context.prisma.deleteLink({ id: args.id });
    },
  },

  Subscription,
  User,
  Link,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
});
server.start(() => console.log('Server listening on http://localhost:4000'));
