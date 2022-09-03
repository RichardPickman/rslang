import styles from "./styles.module.scss";

const CheckCircle = ({
  size,
  bgcolor,
  textcolor,
  children,
}: {
  size: string;
  bgcolor: string;
  textcolor: string;
  children: string;
}) => {
  return (
    <span className={styles.wrapper}>
      <svg
        style={{ verticalAlign: `-${Number(size) * 0.1}px` }}
        width={`${size}px`}
        height={`${size}px`}
        version='1.0'
        viewBox='0 0 1004 1004'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle fill={`${bgcolor}`} cx='501.99' cy='501.99' r='499.68' />
        <path
          fill='#fff'
          d='m439.05 597.75 239.67-342.29c24.19-34.55
            72.24-43.02 106.79-18.83s43.02 72.24 18.83 106.79l-283.65 405.1c-24.19
            34.55-72.24 43.02-106.79
            18.83-0.5-0.35-1-0.71-1.49-1.07-0.51-0.34-1.02-0.68-1.52-1.04l-192.41-134.72c-34.55-24.19-43.02-72.24-18.83-106.79s72.24-43.02
            106.79-18.83l132.6 92.85z'
        />
      </svg>
      <span style={{ fontSize: `${Number(size) * 0.95}px`, color: `${textcolor}`, marginLeft: `${Number(size) * 0.15}px` }}>
        {children}
      </span>
    </span>
  );
};

export default CheckCircle;
