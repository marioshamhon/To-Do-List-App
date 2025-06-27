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
import { refreshAccessToken } from "../services/refresh.token.service";

export interface AuthContextType {
  user: UserObjectWithoutPassword | null;
  setUser: (user: User | null) => void;

  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;

  isLoading: boolean;
  setisLoading: Dispatch<SetStateAction<boolean>>;

  isRefreshTokenExpired: Boolean;
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

  accessToken: "",
  setAccessToken: (() => {}) as Dispatch<SetStateAction<string>>,

  isLoading: true,
  setisLoading: (() => {}) as Dispatch<SetStateAction<boolean>>,

  isRefreshTokenExpired: false,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserState] = useState<UserObjectWithoutPassword | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [isRefreshTokenExpired, setIsRefreshTokenExpired] = useState(false);

  const setUser = (userWithPassword: User | null) => {
    if (userWithPassword === null) {
      setUserState(null);
      return;
    }

    const { password, ...safeUser } = userWithPassword;
    setUserState(safeUser as UserObjectWithoutPassword);
  };

  useEffect(() => {
    async function validateUser() {
      const result = await refreshAccessToken();

      if (!result.success) {
        if (result.statusCode === 401) {
          setIsRefreshTokenExpired(true);
          setisLoading(false);
          return;
        }

        console.log(result.message);
        setisLoading(false);
        return;
      }

      const newAccessToken = result.accessToken;

      setAccessToken(newAccessToken);

      await handleFetchUser(setUser, newAccessToken, setAccessToken);

      setisLoading(false);
    }

    validateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        isLoading,
        setisLoading,
        isRefreshTokenExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
