import styles from "./styles.module.scss";

import React from "react";
import Container from "../Container";
import LinkToGit from "./LinkToGit";

const data = [
  { nick: "nata-kostina", link: "https://github.com/nata-kostina" },
  { nick: "ya6", link: "https://github.com/ya6" },
  { nick: "richardpickman", link: "http://github.com/richardpickman" },
];

const Footer = () => {
  const links = data.map((el: { nick: string; link: string }, idx) => <LinkToGit key={idx} nick={el.nick} link={el.link} />);

  return (
    <footer className={styles["footer"]}>
      <Container>
        <div className={styles["footer-inner"]}>
          {links}
          <div className={styles["rss-logo"]} title='https://rs.school/js/'>
            <a href="https://rs.school/js/" className={styles["rss-link"]} target={"_blank"}>{' '}</a>
            </div>
          <span className={styles["year"]}>2022</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
