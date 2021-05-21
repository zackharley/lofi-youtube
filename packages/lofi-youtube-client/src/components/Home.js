import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const [channelId, setChannelId] = useState('');
  const history = useHistory();
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (channelId !== '') {
          history.push(`/channels/${channelId}`);
        }
      }}
    >
      <input
        type="text"
        placeholder="Enter YouTube channel ID"
        value={channelId}
        onChange={event => setChannelId(event.target.value)}
      />
      <button type="submit">Go</button>
    </form>
  );
}
