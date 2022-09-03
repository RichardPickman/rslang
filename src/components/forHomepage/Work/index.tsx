import styles from "./styles.module.scss";

import Container from "../../../components/Container";
import WhiteBgFlag from "../WhiteBgFlag";
import ArrowLeft from "../ArrowLeft";
import ArrowRight from "../ArrowRight";
import SubTitle from "../SubTitle";
import ColorSubTitle from "../ColorSubTitle";

const Hero = () => {
  return (
    <div className={styles.promo}>
      <Container>
        <div className={styles.wrapper}>
          <div style={{ margin: "12rem 0 3rem" }}>
            <ColorSubTitle width="120" height="40" color="#fff">
              Почему Выбирают Нас
            </ColorSubTitle>
            <div style={{ margin: "2rem" }}></div>
            <h1 className={styles.title}> Узнайте прямо сейчас,</h1>
            <h1 className={styles.title}>
              почему люди любят учить английский в Rs lang
            </h1>
          </div>
          <div className={styles["flex-center"]}>
            <WhiteBgFlag width="250" height="350">
              <div>
                <h3 className={styles.smalltitle} style={{ color: "#1ab9ff" }}>
                  Oдин из наиболее распространённых языков в мире
                </h3>
                <p>
                  Каждый пятый человек в мире говорит или понимает его.
                  Английский является официальным или одним из основных языков
                  общения в более чем 50 странах.
                </p>
              </div>
            </WhiteBgFlag>
            <WhiteBgFlag width="250" height="350">
              <div>
                <h3 className={styles.smalltitle} style={{ color: "#1ab9ff" }}>
                  Открывает перед тобой новые возможности
                </h3>
                <p>
                  Английский – язык бизнеса. Знание языка увеличивает твои шансы
                  получить хорошую работу или начать работать за границей, так
                  что начинай учиться сейчас!
                </p>
              </div>
            </WhiteBgFlag>
            <WhiteBgFlag width="250" height="350">
              <div>
                <h3 className={styles.smalltitle} style={{ color: "#1ab9ff" }}>
                  На английском языке написаны величайших произведений мировой
                  литературы и науки
                </h3>
                <p>
                  Может быть, тебе всегда хотелось прочесть книги великих
                  английских писателей в оригинале?
                </p>
              </div>
            </WhiteBgFlag>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
