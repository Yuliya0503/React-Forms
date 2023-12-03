import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../Store/store';
import ImageDisplay from '../../components/ImageDispaly/ImageDispaly';
import styles from './MainPage.module.css';

const Main: React.FC = () => {
  const base64Image = useSelector(
    (state: RootState) => state.form.formData.picture
  );

  return (
    <div className={styles.main_container}>
      <h2 className={styles.title}>Main Page</h2>
      <nav>
        <ul className={styles.nav_list}>
          <li>
            <Link className={styles.link} to="/uncontrolled-form">
              Uncontrolled Form
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/hook-form">
              React Hook Form
            </Link>
          </li>
        </ul>
      </nav>
      {base64Image && <ImageDisplay base64Image={base64Image} />}
    </div>
  );
};

export default Main;
