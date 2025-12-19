import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RepositoryContextType {
  shouldRefresh: boolean;
  triggerRefresh: () => void;
  resetRefresh: () => void;
}

const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

export const RepositoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const triggerRefresh = () => {
    setShouldRefresh(true);
  };

  const resetRefresh = () => {
    setShouldRefresh(false);
  };

  return (
    <RepositoryContext.Provider value={{ shouldRefresh, triggerRefresh, resetRefresh }}>
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepository = () => {
  const context = useContext(RepositoryContext);
  if (context === undefined) {
    throw new Error('useRepository must be used within a RepositoryProvider');
  }
  return context;
};
