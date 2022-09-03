import React from 'react';
import { NavLink } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { IUnit } from '../../../../types/types';
import styles from '../styles.module.scss';
import BookSVG from '../../../../assets/img/textbook/book.svg';

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
        <div className={styles['box-wrap']}>
          <div className={styles['box-content']}>
            <h3 className={styles['title']}>{item.name}</h3>
            <div className={styles['sub']}>
              <p>{item.description}</p>
            </div>
          </div>
          <ul className={styles['description-list']}>
            <li className={styles['list__item']}>

              {item.wordsNum.endsWith('1') && <>
                <img src={BookSVG} className={styles['icon']} alt='book icon' />
                <p>{item.wordsNum} слово</p>
              </>
              }
              {Number(item.wordsNum) > 1 && <>
                <img src={BookSVG} className={styles['icon']} alt='book icon' />
                <p>{item.wordsNum} слов</p>
              </>}
            </li>
          </ul>
        </div>
      </NavLink>
    </li>
  );
};

export default NavigationItem;