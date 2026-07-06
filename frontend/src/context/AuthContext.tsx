import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  login,
  logout,
  getCurrentUser,
} from "../services/auth.service";

import type { LoginData } from "../types/auth.types";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginUser: (data: LoginData) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  async function loginUser(data: LoginData) {
    await login(data);

    const currentUser = await getCurrentUser();

    setUser(currentUser.data);
  }

  function logoutUser() {
    logout();

    setUser(null);
  }

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();

        setUser(currentUser.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}