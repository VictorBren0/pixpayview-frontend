import './menu.css';
import { Link } from 'react-router-dom';


function Menu() {
    return (
        <div className="container-menu">
            <div className="content-menu">
            <Link className='title-menu' to="/">
                <h2>Inicio</h2>
            </Link>
            <Link className='title-menu' to="/">
                <h2>Historico</h2>
            </Link>
            </div>
        </div>

    )
}
export default Menu;