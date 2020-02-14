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

module.exports = {
  linkCreated,
};
