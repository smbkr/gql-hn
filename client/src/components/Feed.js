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
      <ol>
        {links.map(link => (
          <li key={link.id}>
            <Link link={link} />
          </li>
        ))}
      </ol>
      <div className="mb2">There are {count} links</div>
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
        votes {
          id
        }
        postedBy {
          id
          name
        }
      }
    }
  }
`;

export default Feed;
