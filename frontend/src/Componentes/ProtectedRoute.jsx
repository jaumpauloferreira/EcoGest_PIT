import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getToken,getUserFromToken } from '../utils/auth';

// const ProtectedRoute = ({ children }) => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//         return <Navigate to="/" />;
//     }

//     try {
//         const decodedToken = jwtDecode(token);
//         const currentTime = Date.now() / 1000;

//         if (decodedToken.exp < currentTime) {
//             localStorage.removeItem('token');
//             return <Navigate to="/" />;
//         }

//         return children;
//     } catch (error) {
//         localStorage.removeItem('token');
//         return <Navigate to="/" />;
//     }
// }

// export default ProtectedRoute;


const PrivateRoute = ({ children, roles }) => {
    const token = getToken();
  
    if (!token) {
      return <Navigate to="/login" />;
    }
  
    const user = getUserFromToken();
    if (roles && !roles.includes(user?.role)) {
      return <Navigate to="/nao-autorizado" />;
    }
  
    return children;
  };

  export default PrivateRoute;