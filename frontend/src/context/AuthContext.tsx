import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  login,
  register,
  logout,
  getCurrentUser,
} from "../services/auth.service";

import type {
  LoginData,
  RegisterData,
} from "../types/auth.types";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;

  loginUser: (
    data: LoginData
  ) => Promise<void>;

  registerUser: (
    data: RegisterData
  ) => Promise<void>;

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
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function loginUser(
    data: LoginData
  ) {
    await login(data);

    const currentUser =
      await getCurrentUser();

    setUser(currentUser.data);
  }

  async function registerUser(
    data: RegisterData
  ) {
    await register(data);

    const currentUser =
      await getCurrentUser();

    setUser(currentUser.data);
  }

  function logoutUser() {
    logout();
    setUser(null);
  }

  useEffect(() => {
    async function loadUser() {
      const token =
        localStorage.getItem(
          "accessToken"
        );

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser =
          await getCurrentUser();

        setUser(currentUser.data);
      } catch {
        logout();
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
        registerUser,
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