import React from 'react';
import { IUnit } from '../../../types/types';
import NavigationItem from './NavigationItem';
import styles from './styles.module.scss';
import { difficultWordsUnit } from '../../../data/constants';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { RouteNames } from '../../../router';

interface TextbookNavigationProps {
  units: IUnit[],
}

const TextbookNavigation = ({ units }: TextbookNavigationProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <ul className={styles.nav}>
      {units && units.map((u) => <NavigationItem key={u.id} item={u} path={`${RouteNames.UNITS}/${u.id}`} />)}
      {isAuth && <NavigationItem item={difficultWordsUnit} path={`${RouteNames.USER_DICTIONATY}/${RouteNames.DIFFICULT_WORDS}`} />}
    </ul>
  );
};

export default TextbookNavigation;