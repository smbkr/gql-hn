import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getToken } from '../token';
import { useMutation } from 'urql';
import gql from 'graphql-tag';

dayjs.extend(relativeTime);

const Link = ({ link }) => {
  const isLoggedIn = !!getToken();

  const postedBy = link.postedBy ? link.postedBy.name : 'Unknown';
  const hostname = new URL(link.url).host;

  const [state, executeMutation] = useMutation(upvoteMutation);

  const upvote = useCallback(() => {
    if (!state.fetching) {
      executeMutation({ linkId: link.id });
    }
  }, [state.fetching, executeMutation, link.id]);

  return (
    <div className="mb3">
      <div className="mb1 flex items-center">
        {isLoggedIn ? (
          <span
            className="f5 pointer"
            role="img"
            aria-label="Vote for this link"
            onClick={upvote}
          >
            🔼
          </span>
        ) : (
          ''
        )}
        <h2 className="mb1 mt0 ml2 f5">
          <a href={link.url} className="black">
            {link.description}
          </a>{' '}
        </h2>
        <span className="fw1 gray f5 ml2">({hostname})</span>
      </div>
      <div className="f6">
        Posted by {postedBy} {dayjs(link.createdAt).fromNow()}
      </div>
    </div>
  );
};

const upvoteMutation = gql`
  mutation UpvoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      link {
        id
        url
        description
        createdAt
        postedBy {
          name
        }
        votes {
          id
        }
      }
    }
  }
`;

export default Link;
