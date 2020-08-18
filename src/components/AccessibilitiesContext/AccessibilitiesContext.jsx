import { createContext, useContext } from 'react';

const AccessibilitiesContext = createContext([]);

export default AccessibilitiesContext;

export const useAccessibilities = () => {
  const accessibilites = useContext(AccessibilitiesContext);

  return accessibilites || [];
};
