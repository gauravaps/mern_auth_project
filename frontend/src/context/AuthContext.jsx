import {   useEffect, useState } from "react";
import { useContext ,createContext} from "react";
// Context
const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, email, role }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log('token' , storedUser);
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));    
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);   
