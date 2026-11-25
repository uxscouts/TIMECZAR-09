import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Called once a real login (e.g., Auth0 or API) succeeds
  function signIn(newToken, userProfile) {
    setToken(newToken);
    setUser(userProfile);
  }

  // Handy placeholder while building UI before Auth0/backend is wired up
  function signInDevUser() {
    setToken("dev-mock-token");
    setUser({
      userid: "1001",
      name: "Dev User",
      email: "dev@tomato220.local",
    });
  }

  function signOut() {
    setToken(null);
    setUser(null);
  }

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token && user),
    signIn,
    signInDevUser,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return context;
}