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
        id: `link-${links.length++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);

      return link;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});
server.start(() => console.log('Server listening on http://localhost:4000'));
