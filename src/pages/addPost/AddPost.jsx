import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';

import axios from '../../network/axios';
import Button from '../../components/button/Button';
import './AddPostStyle.scss';

const AddPost = () => {
  const [img, setImg] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [text, setText] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      text: '',
      tags: '',
    },
    values: {
      title: isEdit ? title : '',
      text: isEdit ? text : '',
      tags: isEdit ? tags : '',
    },
    mode: 'onChange',
  });

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      const { data } = await axios.post('/upload', formData);
      setImg(data.url);
    } catch (err) {
      console.warn(err);
      alert('Не вдалося завантажити зображення');
    }
  };

  const handleRemoveFile = () => {
    if (window.confirm('Ви дійсно бажаєте видалити зображення?')) {
      setImg('');
    }
  };

  const onSubmit = async (value) => {
    try {
      const newPost = {
        title: value.title,
        tags: value.tags,
        text: value.text,
        imageUrl: img,
      };

      const { data } = isEdit
        ? await axios.patch(`/posts/${id}`, newPost)
        : await axios.post('/posts', newPost);

      const _id = isEdit ? id : data._id;

      navigate(`/post/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Не вдалося створити статтю!');
    }
  };

  useEffect(() => {}, []);
  if (id) {
    axios.get(`/posts/${id}`).then(({ data }) => {
      setImg(data.imageUrl);
      setTitle(data.title);
      setText(data.text);
      setTags(data.tags.join(','));
    });
  }
  return (
    <div className="addpost">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="addpost__content">
          <div className="addpost__file">
            <input type="file" onChange={handleChangeFile} />
            {img && (
              <Button red onClick={handleRemoveFile}>
                Видалити
              </Button>
            )}
          </div>
          {img && (
            <img
              src={`${process.env.REACT_APP_API_URL}${img}`}
              alt={'imageUrl'}
              className="addpost__img"
            />
          )}
          <div className="addpost__title">
            <input
              className={classNames({ input__err: errors.title })}
              type="text"
              placeholder="Заголовок статті"
              {...register('title', { required: 'Вкажіть заголовок статті!' })}
            />
            {errors.title && <div className="addpost__err"> {errors.title?.message}</div>}
          </div>
          <div className="addpost__tags">
            <input type="text" placeholder="Теги" {...register('tags')} />
          </div>
          <div className="addpost__text">
            <textarea
              className={errors.text && 'input__err'}
              placeholder="Введіть текст..."
              {...register('text', { required: 'Вкажіть текст статті!' })}
            />
            {errors.text && <div className="addpost__err"> {errors.text?.message}</div>}
          </div>
          <div className="addpost__control">
            <Button primary submit="submit">
              {isEdit ? 'Зберегти' : 'Опублікувати'}
            </Button>
            <Link to="/">
              <Button outline>Відмінити</Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
