import './header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import { IoSettings } from "react-icons/io5";

function Header() {
    return (
        <header>
            <Link className="logo" to="/">
                <img src={logo} alt="Logo" />
            </Link>
            <Link className="settings" to="/configuracoes">
                <IoSettings size={30} color='#7E8B8E' />
            </Link>
        </header>

    )
}
export default Header;