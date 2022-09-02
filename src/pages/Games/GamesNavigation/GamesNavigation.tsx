import React from "react";
import { Link } from "react-router-dom";
import { RouteNames } from "../../../router";
import { GameMode } from "../../../types/types";
import { Card } from "antd";
import Container from "../../../components/Container";
import styles from "./styles.module.scss";
import audiocall_promo from  '../../../assets/img/background/audiocall-promo.jpg'
import sprint_promo from  '../../../assets/img/background/sprint-promo.jpg'

const GamesNavigation = ({ state }: { state: GameMode }) => {
  return (
    <Container>
      <div className={styles.container}>
        <div>
          <Link
            to={`${RouteNames.GAMES}/${RouteNames.AUDIOCALL_GAME}`}
            state={state}
          >
            <Card
              hoverable
              style={{ width: 320, background: '#ff6666' }}
              cover={
                <img
                  alt="audiocall_promo"
                  src={audiocall_promo}
                />
              }
            >
              <Card.Meta
                title="Аудиовызов"
                description="Развиваем словарный запас"
              />
            </Card>
          </Link>
        </div>
        <div>
          <Link
            to={`${RouteNames.GAMES}/${RouteNames.SPRINT_GAME}`}
            state={state}
          >
            <Card
              hoverable
              style={{ width: 320, background: '#b250fe' }}
              cover={
                <img
                  alt="sprint_promo"
                  src={sprint_promo}
                />
              }
            >
              <Card.Meta title="Спринт" description="Игра на время" />
            </Card>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default GamesNavigation;
