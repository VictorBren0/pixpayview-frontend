import { useContext, FormEvent, useState } from "react"
import Head from "next/head"
import styles from '../styles/home.module.scss'
import Image from "next/image"

import logoImg from '../../public/logo.png'

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Footer } from "../components/Footer"

import { AuthContext } from '../contexts/AuthContext'
import { toast } from "react-toastify"

import Link from "next/link"

import { canSSRGuest } from "../utils/canSSRGuest"

export default function Home() {
  const { login } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (username === '' || password === '') {
      toast.error('Preencha todos os campos')
      return;
    }

    setLoading(true);

    let data = {
      email: username,
      password: password
    }
    await login(data)

    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>Faça o Login!</title>
      </Head>
      <div className={styles.containerLogo}>
        <Image className={styles.logo} src={logoImg} alt="Logo" />
      </div>
      <div className={styles.containerCenter}>
        <h1>Bem Vindo!</h1>
        <h1>Realize o login para continuar</h1>
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu login"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              Loading={loading}
            >Acessar</Button>
          </form>
          <p className={styles.text}>
            A solução para evitar
            fraudes no seu negócio.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})