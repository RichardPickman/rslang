import React from 'react';
import { NavLink } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { IUnit } from '../../../../types/types';
import styles from '../styles.module.scss';

interface NavigationItemProps {
  item: IUnit,
  path: string,
}

const NavigationItem = ({ item, path }: NavigationItemProps) => {
  const { setCurrentUnitAction, setCurrentPageAction } = useActions();
  const onLinkClick = () => {
    setCurrentUnitAction((Number(item.id) - 1).toString());
    setCurrentPageAction('0');
  }
  return (
    <li className={styles.nav__item}>
      <NavLink
        to={path}
        onClick={onLinkClick}
        className={
          ({ isActive }) => isActive ? `${styles['link_active']}` : undefined
        }>
        <h3>{item.name}</h3>
      </NavLink>
    </li>
  );
};

export default NavigationItem;