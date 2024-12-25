import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth(); 
  if (loading) {
    // Show a loading spinner or placeholder while user state is being resolved
    return <div>Loading...</div>;
  }
  return user?.role === 'admin' ? children : <Navigate to="/admin" />;
};

export default AdminRoute;
