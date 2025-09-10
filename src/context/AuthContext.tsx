import React, { createContext, useContext, useState, useEffect } from "react";

interface Login {
  id?: string;
  email?: string;
  name?: string;
  username?: string;
  password?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: Login | null;
  login: (user: Login) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<Login | null>(null);

  // Very Important 
  // Handle if use already login
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        const userData: Login = JSON.parse(storedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem("loggedInUser");
      }
    }
  }, []);

  // Very Important
  // Update state immediately if login/logout happens in this or another component/tab.
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        try {
          const userData: Login = JSON.parse(storedUser);
          setUser(userData);
          setIsLoggedIn(true);
        } catch {
          localStorage.removeItem("loggedInUser");
          setUser(null);
          setIsLoggedIn(false);
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    window.addEventListener("localStorageUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageChange);
    };
  }, []);

  const login = (userData: Login) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
