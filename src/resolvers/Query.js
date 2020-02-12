function feed(parent, args, context) {
  return context.prisma.links();
}

function link(parent, args, context) {
  return context.prisma.link({ id: args.id });
}

module.exports = {
  feed,
  link,
};
