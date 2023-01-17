import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Navigate } from 'react-router-dom';

import Button from '../../components/button/Button';
import { fetchAuth, isAuthMe } from '../../redux/slices/authSlice';
import './LoginStyle.scss';

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthMe);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (value) => {
    const data = await dispatch(fetchAuth(value));
    if (data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } else {
      alert('Не вдалось авторизуватись!');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth">
      <div className="auth__content">
        <div className="auth__title">Вхід в акаунт</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={classNames({ 'auth__input-err': errors.email })}
            type="email"
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
          <Button primary submit="submit">
            Увійти
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
