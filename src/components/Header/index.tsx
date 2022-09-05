import React from 'react';
import Container from '../Container';
import Navigation from '../Navigation';
import styles from './styles.module.scss';
import logo_full from '../../assets/img/logo/logorslang.png'
import logo from '../../assets/img/logo/logo.png'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles['logo-box']}>
        <img  className={styles['logo-full']} src={logo_full} alt=""></img>
        <img  className={styles['logo']} src={logo} alt=""></img>
      </div>
      <Container>
        <div className={styles.header__inner}>
          <Navigation />
        </div>
      </Container>
    </header>
  );
};

export default Header;