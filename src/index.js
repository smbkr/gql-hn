const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];

const resolvers = {
  Query: {
    info: () => 'This is the API for a Hacker News clone.',
    feed: () => links,
    link: (parent, args) => {
      return links.find(link => link.id === args.id);
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${links.length}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);

      return link;
    },
    updateLink: (parent, args) => {
      const { id, description, url } = args;
      const index = links.findIndex(link => link.id === id);
      if (index < 0) {
        return;
      }

      const original = links[index];
      const updated = {
        ...original,
        ...(description && { description }),
        ...(url && { url }),
      };
      links[index] = updated;

      return updated;
    },
    deleteLink: (parent, args) => {
      const index = links.findIndex(link => link.id === args.id);
      if (index < 0) {
        return false;
      }
      links.splice(index, 1);
      return true;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});
server.start(() => console.log('Server listening on http://localhost:4000'));
