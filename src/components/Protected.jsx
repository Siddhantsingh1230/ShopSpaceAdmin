import { Navigate } from "react-router-dom";

const Protected = ({ Component }) => {
  // Khushi here protected component is a HOC (higher order component) which takes an component as args or props and returns and component as result
  const user = false;
  return user ? (
    <>
      <Component />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Protected;
