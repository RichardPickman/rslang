import styles from "./styles.module.scss";

const BgFlag = ({width, height, children }: { width: string, height: string, children: string }) => {
   const _style = {width: `${width}px`, height: `${height}px`}
  return (
    <div className={styles["bg-path"]} style={_style}>
      <div className={styles.centered}>{children}</div>
    </div>
  );
};

export default BgFlag;