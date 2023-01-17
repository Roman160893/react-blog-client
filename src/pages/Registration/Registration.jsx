import React, { useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Button from '../../components/button/Button';
import { fetchRegister, isAuthMe } from '../../redux/slices/authSlice';
import axios from '../../network/axios';
import './RegistrationStyle.scss';

const Registration = () => {
  const [img, setImg] = useState('');
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthMe);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: 'Юлія',
      email: 'yulia@gmail.com',
      password: '12345',
    },
    mode: 'onChange',
  });

  const onSubmit = async (value) => {
    const data = await dispatch(
      fetchRegister({ ...value, avatarUrl: `${process.env.REACT_APP_API_URL}${img}` }),
    );
    if (data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } else {
      alert('Не вдалось авторизуватись!');
    }
  };

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      const { data } = await axios.post('/upload-ava', formData);
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

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="registration">
      <div className="registration__content">
        <div className="registration__title">Створення акаунту</div>
        <div className="registration__img">
          <i className="fa-solid fa-user"></i>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={classNames({ 'auth__input-err': errors.fullName })}
            type="text"
            placeholder="Повне ім'я"
            {...register('fullName', { required: "Вкажіть ваше ім'я" })}
          />
          {errors.fullName && <div className="auth__err"> {errors.fullName?.message}</div>}
          <input
            className={classNames({ 'auth__input-err': errors.email })}
            type="text"
            placeholder="E-Mail"
            {...register('email', { required: 'Вкажіть E-Mail' })}
          />
          {errors.email && <div className="auth__err"> {errors.email?.message}</div>}
          <input
            className={classNames({ 'auth__input-err': errors.password })}
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Пароль повинен містити не менше 5 символів!' })}
          />
          {errors.password && <div className="auth__err"> {errors.password?.message}</div>}
          <input type="file" onChange={handleChangeFile} />
          {img && (
            <div onClick={handleRemoveFile} className="remove-file">
              Видалити
            </div>
          )}
          <Button primary submit="submit">
            Зареєструватись
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
