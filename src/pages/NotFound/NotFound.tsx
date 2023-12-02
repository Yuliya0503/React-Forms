import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <h2>Oops!</h2>
      <Link to="/">Go Home!</Link>
    </>
  );
};

export default NotFound;
