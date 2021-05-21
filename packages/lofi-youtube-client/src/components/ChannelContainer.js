import React from 'react';
import { useParams } from 'react-router-dom';
import Channel from './Channel';

export default function ChannelContainer() {
  let { channelId } = useParams();
  return <Channel channelId={channelId} />;
}
