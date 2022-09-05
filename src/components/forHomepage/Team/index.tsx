import styles from "./styles.module.scss";


import Container from "../../../components/Container";
import ColorSubTitle from "../ColorSubTitle";
import MemberBlock from "../MemberBlock";
import avatar1 from "../../../assets/img/avatar/avatar1.jpg";
import avatar_ya from "../../../assets/img/avatar/avatar-ya.jpg";
import avatar_nata from "../../../assets/img/avatar/avatar-nata.jpg";


const team = [
  { name: "Nata", img: avatar_nata, description: 'Разработала весь основной функционал приложения на React, настроила Redux, сверстала следующие страницы: Учебник, Игры, Статистика, Авторизация, Регистрация. Написала игру Спринт. Реализовала ежедневную статистику по игре Спринт.', github: "https://github.com/nata-kostina" },
  { name: "Alex", img: avatar_ya, description: '', github: "https://github.com/ya6" },
  { name: "Richard", img: avatar1, description: '', github: "http://github.com/richardpickman" },
];

const Team = () => {
  return (
    <section className={styles.team}>
      <Container>
        <div className={styles[`${'team__inner'}`]}>
          <>
            <ColorSubTitle width='120' height='40' color='#ff6666'>
              Познакомьтесь с командой
            </ColorSubTitle>
            <h2 className={styles["title"]}>Постоянно учимся и пишем код</h2>
            <ul className={`${styles["list"]} ${styles["list-members"]}`}>
                <MemberBlock  width='300' height='320' color='#ff6666' person={team[0]} />
                <MemberBlock width='300' height='320' color='#b250fe' person={team[1]} />
                <MemberBlock width='300' height='320' color='#fab319' person={team[2]} />
            </ul>
          </>
        </div>
      </Container>
    </section>
  );
};

export default Team;
