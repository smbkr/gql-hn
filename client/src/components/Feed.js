import React from 'react';
import Link from './Link';
import { useQuery } from 'urql';
import gql from 'graphql-tag';

const Feed = () => {
  const [result] = useQuery({ query });
  const { data, fetching, error } = result;

  if (fetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching links</div>;
  }

  const { links, count } = data.feed;

  return (
    <div>
      <div>
        {links.map(link => (
          <Link key={link.id} link={link} />
        ))}
      </div>
      There are {count} links
    </div>
  );
};

const query = gql`
  query {
    feed(orderBy: createdAt_DESC) {
      count
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
      }
    }
  }
`;

export default Feed;
