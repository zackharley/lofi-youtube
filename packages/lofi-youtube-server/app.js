'use strict';
const _ = require('lodash');
const app = require('express')();
const fetch = require('node-fetch');

const PORT = process.env.PORT || 4242;
const API_KEY = 'AIzaSyAQ-ti3e-ZTBjA6XOkWpHa7Kxv-3R0gueQ';
const YOUTUBE_API_BASE = 'https://youtube.googleapis.com/youtube/v3';

async function fetchYoutubeChannelById(channelId) {
  const searchParams = new URLSearchParams({
    part: 'snippet,contentDetails',
    id: channelId,
    key: API_KEY,
  });
  const url = `${YOUTUBE_API_BASE}/channels?${searchParams.toString()}`;
  const response = await fetch(url);
  return await response.json();
}

app.get('/api/channels/:channelId', async (req, res, next) => {
  const channelId = req.params.channelId;
  let payload;
  try {
    payload = await fetchYoutubeChannelById(channelId);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
  if (payload.error) {
    const error = payload.error;
    console.error(error);
    return res.status(500).send({ error });
  }
  if (payload.items.length === 0) {
    return res
      .status(404)
      .send({ message: `No channel found with ID ${channelId}` });
  }
  const channelResult = payload.items[0];
  const channel = {
    ..._.pick(channelResult.snippet, ['description', 'title']),
    uploadsPlaylist: channelResult.contentDetails.relatedPlaylists.uploads,
  };
  res.status(200).send({ channel });
});

app.get('/api/channels/:channelId/videos', async (req, res, next) => {
  const channelId = req.params.channelId;
  const searchParams = new URLSearchParams({
    part: 'snippet',
    key: API_KEY,
    maxResults: 10,
    order: 'date',
    channelId,
  });
  const url = `${YOUTUBE_API_BASE}/search?${searchParams.toString()}`;
  const response = await fetch(url);
  const payload = await response.json();
  const videos = _.map(payload.items, video => ({
    ..._.pick(video.snippet, ['description', 'publishedAt', 'title']),
    url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
  }));
  const currentPage = 1;
  const totalPages = 10;
  res.status(200).send({ currentPage, totalPages, videos });
});

app.listen(PORT, () => console.log(`LoFi YouTube listening on port ${PORT}`));
