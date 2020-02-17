import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { deleteToken, getToken } from '../token';

const Header = ({ history }) => {
  const isLoggedIn = !!getToken();

  return (
    <div className="flex pa1 justify-between nowrap bg-green">
      <div className="flex flex-fixed items-center">
        <h1 className="f5 ml2 mr1">Crapper News</h1>
        <Item to="/" label="Feed" />
        {isLoggedIn ? (
          <>
            <Separator />
            <Item to="/submit" label="Submit" />
          </>
        ) : (
          ''
        )}
      </div>
      <div className="flex flex-fixed items-center mr2">
        {isLoggedIn ? (
          <span
            className={`${itemClassNames} pointer`}
            onClick={() => {
              deleteToken();
              history.push('/');
            }}
          >
            Log Out
          </span>
        ) : (
          <Item to="/login" label="Log In" />
        )}
      </div>
    </div>
  );
};

const Separator = () => <div className="ml1">|</div>;

const itemClassNames = 'ml1 no-underline black';
const Item = ({ to, label }) => (
  <Link to={to} className={itemClassNames}>
    {label}
  </Link>
);

export default withRouter(Header);
