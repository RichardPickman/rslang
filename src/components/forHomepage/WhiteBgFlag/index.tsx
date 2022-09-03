import styles from "./styles.module.scss";

const WhiteBgFlag = ({width, height, children }: { width: string, height: string, children: JSX.Element }) => {
   const _style = {width: `${width}px`, height: `${height}px`}
  return (
    <div className={styles["bg-image"]} style={_style}>
      {children}
    </div>
  );
};

export default WhiteBgFlag;