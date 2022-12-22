import './AboutMe.css';
import Photo from '../../images/My_photo.jpg'

function AboutMe() {
    return (
        <section className="about-me section" id='student'>
            <div className="section__header">
                <h2 className="section__title">Студент</h2>
            </div>            
                <div className="about-me__content">
                    <div className="about-me__info">
                        <h3 className="about-me__title">Евгения</h3>
                        <p className="about-me__subtitle">Фронтенд-разработчик, 27 лет</p>
                        <p className="about-me__text">
                        Я родилась и живу в Москве, закончила факультет экономики СГУ. У меня есть муж
                        и  дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начала кодить. С 2015 года работала в компании «СКБ Контур». После того, как прошла курс по веб-разработке, начала заниматься фриланс-заказами и ушла с постоянной работы.
                        </p>
                    </div> 
                        <a href="https://github.com/EvgeniaSuslina" target="_blank" rel="noopener noreferrer" className="about-me__link">
                        Github
                        </a>
                    <div className="about-me__photo">
                        <img className="about-me__pic" src={Photo} alt="Фото студента" />
                    </div>
                </div>                       
        </section>
    )
}

export default AboutMe;