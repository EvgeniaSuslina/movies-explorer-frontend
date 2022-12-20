import './Portfolio.css';
import portfolioArrow  from '../../images/portfolio-arrow.svg'

function Portfolio() {
    return(
        <section className="portfolio section">
            <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
            <li className="portfolio__element">
                <a className="portfolio__text" href="https://github.com/EvgeniaSuslina/how-to-learn" target="_blank" rel="noopener noreferrer">Статичный сайт</a>                
                    <a className="portfolio__arrow" href="https://github.com/EvgeniaSuslina/how-to-learn" target="_blank" rel="noopener noreferrer">
                        <img className="portfolio__icon" src={portfolioArrow} alt="Изображение"/>
                    </a>                
            </li>
            <li className="portfolio__element">
                <a className="portfolio__text" href="https://github.com/EvgeniaSuslina/russian-travel" target="_blank" rel="noopener noreferrer">Адаптивный сайт</a>                
                    <a className="portfolio__arrow" href="https://github.com/EvgeniaSuslina/russian-travel" target="_blank" rel="noopener noreferrer">
                        <img className="portfolio__icon" src={portfolioArrow} alt="Изображение"/>
                    </a>     
            </li>
            <li className="portfolio__element">
                <a className="portfolio__text" href="https://github.com/EvgeniaSuslina/mesto-react" target="_blank" rel="noopener noreferrer">Одностраничное приложение</a>                
                    <a className="portfolio__arrow" href="https://github.com/EvgeniaSuslina/mesto-react" target="_blank" rel="noopener noreferrer">
                        <img className="portfolio__icon" src={portfolioArrow} alt="Изображение"/>
                    </a>
            </li>
        </ul>
            
        </section>
    )
}

export default Portfolio;