import { createContext, useContext, useEffect, useState } from "react";
import { getItem, saveItem } from "../securestore/auth.storage";
import type { ReactNode } from "react";

interface AuthContextType {
  user: UserObjectWithoutPassword | null;
  setUser: (userObject: User) => Promise<void>;
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
  setUser: async (_userObject: User): Promise<void> => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserState] = useState<UserObjectWithoutPassword | null>(null);

  const setUser = async (userObject: User) => {
    const { password, ...userObjectWithoutPassword } = userObject; //strip the password from the object
    userObject = undefined as any; //destroy the original object for security purposes
    setUserState(userObjectWithoutPassword);
    await saveItem("user", JSON.stringify(userObjectWithoutPassword));
  };

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getItem("user");
      if (storedUser) setUserState(JSON.parse(storedUser));
    };
    loadUser();
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
