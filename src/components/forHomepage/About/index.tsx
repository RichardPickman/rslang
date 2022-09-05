import styles from "./styles.module.scss";

import Container from "../../../components/Container";
import ColorSubTitleRight from "../ColorSubTitleRight";

const About = () => {
  return (
    <div className={styles.about}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles["about-image"]}></div>

          <div className={styles.content}>
            <ColorSubTitleRight width='120' height='40' color='#ff6666'>
              Немного о нас
            </ColorSubTitleRight>
            <div>
              <h2>
                Курс
                <br />
                RSS JavaScript/Front-end 2022Q1
              </h2>
              <h3>Мы - команда, волею случая и выбора собравшаяся вместе</h3>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
