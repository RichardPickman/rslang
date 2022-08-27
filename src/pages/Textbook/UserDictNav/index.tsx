import React from 'react';
import { UserDictNavItem } from '../../../types/types';
import NavigationItem from './NavigationItem';
import styles from './styles.module.scss';


interface UserDictNavigationProps {
  navItems: UserDictNavItem[],
}

const UserDictNavigation = ({ navItems }: UserDictNavigationProps) => {
  return (
    <ul className={styles.nav}>
      { navItems && navItems.map((item) => <NavigationItem key={item.id} item={item}/>)}
    </ul>
  );
};

export default UserDictNavigation;