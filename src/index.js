const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const { Query } = require('./resolvers');

const resolvers = {
  Query: {
    info: () => 'This is the API for a Hacker News clone.',
    feed: Query.feed,
    link: Query.link,
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
