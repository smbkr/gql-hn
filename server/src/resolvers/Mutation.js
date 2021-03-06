const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

function getAuthPayload(user) {
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function signup(parent, args, context) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });

  return getAuthPayload(user);
}

async function login(parent, args, context) {
  const unauthenticatedErrorMessage = 'Incorrect email address or password';

  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error(unauthenticatedErrorMessage);
  }

  const isPasswordValid = await bcrypt.compare(args.password, user.password);
  if (!isPasswordValid) {
    throw new Error(unauthenticatedErrorMessage);
  }

  return getAuthPayload(user);
}

function post(parent, args, context) {
  const userId = getUserId(context);

  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } },
  });
}

async function vote(parent, args, context) {
  const userId = getUserId(context);
  const { linkId } = args;
  const userHasVotedForLink = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: linkId },
  });
  if (userHasVotedForLink) {
    throw new Error(`You have already voted for link ${linkId}`);
  }

  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: linkId } },
  });
}

module.exports = {
  signup,
  login,
  post,
  vote,
};
