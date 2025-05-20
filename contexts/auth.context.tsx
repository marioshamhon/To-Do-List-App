import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { handleFetchUser } from "../helper_functions/userHelpers";
import type { ReactNode } from "react";

export interface AuthContextType {
  user: UserObjectWithoutPassword | null;
  setUser: (user: User) => void;

  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
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

type UserObjectWithoutPassword = Omit<User, "password"> & {
  accessToken?: string;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},

  accessToken: "",
  setAccessToken: (() => {}) as Dispatch<SetStateAction<string>>,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserState] = useState<UserObjectWithoutPassword | null>(null);
  const [accessToken, setAccessToken] = useState("");

  const setUser = (userWithPassword: User) => {
    const { password, ...safeUser } = userWithPassword;
    setUserState(safeUser as UserObjectWithoutPassword);
  };

  useEffect(() => {
    handleFetchUser(setUser, accessToken, setAccessToken);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
