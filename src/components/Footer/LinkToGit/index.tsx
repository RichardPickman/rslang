import styles from "./styles.module.scss";

import githib from "../../../assets/img/icon/github-logo-white.png";

const LinkToGit = ({ nick, link }: { nick: string; link: string }) => {
  return (
    <div>
      <img className={styles.logo} src={githib} alt='githib' />
      <a  className={styles.link} href={link}>{nick}</a>
    </div>
  );
};
export default LinkToGit;
