import styles from "./styles.module.scss";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { RouteNames } from "../../../router";
import Container from "../../../components/Container";
import LinkButton from "../LinkButton";
import BgFlag from "../BgFlag";
import Arrow from "../Arrow";
import CheckCircle from "../CheckCircle";


const textAnimation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.8 },
  })
}

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.promo}>
            <div className={styles["soft-font-2"]}>
              <div className={styles["title"]}>Учим Английский вместе с
                <span className={styles["flex-top"]}>
                  <BgFlag width='250' height='160'>
                    RS Lang
                  </BgFlag>
                  <Arrow width='100' height='60' />
                </span>
              </div>
            </div>


            <motion.div className={styles.description}
              initial="hidden"
              whileInView="visible"
            >
              <motion.div variants={textAnimation} custom={1}>
                <CheckCircle size='40' bgcolor='#ff6666' textcolor='#2b3c6b'>
                  3600 слов
                </CheckCircle>
              </motion.div>
              <motion.div variants={textAnimation} custom={2}>
                <CheckCircle size='40' bgcolor='#b250fe' textcolor='#2b3c6b'>
                  Выбор уровня сложности
                </CheckCircle>
              </motion.div>
              <motion.div variants={textAnimation} custom={3}>
                <CheckCircle size='40' bgcolor='#1ab9ff' textcolor='#2b3c6b'>
                  Возможность индивидуализированной работы
                </CheckCircle>
              </motion.div>
              <motion.div variants={textAnimation} custom={4}>
                <CheckCircle size='40' bgcolor='#e9a30d' textcolor='#2b3c6b'>
                  Учебные игры
                </CheckCircle>
              </motion.div>
              <motion.div variants={textAnimation} custom={5}>
                <CheckCircle size='40' bgcolor='#455b97' textcolor='#2b3c6b'>
                  Прогресс изучения и статистика
                </CheckCircle>
              </motion.div>
            </motion.div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={textAnimation}
              custom={6}
              className={styles.slogan}>Учить язык - значит открыть новое окно в мир
            </motion.h2>
            <div style={{ marginTop: "7rem" }}></div>
            <div className={styles["flex-top"]}>
              <Link to={RouteNames.TEXTBOOK}>
                <LinkButton bgcolor='#2b3c6b'>Давайте начнем</LinkButton>
              </Link>
              <Link to={RouteNames.GAMES}>
                <LinkButton bgcolor='#b250fe'>Играем и учим </LinkButton>
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
