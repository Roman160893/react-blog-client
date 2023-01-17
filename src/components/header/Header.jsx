import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { isAuthMe, logout } from '../../redux/slices/authSlice';
import Button from '../button/Button';
import './HeaderStyle.scss';

const Header = () => {
  const isAuth = useSelector(isAuthMe);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm('Ви дійсно хочете вийти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__content">
          <Link to="/">
            <div className="header__logo"> Blog </div>
          </Link>
          <div className="header__btn">
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button primary>Створити пост</Button>
                </Link>
                <Button red onClick={onClickLogout}>
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button outline>Увійти</Button>
                </Link>
                <Link to="/register">
                  <Button primary>Зареєструватись</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
