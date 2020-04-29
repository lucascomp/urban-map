import { createContext, useContext } from 'react';

const UserContext = createContext(null);

export default UserContext;

export const useUser = () => {
  const user = useContext(UserContext);

  return user;
};
