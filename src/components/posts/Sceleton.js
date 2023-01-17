import React from 'react';
import ContentLoader from 'react-content-loader';

const PostLoader = () => (
  <div className="skeleton">
    <ContentLoader
      speed={2}
      width={700}
      height={450}
      viewBox="0 0 700 450"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="0" y="0" rx="7" ry="7" width="664" height="200" />
      <circle cx="40" cy="245" r="40" />
      <rect x="88" y="210" rx="5" ry="5" width="166" height="20" />
      <rect x="88" y="245" rx="5" ry="5" width="183" height="20" />
      <rect x="88" y="280" rx="6" ry="6" width="540" height="80" />
      <rect x="88" y="370" rx="6" ry="6" width="150px" height="20" />
      <rect x="88" y="405" rx="6" ry="6" width="80px" height="20" />
      <rect x="180" y="405" rx="6" ry="6" width="80px" height="20" />
    </ContentLoader>
  </div>
);

export default PostLoader;
