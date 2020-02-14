function feed(parent, args, context) {
  const { skip, first } = args;
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter },
        ],
      }
    : {};
  return context.prisma.links({
    where,
    skip,
    first,
  });
}

function link(parent, args, context) {
  return context.prisma.link({ id: args.id });
}

module.exports = {
  feed,
  link,
};
