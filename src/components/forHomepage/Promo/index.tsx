import styles from "./styles.module.scss";

import Container from "../../../components/Container";
import WhiteBgFlag from "../WhiteBgFlag";
import ColorSubTitle from "../ColorSubTitle";
import { motion } from "framer-motion";

const textAnimation = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.8 },
  })
}


const Hero = () => {
  return (
    <div className={styles.promo}>
      <Container>
        <div className={styles.wrapper}>
          <div style={{ margin: "12rem 0 3rem" }}>
            <ColorSubTitle width='120' height='40' color='#1ab9ff'>
              Почему Выбирают RS Lang
            </ColorSubTitle>
            <div style={{ margin: "2rem" }}></div>
            <h2 className={styles.title}> Узнайте прямо сейчас,</h2>
            <h2 className={styles.title}>почему люди любят учить английский в RS Lang</h2>
          </div>
          <div className={styles["flex-center"]}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2, once: true }}
              variants={textAnimation} custom={1}
            >
              <WhiteBgFlag width='250' height='350'>
                <div                >
                  <h4 className={styles.smalltitle} style={{ color: "#1ab9ff" }}>
                    Oдин из наиболее распространённых языков в мире
                  </h4>
                  <p>
                    Каждый пятый человек в мире говорит или понимает его. Английский является официальным или одним из основных
                    языков общения в более чем 50 странах.
                  </p>
                </div>
              </WhiteBgFlag>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2, once: true }}
              variants={textAnimation} custom={2}
            >
              <WhiteBgFlag width='250' height='350'>
                <div>
                  <h4 className={styles.smalltitle} style={{ color: "#1ab9ff" }}>
                    Открывает перед тобой новые возможности
                  </h4>
                  <p>
                    Английский – язык бизнеса. Знание языка увеличивает твои шансы получить хорошую работу или начать работать
                    за границей, так что начинай учиться прямо сейчас!
                  </p>
                </div>
              </WhiteBgFlag>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2, once: true }}
              variants={textAnimation} custom={3}
            >
              <WhiteBgFlag width='250' height='350'>
                <div>
                  <h4 className={styles.smalltitle} style={{ color: "#1ab9ff" }}>
                    На английском языке написаны величайшие произведения мировой литературы и науки
                  </h4>
                  <p>Может быть, тебе всегда хотелось прочесть книги великих английских писателей в оригинале?</p>
                </div>
              </WhiteBgFlag>
            </motion.div>
          </div>
        </div>
      </Container >
    </div >
  );
};

export default Hero;
