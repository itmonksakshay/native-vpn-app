import React, { createContext, useState } from "react";

export type UserContextType = {
  userId: string;
  setUserId: (id: string) => void;
};

export const UserContext = createContext<UserContextType>({
  userId: "",
  setUserId: () => {},
});

export default function ({ children }: any) {
  const [userId, setUserId] = useState<string>("");

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
