import React from 'react';
import classNames from 'classnames';

import Button from '../button/Button';
import './CommentsBlockStyle.scss';

const CommentsBlock = ({ addComment, isFullPost }) => (
  <div
    className={classNames('comments', {
      'comments-full': isFullPost,
    })}>
    <div className="comments__title">Коментарі</div>
    <div className="comments__list">
      <div className="comments__item">
        <div className="comments__item-img">
          <img
            src="https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?size=626&ext=jpg&ga=GA1.1.915018935.1672235450"
            alt="userImg"
          />
        </div>
        <div className="comments__item-info">
          <p className="comments__item-username">Іван Іванов</p>
          <span className="comments__item-text">Це коментарій до твого посту!!!</span>
        </div>
      </div>
      <div className="comments__item">
        <div className="comments__item-img">
          <img
            src="https://img.freepik.com/premium-photo/handsome-confident-businessman-wearing-suit-standing-isolated-black-wall-arms-folded_171337-93222.jpg?size=626&ext=jpg&ga=GA1.1.915018935.1672235450"
            alt="userImg"
          />
        </div>
        <div className="comments__item-info">
          <p className="comments__item-username">Kevin McCallister</p>
          <span className="comments__item-text">
            This is the first comment on your post!!! Lorem earum dark earum Lorem
          </span>
        </div>
      </div>
    </div>
    {addComment && (
      <div className="addComment">
        <div className="addComment__content">
          <div className="addComment__userAva">
            <img
              src="https://img.freepik.com/free-photo/young-businessman-siting-cafeteria-with-laptop-computer-table_342744-455.jpg?size=626&ext=jpg&ga=GA1.2.915018935.1672235450"
              alt="userImg"
            />
          </div>
          <div className="addComment__control">
            <textarea placeholder="Написати коментарій" />
            <Button primary>Відправити</Button>
          </div>
        </div>
      </div>
    )}
  </div>
);
export default CommentsBlock;
