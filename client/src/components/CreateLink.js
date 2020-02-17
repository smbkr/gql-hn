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
      <div className="flex flex-column mt3">
        <input
          type="text"
          className="mb2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="A description for the link"
        />
        <input
          type="text"
          className="mb2"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="The URL you wish to link to"
        />
      </div>
      <button onClick={submit} disabled={state.fetching}>
        Submit Link
      </button>
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
