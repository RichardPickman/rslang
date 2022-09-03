import styles from "./styles.module.scss";

const Arrow = ({ width, height }: { width: string; height: string }) => {
  const _style = { width: `${width}px`, height: `${height}px` };
  return <div className={styles["bg-image"]} style={_style}></div>;
};
export default Arrow;
