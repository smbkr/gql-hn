// https://medium.com/hacking-and-gonzo/how-hacker-news-ranking-algorithm-works-1d9b0cf2c08d

const DEFAULT_GRAVITY = 1.8;

function rank(votes, submittedAt, gravity = DEFAULT_GRAVITY) {
  const now = new Date();
  const ageInHours = Math.ceil((now - submittedAt) / (1000 * 60 * 60));

  return (votes - 1) / Math.pow(ageInHours, gravity);
}

module.exports = rank;
