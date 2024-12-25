import React, { createContext, useState, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  role: string;
} | null;

type AuthContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isTokenExpired = (token: string) => {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= exp * 1000;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: decoded.id, email: decoded.email, role: decoded.role });
    } else {
      localStorage.removeItem('token'); // Remove invalid/expired token
      setUser(null);
    }
    setLoading(false); // Set loading to false after resolving user state
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
