import React, { useCallback, useState } from 'react';
import { useMutation } from 'urql';
import gql from 'graphql-tag';
import { setToken } from '../token';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [state, executeMutation] = useMutation(query);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      const data = await executeMutation({ email, password });
      const token = data.data.login.token;
      if (!!token) {
        setToken(token);
        history.push('/');
      }
      // TODO: Add error handling for authentication
    },
    [executeMutation, history, email, password],
  );

  return (
    <div>
      <h2 className="mv3">Log In</h2>
      <form onSubmit={handleSubmit}>
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
            disabled={state.fetching}
            className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f5 dib"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

const query = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default Login;
