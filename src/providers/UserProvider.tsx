import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

export interface User {
  username: string;
  id: number;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}

const initialState = {
  user: null,
  setUser: () => {},
  resetUser: () => {},
};

const UserContext = createContext<UserState>(initialState);

interface UserProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

function userReducer(
  state: User | null,
  action: { type: string; payload: User | null }
) {
  switch (action.type) {
    case "user/set_user":
      return action.payload;
    case "user/reset_user":
      return null;
    default:
      return state;
  }
}

export function UserProvider({
  children,
  initialUser = null,
}: UserProviderProps) {
  const [user, dispatchUser] = useReducer(userReducer, initialUser);

  const setUser = useCallback((user: User) => {
    dispatchUser({ type: "user/set_user", payload: user });
  }, []);

  const resetUser = useCallback(() => {
    dispatchUser({ type: "user/reset_user", payload: null });
  }, []);

  const value = useMemo<UserState>(
    () => ({ user, setUser, resetUser }),
    [user, setUser, resetUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const userState = useContext(UserContext);

  if (userState === undefined)
    throw new Error("useUser must be used within a UserProvider");

  return userState;
};
