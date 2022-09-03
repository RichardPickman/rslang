import styles from "./styles.module.scss";

import { Link } from "react-router-dom";
import { RouteNames } from "../../../router";
import Container from "../../../components/Container";
import LinkButton from "../LinkButton";
import BgFlag from "../BgFlag";
import Arrow from "../Arrow";
import CheckCircle from "../CheckCircle";
import ColorSubTitleRight from "../ColorSubTitleRight";

const About = () => {
  return (
    <div className={styles.about}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles["about-image"]}></div>

          <div className={styles.content}>
            <ColorSubTitleRight width="120" height="40" color="#ff6666">
              Немного о нас
            </ColorSubTitleRight>
            <div>
              <h2>Курс<br/>
                RSS JavaScript/Frontend 2022Q1</h2>
              <p style={{fontSize: '1.5rem'}}>Мы команда, волею случая и выбора собравшаяся вместе для ...</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
