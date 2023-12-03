import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';

const ImageDisplay = () => {
  const base64Image = useSelector(
    (state: RootState) => state.form.formData.picture
  );

  return (
    <div>
      <h2>Image Display</h2>
      {base64Image && <img src={base64Image} alt="Uploaded" />}
    </div>
  );
};

export default ImageDisplay;
