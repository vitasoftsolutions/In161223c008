import { Navigate } from "react-router-dom";

function PrivetRoute({ children }) {
  const token = sessionStorage.getItem("jwt_token");
  if (token) {
    return children;
  }
  return <Navigate to={"/login"} />;
}

export default PrivetRoute;
