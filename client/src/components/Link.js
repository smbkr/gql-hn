import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Link = ({ link }) => {
  const postedBy = link.postedBy ? link.postedBy.name : 'Unknown';
  const hostname = new URL(link.url).host;

  return (
    <div className="mb2">
      <div className="mb1">
        <h2 className="f5 mb1">
          <a href={link.url} className="black">
            {link.description}
          </a>{' '}
          <span className="fw1 gray">({hostname})</span>
        </h2>
      </div>
      <div className="f6">
        Posted by {postedBy} {dayjs(link.createdAt).fromNow()}
      </div>
    </div>
  );
};

export default Link;
