function linkSubmittedSubscriber(parent, args, context) {
  return context.prisma.$subscribe
    .link({
      mutation_in: ['CREATED'],
    })
    .node();
}

const linkSubmitted = {
  subscribe: linkSubmittedSubscriber,
  resolve: payload => payload,
};

module.exports = {
  linkSubmitted,
};
