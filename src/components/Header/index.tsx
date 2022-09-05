import React from 'react';
import Container from '../Container';
import Navigation from '../Navigation';
import styles from './styles.module.scss';
import logo from '../../assets/img/logo/logo.png'
import { Link } from 'react-router-dom';
import { RouteNames } from "../../router";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header__inner}>
          <Link to={RouteNames.HOMEPAGE} className={styles['logo-box']} title={'Перейти на Главную страницу'}>
              <img className={styles['logo__icon']} src={logo} alt="logo"></img>
              <p className={styles['logo__text']}>RS Lang</p>
          </Link>
          <Navigation />
        </div>
      </Container>
    </header>
  );
};

export default Header;