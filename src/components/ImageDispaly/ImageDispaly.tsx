interface ImageDisplayProps {
  base64Image: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ base64Image }) => {
  return (
    <div>
      <h2>Image Display</h2>
      <img src={base64Image} alt="Uploaded" />
    </div>
  );
};


export default ImageDisplay;
