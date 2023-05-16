import styles from './styles.module.scss'
import Link from 'next/link'

import { IoSettingsSharp } from 'react-icons/io5'


export function Header() {


    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src='/logo.png' alt="logo" />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/configuracao">
                    <button>
                        <IoSettingsSharp color='#7E8B8E' size={25} />
                    </button>
                    </Link>

                </nav>
            </div>
        </header>
    )
}