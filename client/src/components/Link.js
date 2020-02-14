import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Link = ({ link }) => {
  const postedBy = link.postedBy ? link.postedBy.name : 'Unknown';
  const hostname = new URL(link.url).host;

  return (
    <div>
      <div>
        <a href={link.url}>{link.description}</a> ({hostname})
      </div>
      <div>
        Posted by {postedBy} at {dayjs(link.createdAt).fromNow()}
      </div>
    </div>
  );
};

export default Link;
