function feed(root, args, context) {
  return context.prisma.links();
}

function link(root, args, context) {
  return context.prisma.link({ id: args.id });
}

module.exports = {
  feed,
  link,
};
