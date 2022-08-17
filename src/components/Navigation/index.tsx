import React from 'react';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../router';
import styles from './styles.module.scss';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <Link to={RouteNames.HOMEPAGE}>Главная</Link>
      <Link to={RouteNames.TEXTBOOK}>Учебник</Link>
      <Link to={RouteNames.GAMES}>Игры</Link>
      <Link to={RouteNames.STATISTICS}>Статистика</Link>
      <Link to={RouteNames.LOGIN}>Логин</Link>
    </nav>
  );
};

export default Navigation;