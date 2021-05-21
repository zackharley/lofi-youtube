import React, { useEffect, useState } from 'react';

export default function Channel({ channelId }) {
  const [channel, setChannel] = useState({});
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchChannel = async id => {
    const response = await fetch(`/api/channels/${id}`);
    const { channel } = await response.json();
    setChannel(channel);
  };
  useEffect(() => fetchChannel(channelId), [channelId]);

  const fetchVideosForChannel = async id => {
    const response = await fetch(`/api/channels/${id}/videos`);
    const { currentPage, totalPages, videos } = await response.json();
    setCurrentPage(currentPage);
    setTotalPages(totalPages);
    setVideos(videos);
  };
  useEffect(() => fetchVideosForChannel(channelId), [channelId]);

  if (!channel || !channel.title) {
    return <p>'Loading...'</p>;
  }
  return (
    <section className="channel-container">
      <div className="channel-header">
        <div className="channel-header-divider" />
        <h1>{channel.title}</h1>
        <div className="channel-header-divider" />
      </div>
      {videos ? (
        <ul>
          {videos.map(video => (
            <li key={video.url}>
              <a href={video.url} className="tooltip">
                <span dangerouslySetInnerHTML={{ __html: video.title }} />
                <span className="tooltiptext">{video.description}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
      <div className="video-pagination-container">
        {currentPage > 1 ? (
          <a className="prev-page" onClick={() => console.log('PREV')}>
            {'<'}
          </a>
        ) : (
          ''
        )}
        <i>
          Page {currentPage} / {totalPages}
        </i>
        {currentPage < totalPages ? (
          <a className="next-page" onClick={() => console.log('NEXT')}>
            {'>'}
          </a>
        ) : (
          ''
        )}
      </div>
    </section>
  );
}
