async function feed(parent, args, context) {
  const { skip, first, orderBy } = args;
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter },
        ],
      }
    : {};

  const [links, count] = await Promise.all([
    context.prisma.links({
      where,
      skip,
      first,
      orderBy,
    }),
    context.prisma
      .linksConnection({ where })
      .aggregate()
      .count(),
  ]);

  return { links, count };
}

function link(parent, args, context) {
  return context.prisma.link({ id: args.id });
}

module.exports = {
  feed,
  link,
};
