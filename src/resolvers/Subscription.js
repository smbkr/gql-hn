function linkCreatedSubscriber(parent, args, context) {
  return context.prisma.$subscribe
    .link({
      mutation_in: ['CREATED'],
    })
    .node();
}

const linkCreated = {
  subscribe: linkCreatedSubscriber,
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
