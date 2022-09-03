import React from "react";
import Container from "../Container";
import LinkToGit from "./LinkToGit";
import styles from "./styles.module.scss";
import rsslogo from "../../assets/img/icon/rs-school-js.png";

const data = [
  { nik: "nata-kostina", link: "https://github.com/nata-kostina" },
  { nik: "ya6", link: "https://github.com/ya6" },
  { nik: "richardpickman", link: "http://github.com/richardpickman" },
];

const Footer = () => {
  const links = data.map((el: { nik: string; link: string }) => <LinkToGit nik={el.nik} link={el.link} />);
  const rss = <img className={styles["rss-logo"]} src={rsslogo} alt='logo' />;
  const year = <h2 className={styles["year"]}>2022</h2>;

  return (
    <footer className={styles["footer"]}>
      <Container>
        <div className={styles["footer-inner"]}>
          {links} {rss} {year}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
