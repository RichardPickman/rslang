import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { RouteNames } from '../../router';
import styles from './styles.module.scss';
import { useActions } from '../../hooks/useActions';

const Navigation = () => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { logout } = useActions();
  const handleLogoutClick = () => {
    logout();
  }
  return (
    <nav className={styles.nav}>
      <Link to={RouteNames.HOMEPAGE}>Главная</Link>
      <Link to={RouteNames.TEXTBOOK}>Учебник</Link>
      <Link to={RouteNames.GAMES}>Игры</Link>
      <Link to={RouteNames.STATISTICS}>Статистика</Link>
      {
        isAuth ?
          <>
          <span>Hi, {user?.name}</span>
          <button type="button" onClick={handleLogoutClick}>Выйти</button>
          </> :
          <Link to={RouteNames.AUTHORIZATION}>Войти</Link>
      }
    </nav>
  );
};

export default Navigation;