import './footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className='container-footer'>
            <Link className="footer" to="/configuracoes">
                <h2>Todos os direitos reservados 2023</h2>
            </Link>
        </footer>

    )
}
export default Footer;