import styles from "./styles.module.scss";

import React from "react";
import { Link } from "react-router-dom";
import { Games } from "../../data/constants";
import { RouteNames } from "../../router";
import { GameMode } from "../../types/types";
import { Card } from "antd";
import audiocall_promo from "../../assets/img/background/audiocall-promo-1.png";
import sprint_promo from "../../assets/img/background/sprint-promo-1.png";

const GamesNavigation = ({ state }: { state: GameMode }) => {
  return (
    <div className={`${styles["nav"]}`}>
      {Games.map((game) => {
        const _style = {width: 400, background: game.id === 0 ? "#ff6666": '#1ab9ff',  borderRadius: "20px",
    overflow: "hidden"}
        return (
          <Link to={`${RouteNames.GAMES}/${game.link}`} state={state}>
            <Card
              hoverable
              style={_style}
              cover={<img alt='img' src={game.id === 0 ? audiocall_promo : sprint_promo} />}
            >
              <Card.Meta title={game.title} description={game.description} />
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default GamesNavigation;
