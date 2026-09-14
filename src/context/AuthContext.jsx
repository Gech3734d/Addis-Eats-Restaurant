import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("addis-eats-user")) || null;
    } catch {
      return null;
    }
  });

  function login(name, phone) {
    const newUser = { name, phone };

    sessionStorage.setItem(
      "addis-eats-user",
      JSON.stringify(newUser)
    );

    setUser(newUser);
  }

  function logout() {
    sessionStorage.removeItem("addis-eats-user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}