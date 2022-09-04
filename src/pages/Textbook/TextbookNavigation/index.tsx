import React from 'react';
import { IUnit } from '../../../types/types';
import NavigationItem from './NavigationItem';
import styles from './styles.module.scss';
import { difficultWordsUnit } from '../../../data/constants';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { RouteNames } from '../../../router';
import CustomSwiper from '../../../components/ui/Swiper';
import Container from '../../../components/Container';
import SectionTitle from '../../../components/SectionTitle';


const TextbookNavigation = () => {
  const { units } = useAppSelector((state) => state.textbook);

  const { isAuth } = useAppSelector((state) => state.auth);
  const slides: JSX.Element[] = units.map((u) => <NavigationItem key={u.id} item={u} path={`${RouteNames.UNITS}/${u.id}`} />);
  if (isAuth) {
    slides.push(<NavigationItem item={difficultWordsUnit} path={`${RouteNames.USER_DICTIONATY}/${RouteNames.DIFFICULT_WORDS}`} />);
  }
  return (
    <section className={`${styles.section} ${styles['section-unit-nav']}`}>
      <Container>
        <div className={`${styles.section} ${styles['section__inner']}`}>
          <SectionTitle title={'Выбери раздел'} />
          <div className={styles['swiper-container']}>
            <CustomSwiper slides={slides} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TextbookNavigation;