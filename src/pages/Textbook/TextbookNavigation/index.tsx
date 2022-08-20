import React from 'react';
import { IUnit } from '../../../types/types';
import NavigationItem from './NavigationItem';
import styles from './styles.module.scss';

interface TextbookNavigationProps {
  units: IUnit[],
}

const TextbookNavigation = ({ units }: TextbookNavigationProps) => {
  return (
    <ul className={styles.nav}>
      { units && units.map((u) => <NavigationItem key={u.id} item={u}/>)}
    </ul>
  );
};

export default TextbookNavigation;