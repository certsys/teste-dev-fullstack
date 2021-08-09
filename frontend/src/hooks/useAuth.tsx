import { useState } from "react";
import { useToast } from '@chakra-ui/react';
import { createContext, useContext, ReactNode } from "react";
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { api } from "../services/apiClient";
import { useEffect } from "react";

interface User {
  email: string;
  permissions: string[];
  roles: string[];
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'imoveis.token', { path: '/' });
  // destroyCookie(undefined, 'nextauth.refreshToken', { path: '/' });

  authChannel.postMessage('signOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const toast = useToast();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          authChannel.close();
          break;
        case 'signIn':
          Router.push('/home');
          authChannel.close();
          break;

        default:
          break;
      }
    }
  }, []);

  // useEffect(() => {
  //   const { 'imoveis.token': token } = parseCookies()

  //   if (token) {
  //     api.get('/me')
  //       .then(response => {
  //         const { email, permissions, roles } = response.data

  //         setUser({ email, permissions, roles })
  //       })
  //       .catch(() => {
  //         signOut();
  //       })
  //   }
  // }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      });

      // const { token, refreshToken, permissions, roles } = response.data;
      const { token } = response.data;
      setCookie(undefined, 'imoveis.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });
      // setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
      //   maxAge: 60 * 60 * 24 * 30, // 30 days
      //   path: '/'
      // });

      // setUser({
      //   email,
      //   // permissions,
      //   // roles
      // });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast({
        title: "Login Efetuado! 🤝",
        description: "Login Efetuado com Sucesso! 🙆",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      })

      Router.push('/home');

      authChannel.postMessage('signIn');
    } catch (error) {
      toast({
        title: "Erro 😢!",
        description: "Ocorreu um erro ao efetuar o login, cheque suas credenciais! 🙏",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}