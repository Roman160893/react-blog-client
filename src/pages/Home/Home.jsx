import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filters from '../../components/filters/Filters';
import Posts from '../../components/posts/Posts';
import TagsBlock from '../../components/tagsBlock/TagsBlock';
import CommentsBlock from '../../components/commentsBlock/CommentsBlock';
import { fetchPosts, fetchTags } from '../../redux/slices/postsSlice';
import PostLoader from '../../components/posts/Sceleton';
import Pagination from '../../components/pagination/Pagination';
import './HomeStyle.scss';

const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const { isSelectFilter, page } = useSelector((state) => state.filter);

  const isPostStatus = posts.status === 'loading';
  const isTagsStatus = tags.status === 'loading';

  useEffect(() => {
    const option = {
      sort: isSelectFilter,
      page: page,
    };
    dispatch(fetchPosts(option));
    dispatch(fetchTags());
  }, [isSelectFilter, page]);

  return (
    <div className="home">
      <Filters />
      <div className="home__main">
        <div className="home__posts">
          {(isPostStatus ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostStatus ? (
              <PostLoader key={index} />
            ) : (
              <Posts {...obj} key={obj._id} isEditable={userData?._id === obj.user._id} />
            ),
          )}
        </div>
        <div className="home__sidebar">
          {tags.items.length > 1 && <TagsBlock tags={tags.items} isTagsStatus={isTagsStatus} />}
          <CommentsBlock />
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
