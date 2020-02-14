const linkCreated = {
  subscribe: (parent, args, context) =>
    context.prisma.$subscribe
      .link({
        mutation_in: ['CREATED'],
      })
      .node(),
  resolve: payload => payload,
};

const voteCreated = {
  subscribe: (parent, args, context) =>
    context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node(),
  resolve: payload => payload,
};

module.exports = {
  linkCreated,
  voteCreated,
};
