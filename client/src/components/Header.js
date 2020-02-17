import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex pa1 justify-between nowrap bg-green">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Crapper News</div>
        {/*TODO: use styled-components here*/}
        <Link to="/" className="ml1 no-underline black">
          Feed
        </Link>
        <div className="ml1">|</div>
        <Link to="/submit" className="ml1 no-underline black">
          Submit
        </Link>
      </div>
    </div>
  );
};

export default Header;
