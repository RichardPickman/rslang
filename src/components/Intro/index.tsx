import React from 'react';
import styles from './styles.module.scss';
import BgInner1 from '../../assets/img/backgrounds/img1innerpage.png';
import BgInner2 from '../../assets/img/backgrounds/img2innerpage.png';
import BgInner3 from '../../assets/img/backgrounds/img3innerpage.png';

interface IntroProps {
  title: string,
}
const Intro = ({ title }: IntroProps) => {
  return (
    <section className={`${styles.section} ${styles['section_intro']}`}>
      <div className={`${styles['overlay']}`}></div>
      <div className={`${styles['overlay-bg']}`}></div>
      <img src={BgInner1} className={`${styles['bg-inner1']}`} alt="background" />
      <img src={BgInner2} className={`${styles['bg-inner2']}`} alt="background" />
      <img src={BgInner3} className={`${styles['bg-inner3']}`} alt="background" />
      <div className={`${styles['container']}`}>
        <h1 className={`${styles['intro__title']}`}>{title}</h1>
      </div>

    </section>
  );
};

export default Intro;