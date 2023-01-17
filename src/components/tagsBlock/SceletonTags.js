import React from 'react';
import ContentLoader from 'react-content-loader';

const TagsSceleton = () => (
  <ContentLoader
    speed={2}
    width={305}
    height={150}
    viewBox="0 0 305 140"
    backgroundColor="#cbc8c8"
    foregroundColor="#b1a5a5">
    <rect x="10" y="0" rx="5" ry="5" width="285" height="22" />
    <rect x="10" y="35" rx="5" ry="5" width="285" height="22" />
    <rect x="10" y="70" rx="5" ry="5" width="285" height="22" />
    <rect x="10" y="105" rx="5" ry="5" width="285" height="22" />
  </ContentLoader>
);

export default TagsSceleton;
