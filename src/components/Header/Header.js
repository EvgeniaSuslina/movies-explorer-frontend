import './Header.css';
import logo from '../../images/logo.svg';
import { useLocation, Link} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({navType}) {

    const location = useLocation();

    return(
        <header className={(location.pathname === '/') ? 'header' : ' header header_type_black'}>
            <div className="header__content">
                {(location.pathname === '/') ? (                    
                    <img className="logo" src={logo} alt="Логотип" />                 
                ) : (
                    <Link to="/">
                        <img className="header__logo" src={logo} alt="Логотип" />
                    </Link>
                )} 
                <Navigation type={navType}/>
            </div>
        </header>
    )
}


export default Header