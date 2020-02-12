const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
  Query: {
    info: () => 'This is the API for a Hacker News clone.',
    feed: (root, args, context) => context.prisma.links(),
    link: (root, args, context) => context.prisma.link({ id: args.id }),
  },

  Mutation: {
    post: (root, args, context) => {
      const { url, description } = args;
      return context.prisma.createLink({
        url,
        description,
      });
    },
    updateLink: (root, args, context) => {
      const { id, description, url } = args;
      return context.prisma.updateLink({
        data: {
          ...(description && { description }),
          ...(url && { url }),
        },
        where: { id },
      });
    },
    deleteLink: (root, args, context) => {
      return context.prisma.deleteLink({ id: args.id });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
});
server.start(() => console.log('Server listening on http://localhost:4000'));
