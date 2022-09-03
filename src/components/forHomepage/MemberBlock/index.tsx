import styles from "./styles.module.scss";

const MemberBlock = ({width, height, color, person}: { width: string, height: string, color: string, person: {name: string, img: string}  }) => {
  
  const _style = {width: `${width}px`, height: `${height}px`}
  return (
    <div className={styles.container} style={_style}>
       <div className={styles.photo} style={{backgroundImage:`url(${person.img})`}}></div>
      <svg
        width={`${width}px`}
        height={`${height}px`}
      >
        <rect fill="none" width="410.29" height="446.03" />
        <path
          fill={`${color}`}
          d="m410.29 446.03h-406.61c-0.25-96.01-7.1-190.63 0-285.95h406.61c-7.1 95.32-0.25 189.95 0 285.95z"
        />
      </svg>
       <div className={styles.title} style={{}}>{person.name}</div>
    </div>
  );
};

export default MemberBlock;
