import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRemovePost } from '../../redux/slices/postsSlice';
import './PostsStyle.scss';

const Posts = ({
  _id,
  imageUrl,
  createdAt,
  tags,
  viewsCount,
  user,
  text,
  title,
  isFullPost,
  isEditable,
}) => {
  const dispatch = useDispatch();

  const onClickRemovePost = () => {
    if (window.confirm('Ви дійсно хочете видалити статтю?')) {
      dispatch(fetchRemovePost(_id));
    }
  };

  return (
    <div className="post">
      {isEditable && (
        <div className="post__control">
          <Link to={`/post/${_id}/edit`}>
            <i className="fa-solid fa-pencil" />
          </Link>
          <i className="fa-sharp fa-solid fa-trash" onClick={onClickRemovePost} />
        </div>
      )}
      <Link to={isFullPost ? '' : `/post/${_id}`}>
        <div className="post__content">
          <div
            className={classNames('post__item', {
              'post__item-full': isFullPost,
            })}>
            {imageUrl && <img src={`process.env.REACT_APP_API_URL${imageUrl}`} alt="img" />}
            <div className="post__item-info post-info">
              <div className="post-info__img">
                <img
                  src={
                    user.avatarUrl ||
                    'https://www.crescenttide.com/wp-content/uploads/2019/07/no-avatar-300x300.png'
                  }
                  alt="userAvatar"
                />
              </div>
              <div className="post-info__user">
                <p className="post-info__user-name">{user.fullName}</p>
                <p className="post-info__user-date">{createdAt}</p>
                <p className="post-info__user-content">{title}</p>
                {isFullPost && <p className="post-info__user-text">{text}</p>}
                {tags.length > 1 &&
                  tags.map((el, index) => (
                    <p className="post-info__user-tags" key={index}>
                      #{el}
                    </p>
                  ))}
                <div className="post-info__user-control">
                  <div>
                    <i className="fa-regular fa-eye" />
                    <span>{viewsCount}</span>
                  </div>
                  <div>
                    <i className="fa-regular fa-comment" />
                    <span>3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Posts;
