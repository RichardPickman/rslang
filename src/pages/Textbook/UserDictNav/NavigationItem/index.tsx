import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RouteNames } from '../../../../router';
import { SectionEnum, UserDictNavItem } from '../../../../types/types';
import styles from '../styles.module.scss';

interface NavigationItemProps {
  item: UserDictNavItem
}

const NavigationItem = ({ item }: NavigationItemProps) => {
  return (
    <li className={styles.nav__item}>
      <NavLink
        to={
          item.type === SectionEnum.DIFFICULT_WORDS ?
          `${RouteNames.DIFFICULT_WORDS}` :
          ''
        }
        className={
          ({ isActive }) => isActive ? `${styles['link_active']}` : undefined
        }>
        <h3>{item.name}</h3>
      </NavLink>
    </li>
  );
};

export default NavigationItem;