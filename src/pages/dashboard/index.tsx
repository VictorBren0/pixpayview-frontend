import { useState } from "react"
import { canSSRAuth } from "../../utils/canSSRAuth"

import Head from "next/head"
import styles from "./styles.module.scss"

import { Header } from "../../components/Header"
import { Nav } from "../../components/Nav"
import { Input } from "../../components/ui/Input"

import { setupAPIClient } from "../../services/api"

import Modal from "react-modal"

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps {
    orders: OrderProps[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    }
    order: {
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }
}

export default function Dashboard({ orders }: HomeProps) {

    const [price, setPrice] = useState(null);

    return (
        <>
            <Head>
                <title>Painel</title>
            </Head>
            <div>
                <Header />
                <Nav />
                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Digite o valor do pix</h1>
                    </div>
                    <div className={styles.containerBody}>
                        <Input
                            placeholder="R$"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </main>
            </div>
        </>
    )
}

/* export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/orders')
    return {
        props: {
            orders: response.data
        }
    }
}) */