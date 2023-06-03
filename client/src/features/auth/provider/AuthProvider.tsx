import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export type AuthContextApi = {
  email: string | null;
  isAuthenticated: boolean;
  authenticate(email: string): Promise<void>;
  signOff(): Promise<void>;
};

export const AuthContext = createContext<AuthContextApi | null>(null);

export type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  const isAuthenticated = useMemo(() => {
    return email !== null;
  }, [email]);

  const authenticate = useCallback(
    (email: string) => {
      localStorage.setItem("email", email);
      setEmail(email);

      return Promise.resolve();
    },
    [email, setEmail]
  );

  const signOff = useCallback(() => {
    localStorage.removeItem("email");
    setEmail(null);

    return Promise.resolve();
  }, [setEmail]);

  return (
    <AuthContext.Provider
      value={{ email, isAuthenticated, authenticate, signOff }}
    >
      {children}
    </AuthContext.Provider>
  );
}
