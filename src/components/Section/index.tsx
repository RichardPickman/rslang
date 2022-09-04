import React from 'react';
import Container from '../Container';
import SectionTitle from '../SectionTitle';
import styles from './styles.module.scss';

interface Props {
  title: string,
  children: JSX.Element,
}

const Section: React.FC<Props> = ({
  title,
  children,
}) => {
  return (
    <section className={`${styles.section}`}>
      <Container>
        <div className={`${styles['section__inner']}`}>
          <SectionTitle title={title} />
          { children  }
        </div>
      </Container>
    </section>
  );
};

export default Section;