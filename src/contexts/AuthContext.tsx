import { createContext, ReactNode, useState, useEffect } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router';

import { toast } from 'react-toastify';


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    login: (credentials: LoginProps) => Promise<void>;
    logout: () => void;
    register: (credentials: RegisterProps) => Promise<void>;
}

type UserProps = {
    acessToken: string
}

type LoginProps = {
    email: string;
    password: string;
}
type RegisterProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function logout() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch (err) {
        console.log("erro ao deslogar")
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;


    // Verificando se o usuário está logado
    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies()

        if (token) {
            api.get('/me').then(response => {
                const { id, name, email } = response.data;

                setUser({
                    id,
                    name,
                    email,
                })
            })
            .catch(() => {
                logout()
            })
        }
    }, [])

    async function login({ email, password }: LoginProps) {
        console.log(email, password)
        try {
            const response = await api.post('/auth/login', {
                email,
                password
            })
            const { acessToken } = response.data;
            console.log(response.data)

            setCookie(undefined, '@nextauth.token', acessToken, {
                maxAge: 60 * 60 * 24 * 30, // Acaba em 30 dias
                path: "/" // Qual caminho vai ter acesso ao cookie
            })

            setUser({
                acessToken
            })

            // Colocando o token no cabeçalho da requisição
            api.defaults.headers['Authorization'] = `Bearer ${acessToken}`

            toast.success("Login realizado com sucesso!")
            // Redirecionando o usuário para a dashboard
            Router.push('/dashboard')
        } catch (err) {
            console.log("Erro ao acessar ", err)
            toast.error("Erro ao acessar")
        }
    }
    async function register({ name, email, password }: RegisterProps) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success("Cadastro realizado com sucesso!")
            Router.push('/')
        } catch (error) {
            toast.error("Erro ao cadastrar")
        }
    }


return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
        {children}
    </AuthContext.Provider>
)
}