import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Oops!</h2>
      <Link className={styles.link} to="/">Go Home!</Link>
    </div>
  );
};

export default NotFound;
