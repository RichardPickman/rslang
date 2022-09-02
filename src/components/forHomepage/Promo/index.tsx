import styles from "./styles.module.scss";

import { Link } from "react-router-dom";
import { RouteNames } from "../../../router";
import Container from "../../../components/Container";
import LinkButton from "../LinkButton";
import WhiteBgFlag from "../WhiteBgFlag";
import Arrow from "../Arrow";
import CheckCircle from "../CheckCircle";
import ArrowLeft from "../ArrowLeft";
import ArrowRight from "../ArrowRight";

const Hero = () => {
  return (
    <div className={styles.promo} style={{ border: "1px solid red" }}>
      <Container>
        <div className={styles.wrapper}>
          <div style={{ marginTop: "10rem" }}></div>
          <div className={styles["flex-center"]}>
            <ArrowLeft width="120" height="40" />
            <h3 className={styles.subtitle}>Почему Выбирают Нас</h3>
            <ArrowRight width="120" height="40" />
          </div>
          <h1 className={styles.title}> Узнайте прямо сейчас,</h1>
          <h1 className={styles.title}>почему люди приходят в Rs lang</h1>
          <div className={styles['flex-center']}>
            <WhiteBgFlag width="200" height="350" >
             1
            </WhiteBgFlag>
            
            <WhiteBgFlag width="200" height="350" >
             1
            </WhiteBgFlag>
            
            <WhiteBgFlag width="200" height="350" >
             1
            </WhiteBgFlag>
            
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
