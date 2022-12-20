import './Header.css';
import logo from '../../images/logo.svg';
import { useLocation, Link} from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Navigation from '../Navigation/Navigation';

function Header({navType, onButtonClick}) {

    const location = useLocation();

    return(
        <header className={(location.pathname === '/') ? 'header' : 'header-black'}>
            <div className={(location.pathname === '/') ? 'header__content' : 'navigation-links'}>
                {(location.pathname === '/') ? (                    
                    <img className="logo" src={logo} alt="Логотип" />                 
                ) : (
                    <>
                    <Link to="/" target="_blank">
                        <img className="header-logo" src={logo} alt="Логотип" />
                    </Link>
                    <BurgerMenu onButtonClick={ onButtonClick }/>
                    </>
                )}
                <Navigation type={navType}/>
                
            </div>
        </header>
    )
}


export default Header