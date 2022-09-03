import styles from "./styles.module.scss";


import Container from "../../../components/Container";
import ColorSubTitle from "../ColorSubTitle";
import MemberBlock from "../MemberBlock";
import avatar1 from "../../../assets/img/avatar/avatar1.jpg";
console.log(avatar1);

const team = [
  { name: "Nata", img: avatar1 },
  { name: "Alex", img: avatar1 },
  { name: "Richard", img: avatar1 },
];

const Team = () => {
  return (
    <div className={styles.team}>
      <Container>
        <>
          <div style={{ marginTop: "3rem" }}></div>

          <ColorSubTitle width='120' height='40' color='#ff6666'>
            Познакомьтесь с командой
          </ColorSubTitle>

          <div>
            <h2 className={styles["title"]}>Постоянно учимся и пишем код</h2>
            <div className={styles.flex}>
              <MemberBlock width='300' height='320' color='#ff6666' person={team[0]} />
              <MemberBlock width='300' height='320' color='#b250fe' person={team[1]} />
              <MemberBlock width='300' height='320' color='#fab319' person={team[2]} />
            </div>
          </div>
        </>
      </Container>
    </div>
  );
};

export default Team;
