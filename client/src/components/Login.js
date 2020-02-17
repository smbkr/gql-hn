import React, { useState } from 'react';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2 className="mv3">Log In</h2>
      <div className="flex flex-column">
        <input
          className="input-reset b ba bg-white w-100 mb2 pa2"
          type="text"
          value={email}
          placeholder="foo@example.org"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="input-reset b ba bg-white w-100 mb2 pa2"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className="flex mt3 mb3">
        <button
          type="submit"
          className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f5 dib"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
