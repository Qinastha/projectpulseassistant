import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthenticated: (
    authenticated: boolean,
    token?: string | undefined,
  ) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token"),
  );

  const setAuthenticated = (authenticated: boolean, token?: string) => {
    setIsAuthenticated(authenticated);
    if (authenticated && token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
