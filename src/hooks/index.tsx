import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';

interface AppProviderProps{
  children: ReactNode; //ReactNode para dizer que a propriedade é um "componente" react
}


function AppProvider({children}:AppProviderProps){
  return(
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export {AppProvider};