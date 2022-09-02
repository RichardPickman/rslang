import styles from "./styles.module.scss";

import { Link } from "react-router-dom";
import { RouteNames } from "../../../router";
import Container from "../../../components/Container";
import LinkButton from "../LinkButton";
import BgFlag from "../BgFlag";
import Arrow from "../Arrow";
import CheckCircle from "../CheckCircle";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.promo}>
            <h2 className={styles["soft-font-2"]}>Учим Английкий</h2>
            <h2 className={styles["soft-font-2"]}>вместе с</h2>

            <div className={styles["flex-top"]}>
              <BgFlag width="250" height="160">
                RS lang
              </BgFlag>

              <Arrow width="100" height="60" />
            </div>
            <div>
              <div>
                <CheckCircle size="40" bgcolor="#ff6666" textcolor="#2b3c6b">
                  3600 слов
                </CheckCircle>
              </div>
              <div>
                <CheckCircle size="40" bgcolor="#b250fe" textcolor="#2b3c6b">
                  Выбор уровня сложности
                </CheckCircle>
              </div>
              <div>
                <CheckCircle size="40" bgcolor="#1ab9ff" textcolor="#2b3c6b">
                  Учебные игры
                </CheckCircle>
              </div>
            </div>
            <h3 className={styles.h3}>
              Учить язык - значит открыть новое окно в мир
            </h3>
            <div className={styles["flex-top"]}>
              <Link to={RouteNames.TEXTBOOK}>
                <LinkButton bgcolor="#2b3c6b">Давайте начнем</LinkButton>
              </Link>
              <Link to={RouteNames.TEXTBOOK}>
                <LinkButton bgcolor="#b250fe">Играем и учим </LinkButton>
              </Link>
            </div>
          </div>
          <div className={styles["hero-image"]}></div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
