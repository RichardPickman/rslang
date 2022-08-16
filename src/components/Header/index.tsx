import React from 'react';
import Container from '../Container';
import Navigation from '../Navigation';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header__inner}>
          <Navigation />
        </div>
      </Container>
    </header>
  );
};

export default Header;