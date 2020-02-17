import React, { useCallback, useState } from 'react';
import { useMutation } from 'urql';
import gql from 'graphql-tag';

const CreateLink = ({ history }) => {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const [state, executeMutation] = useMutation(query);

  const submit = useCallback(async () => {
    await executeMutation({ url, description });
    history.push('/');
  }, [executeMutation, url, description, history]);

  return (
    <div>
      <h2 className="mv3">Submit Link</h2>
      <div className="flex flex-column">
        <input
          type="text"
          className="input-reset b ba bg-white w-100 mb2 pa2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="A description for the link"
        />
        <input
          type="text"
          className="input-reset b ba bg-white w-100 mb2 pa2"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="The URL you wish to link to"
        />
      </div>
      <div className="flex mb3 mt3">
        <button
          onClick={submit}
          disabled={state.fetching}
          className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f5 dib"
        >
          Submit Link
        </button>
      </div>
    </div>
  );
};

const query = gql`
  mutation CreateLink($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
    }
  }
`;

export default CreateLink;
