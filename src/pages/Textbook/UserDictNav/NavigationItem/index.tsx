import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserDictNavItem } from '../../../../types/types';
import styles from '../styles.module.scss';

interface NavigationItemProps {
  item: UserDictNavItem
}

const NavigationItem = ({ item }: NavigationItemProps) => {
  return (
    <li className={styles.nav__item}>
      <NavLink
        to={item.route}
        className={
          ({ isActive }) => isActive ? `${styles['link_active']}` : undefined
        }>
        <h3>{item.name}</h3>
      </NavLink>
    </li>
  );
};

export default NavigationItem;