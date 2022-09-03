import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Container from '../../../components/Container';
import Layout from '../../../components/Layout';
import LayoutWithIntro from '../../../components/LayoutWithIntro';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { RouteNames } from '../../../router';
import styles from './styles.module.scss';

const TextbookLayout = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <LayoutWithIntro title={'Учебник'}>
      <section className={`${styles['section']} ${styles['section-textbook']}`}>
        <Container>
          <div className={styles['section__inner']}>
            <ul className={styles['menu-tab']}>
              <li ><Link className={styles['textbook']} to={RouteNames.TEXTBOOK}>Учебник</Link></li>
              {isAuth && <li ><Link className={styles['dictionary']} to={RouteNames.USER_DICTIONATY}>Мой словарь</Link></li>}
            </ul>
          </div>
        </Container>
        <Outlet />
      </section>
    </LayoutWithIntro>
  );
};

export default TextbookLayout;