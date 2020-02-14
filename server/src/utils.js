const jwt = require('jsonwebtoken');
// TODO: Extract this to an env var
const APP_SECRET = 'FriendshipEndedWithRESTNowGraphQLIsMyNewBestFriend';

function getUserId(context) {
  const authHeader = context.request.get('Authorization');
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);

    return userId;
  }

  throw new Error("Please supply an 'Authorization' header");
}

module.exports = { APP_SECRET, getUserId };
