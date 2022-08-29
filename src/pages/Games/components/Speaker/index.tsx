import styles from "./styles.module.scss";



import icon_speak from '../../assets/img/icon_speak.svg'

const Speaker = ({ size }: { size: string }) => {
  return (
    <div className={styles[`${size}-speaker`]}>
      <img className={styles[`${size}-icon-speak`]} src={icon_speak} alt="speak" />
    </div>
  );
};
export default Speaker;
