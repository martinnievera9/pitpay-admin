import React from 'react';

export const VimeoVideo = ({ vimeoId }) => {
  return (
    <div
      className="video"
      style={{
        position: 'relative',
        paddingBottom: '56.25%' /* 16:9 */,
        paddingTop: 25,
        height: 0
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=151623`}
        allow="autoplay; fullscreen"
        allowFullScreen
        title={vimeoId}
      />
    </div>
  );
};
