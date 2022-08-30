import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { RouteNames } from '../../router';
import styles from './styles.module.scss';
import { useActions } from '../../hooks/useActions';
import { Dropdown, Menu, Space } from 'antd';
import { GameMode } from '../../types/types';

const menu = (
  <Menu>
    <Menu.Item key={0}>
      <Link to={`${RouteNames.GAMES}/${RouteNames.SPRINT_GAME}`}
        state={GameMode.MENU_GAME}>Спринт
      </Link>
    </Menu.Item>
  </Menu>
);
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
      <Dropdown overlay={menu}>
        <Link to={RouteNames.GAMES}>
          <Space> Игры   </Space>
        </Link>
      </Dropdown>
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