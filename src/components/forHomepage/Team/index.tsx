import styles from "./styles.module.scss";

import { Link } from "react-router-dom";
import { RouteNames } from "../../../router";
import Container from "../../../components/Container";
import LinkButton from "../LinkButton";
import BgFlag from "../BgFlag";
import Arrow from "../Arrow";
import CheckCircle from "../CheckCircle";
import ColorSubTitle from "../ColorSubTitle";
import MemberBlock from "../MemberBlock";
import avatar1 from "../../../assets/img/avatar/avatar1.jpg";
console.log(avatar1);

const team = [
  { name: "Name", img: avatar1 },
  { name: "Name", img: avatar1 },
  { name: "Name", img: avatar1 },
];

const Team = () => {
  return (
    <div className={styles.team}>
      <Container>
        <>
          <div style={{ marginTop: "3rem" }}></div>

          <ColorSubTitle width="120" height="40" color="#ff6666">
            Познакомьтесь с командой
          </ColorSubTitle>

          <div>
            <h1 className={styles["title"]}>Постоянно учимся и пишем код</h1>
            <div className={styles.flex}>
              <MemberBlock
                width="300"
                height="320"
                color="#ff6666"
                person={team[0]}
              />
              <MemberBlock
                width="300"
                height="320"
                color="#b250fe"
                person={team[0]}
              />
              <MemberBlock
                width="300"
                height="320"
                color="#fab319"
                person={team[0]}
              />
            </div>
          </div>
        </>
      </Container>
    </div>
  );
};

export default Team;
