import { ImageDisplayProps } from '../../models/interface';
import styles from './ImageDisplay.module.css';

const ImageDisplay: React.FC<ImageDisplayProps> = ({ base64Image }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Pictures</h2>
      <img className={styles.img} src={base64Image} alt="Uploaded" />
    </div>
  );
};

export default ImageDisplay;
