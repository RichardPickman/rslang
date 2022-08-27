import React from 'react';
import { NavLink } from 'react-router-dom';
import { IUnit } from '../../../../types/types';
import styles from '../styles.module.scss';

interface NavigationItemProps {
  item: IUnit,
  path: string,
}

const NavigationItem = ({ item, path }: NavigationItemProps) => {
  return (
    <li className={styles.nav__item}>
      <NavLink
        to={path}
        className={
          ({ isActive }) => isActive ? `${styles['link_active']}` : undefined
        }>
        <h3>{item.name}</h3>
      </NavLink>
    </li>
  );
};

export default NavigationItem;