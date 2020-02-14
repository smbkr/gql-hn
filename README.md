# A GraphQL powered link aggregator

This is a GraphQL powered API for a link aggregator (think Hacker News, Reddit), which supports:

- Posting, updating and deleting links
- "Upvoting" links
- User registration and auth

## Todo

- Server
  - Extract update & delete mutations
  - Require auth for update & delete
  - Add vote count to Link items
  - Use a Docker container for the DB for local development
  - Validate that submitted URLs are valid
  - Add tests
- Client
  - Pull Tachyons in from npm rather than from a CDN on each page load
  - Add styling
  - Add registration/login
  - Add post link page
  - Allow editing links
  - User profile page
  - Allow voting
  - Add sorting
  - Add filtering
