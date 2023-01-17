import React from 'react';

import TagsSceleton from './SceletonTags';
import './TagsBlockStyle.scss';

const TagsBlock = ({ tags, isTagsStatus }) => (
  <div className="tags">
    <div className="tags__title">Теги</div>
    {isTagsStatus ? (
      [...Array(1)].map((_, index) => <TagsSceleton key={index} />)
    ) : (
      <div className="tags__list">
        <ul>
          {tags.map((el, index) => (
            <li key={index}>
              <span>#</span>
              {el}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default TagsBlock;
