import styles from "./styles.module.scss";


const ImageBlock = ({imageSrc}:{imageSrc: string}) => {
  

  return (
    <div className={`${styles['image-block']}`}>
      {imageSrc && 
      <img className={`${styles['image-block']}`} src={imageSrc} alt="" />
      }
    </div>
  );
};
export default ImageBlock;
