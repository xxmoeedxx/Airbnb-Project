import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth(); 
  if (loading) {
    // Show a loading spinner or placeholder while user state is being resolved
    return <div>Loading...</div>;
  }
  if (user && user.role === 'admin') {
    return children;
  } else {
    localStorage.setItem('previousPage', window.location.pathname);
    return <Navigate to="/admin" replace />;
  }
};

export default AdminRoute;
