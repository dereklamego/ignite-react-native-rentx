import React,{
  createContext,
  useState,
  useContext,
  ReactNode
} from "react";
import api from "../services/api";

interface User{
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface AuthState{
  token: string;
  user:User;
}

interface SignInCredentials{
  email: string;
  password: string;
}

interface AuthContextData{
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;

}

interface AuthProviderProps{
  children: ReactNode; //ReactNode para dizer que a propriedade é um "componente" react
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
 
function AuthProvider({children}:AuthProviderProps){
  const [data,setData] = useState<AuthState>({} as AuthState);
   
  async function signIn({email,password}:SignInCredentials) {
    const response = await api.post('/sessions',{
      email,
      password
    });

    const {token, user} = response.data;

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log(response.data)
    setData({token,user})
  }

  return(
    <AuthContext.Provider
      value={{
        user:data.user,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth():AuthContextData{
  const context = useContext(AuthContext)

  return context;
}

export{AuthProvider, useAuth}