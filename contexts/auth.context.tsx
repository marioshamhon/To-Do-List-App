import { createContext, useContext, useEffect, useState } from "react";
import { handleFetchUser } from "../helper_functions/userHelpers";
import type { ReactNode } from "react";

export interface AuthContextType {
  user: UserObjectWithoutPassword | null;
  setUser: (user: User) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

type UserObjectWithoutPassword = Omit<User, "password">;

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserState] = useState<UserObjectWithoutPassword | null>(null);

  const setUser = (userWithPassword: User) => {
    const { password, ...safeUser } = userWithPassword;
    setUserState(safeUser as UserObjectWithoutPassword);
  };

  useEffect(() => {
    handleFetchUser(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
