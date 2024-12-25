import { useNavigate } from 'react-router-dom';
import useAuth from '../components/useAuth';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full hover:bg-gray-100 text-center flex items-center justify-between py-2"
    >
      Log Out
    </button>
  );
};

export default Logout;
