import styles from './styles.module.scss'
import Link from 'next/link'

export function Nav() {


    return (
        <nav className={styles.navContainer}>
                        
                <Link href="/dashboard">
                <h3>inicio</h3>
                </Link>
                <Link href="/configuracao">
                <h3> Historico</h3>
                </Link>
            
        </nav>
    )
}