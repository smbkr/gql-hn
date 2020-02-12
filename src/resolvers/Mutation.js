const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(root, args, context) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });

  return getAuthPayload(user);
}

async function login(root, args, context) {
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

function getAuthPayload(user) {
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

module.exports = {
  signup,
  login,
};
