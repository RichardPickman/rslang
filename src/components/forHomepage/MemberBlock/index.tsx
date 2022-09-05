import Container from "../../Container";
import styles from "./styles.module.scss";
import ImgGithub from "../../../assets/img/icons/git-hub.png"
const MemberBlock = ({
  width,
  height,
  color,
  person,
}: {
  width: string;
  height: string;
  color: string;
  person: { name: string; img: string, description: string, github: string };
}) => {
  const _style = { width: `${width}px`, height: `${height}px` };
  return (
    <div className={styles['member__item']}>
      <div className={styles['item__inner']}>
        <div className={styles.photo} style={{ backgroundImage: `url(${person.img})` }}></div>
        <div className={styles.title} style={{}}>
          {person.name}
          <span className={styles['link-container']}>
            <a className={styles['link-github']} href={person.github}>
              <img src={ImgGithub}/>
            </a>
          </span>
        </div>
        <div className={styles.description} style={{}}>
          {person.description}
        </div>
      </div>
    </div>
  );
};

export default MemberBlock;
