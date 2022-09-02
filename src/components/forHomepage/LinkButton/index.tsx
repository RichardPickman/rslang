import styles from "./styles.module.scss";

const LinkButton = ({ bgcolor, children }: { bgcolor: string, children: string }) => {
 const inlineStyles = {background: bgcolor}
  return (
    <button type="button" className={styles['link-button']} style={inlineStyles} >
      <div className={styles.text}>
      {children.toLocaleUpperCase()}
      </div>
    </button>
  );
};

export default LinkButton;