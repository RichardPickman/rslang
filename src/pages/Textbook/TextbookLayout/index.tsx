import { Menu, Popover } from 'antd';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
import Container from '../../../components/Container';
import LayoutWithIntro from '../../../components/LayoutWithIntro';
import { RouteNames } from '../../../router';
import './styles.scss';
import type { MenuProps } from 'antd';
import { useAppSelector } from './../../../hooks/useAppSelector';


const content = (
  <div>
    <p>Сложные слова выделены красным цветом</p>
  </div>
);


const items: MenuProps['items'] = [
  {
    label: (
      <Link
        className={`nav__item`}
        to={RouteNames.TEXTBOOK}
      >Учебник</Link>
    ),
    key: RouteNames.TEXTBOOK.replaceAll('/', ''),
  },
];

const authItems = [
  ...items,
  {
    label: (
      <p className={`nav__item`}>Мой словарь</p>
    ),
    key: '1',
    children: [
      {
        key: RouteNames.DIFFICULT_WORDS.replaceAll('/', ''),
        label: (
          <Link
            className={`nav__item`}
            to={RouteNames.DIFFICULT_WORDS}
          >Мои сложные слова</Link>
        ),
      },
      {
        key: RouteNames.LEARNED_WORDS.replaceAll('/', ''),
        label: (
          <Link
            className={`nav__item`}
            to={`${RouteNames.LEARNED_WORDS}`}
          >Мои изученные слова</Link>
        ),
      },
    ],
  },
]

const TextbookLayout = () => {
  const { pathname } = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);
  const lastSegment = pathname.includes(RouteNames.UNITS) ? RouteNames.TEXTBOOK.replaceAll('/', '') :
    pathname.split("/").pop()?.replaceAll('/', '');
  const [current, setCurrent] = useState(RouteNames.TEXTBOOK.replaceAll('/', ''));
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };
  return (
    <LayoutWithIntro title={'Учебник'}>
      <>
        <Container>
          <>
            <Menu mode="horizontal"
              selectedKeys={[lastSegment as string]}
              items={isAuth ? authItems : items} onClick={onClick}
              className={'nav'}
            />
            <Popover className='custom-pop-over' content={content} title="Title" trigger="hover">
              <p>Hover me</p>
            </Popover>
          </>
        </Container>
        <Outlet />
      </>
    </LayoutWithIntro>
  );
};

export default TextbookLayout;