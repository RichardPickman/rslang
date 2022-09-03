import styles from "./styles.module.scss";
import ArrowLeft from "../ArrowLeft";
import ArrowRight from "../ArrowRight";

const SubTitle = ({ width, height, children }: { width: string; height: string; children: string }) => {
  return (
    <div className={styles["flex-center"]}>
      <ArrowLeft width={width} height={height} />
      <h3 className={styles.subtitle}>{children}</h3>
      <ArrowRight width={width} height={height} />
    </div>
  );
};
export default SubTitle;
