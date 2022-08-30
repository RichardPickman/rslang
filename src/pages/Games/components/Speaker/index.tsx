import styles from "./styles.module.scss";

import icon_speak from "../../assets/img/icon_speak.svg";

const Speaker = ({ size, speaks }: { size: string; speaks: string }) => {
  const _size = styles[`${size}-speaker`],
    _icon = styles[`${size}-icon-speak`];

  return (
    <div className={`${_size}`}>
      <img className={_icon} src={icon_speak} alt="speak" />
    </div>
  );
};
export default Speaker;
