import React from 'react';
import loaderImg from '../../assets/img/loader.png';
import styles from './styles.module.scss';

const Loader = () => {
  return (
    <div className={`${styles['loader-container']} ${styles.bounce}`}>
    <img src={loaderImg} />
    </div>
  );
};

export default Loader;