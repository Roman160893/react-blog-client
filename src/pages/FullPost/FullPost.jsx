import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CommentsBlock from '../../components/commentsBlock/CommentsBlock';
import Posts from '../../components/posts/Posts';
import axios from '../../network/axios';
import './FullPostStyle.scss';

const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.data);

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Помилка при отриманні статті');
      });
  }, []);

  return (
    <div className="full-post">
      {!isLoading && (
        <>
          <Posts
            title={data.title}
            imageUrl={data.imageUrl}
            user={data.user}
            createdAt={data.createdAt}
            tags={data.tags}
            viewsCount={data.viewsCount}
            text={data.text}
            isEditable={userData?._id === data.user}
            isFullPost
          />
          <CommentsBlock addComment isFullPost />
        </>
      )}
    </div>
  );
};

export default FullPost;
