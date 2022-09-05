import styles from "./styles.module.scss";

import Container from "../../../components/Container";
import WhiteBgFlag from "../WhiteBgFlag";
import ColorSubTitle from "../ColorSubTitle";

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
            <h2 className={styles.title}>почему люди любят учить английский в RS lang</h2>
          </div>
          <div className={styles["flex-center"]}>
            <WhiteBgFlag width='250' height='350'>
              <div>
                <h4 className={styles.smalltitle} style={{ color: "#1ab9ff" }}>
                  Oдин из наиболее распространённых языков в мире
                </h4>
                <p>
                  Каждый пятый человек в мире говорит или понимает его. Английский является официальным или одним из основных
                  языков общения в более чем 50 странах.
                </p>
              </div>
            </WhiteBgFlag>
            <WhiteBgFlag width='250' height='350'>
              <div>
                <h4 className={styles.smalltitle} style={{ color: "#1ab9ff" }}>
                  Открывает перед тобой новые возможности
                </h4>
                <p>
                  Английский – язык бизнеса. Знание языка увеличивает твои шансы получить хорошую работу или начать работать
                  за границей, так что начинай учиться сейчас!
                </p>
              </div>
            </WhiteBgFlag>
            <WhiteBgFlag width='250' height='350'>
              <div>
                <h4 className={styles.smalltitle} style={{ color: "#1ab9ff" }}>
                  На английском языке написаны величайшие произведений мировой литературы и науки
                </h4>
                <p>Может быть, тебе всегда хотелось прочесть книги великих английских писателей в оригинале?</p>
              </div>
            </WhiteBgFlag>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
