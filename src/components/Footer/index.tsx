import React from 'react';
import Container from '../Container';
import styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footer__inner}>
          Footer
        </div>
      </Container>
    </footer>
  );
};

export default Footer;