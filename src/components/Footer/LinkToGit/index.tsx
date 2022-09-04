import styles from "./styles.module.scss";

import githib from "../../../assets/img/icon/github-logo-white.png";

const LinkToGit = ({ nik, link }: { nik: string; link: string }) => {
  return (
    <div>
      <img className={styles.logo} src={githib} alt='githib' />
      <a  className={styles.link} href={link}>{nik}</a>
    </div>
  );
};
export default LinkToGit;
