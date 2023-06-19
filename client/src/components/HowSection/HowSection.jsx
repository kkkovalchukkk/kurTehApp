import React from "react";

const HowSection = ({showRegisterPopup}) => {
  return (
    <section className='how-section'>
      <div className='wrapper how-section__wrapper'>
        <h2 className='subheading'>Как мы это делаем</h2>
        <div className='how-section__row-list'>
          <div className='how-section__row'>
            <div className='how-section__block'>
              <h4 className='how-section__block-heading'>Для работодателей</h4>
              <p className='how-section__block-text'>Ключевые игроки на рынке труда, которые предоставляют возможности трудоустройства и развития профессиональной карьеры</p>
              <ul className='how-section__block-list'>
                <li className='how-section__block-list-item'>Регистрация занимает 5 минут</li>
                <li className='how-section__block-list-item'>Оставьте заявку</li>
                <li className='how-section__block-list-item'>Дождитесь пока администратор проверит вашу заявку</li>
                <li className='how-section__block-list-item'>Просматривайте список заявок</li>
                <li className='how-section__block-list-item'>Выберите исполнителя</li>
              </ul>
              <a
                href=''
                className='btn main-btn how-section__block-main-btn'
                onClick={(e) => {
                  e.preventDefault();
                  showRegisterPopup();
                }}
              >
                Зарегистрироваться
              </a>
            </div>
            <div className='how-section__block'>
              <h4 className='how-section__block-heading'>Для студентов</h4>
              <p className='how-section__block-text'>Профессионалы, которые реализуют требования и ожидания клиентов, выполняя поставленные задачи и проекты</p>
              <ul className='how-section__block-list'>
                <li className='how-section__block-list-item'>Регистрация занимает 1 минуту</li>
                <li className='how-section__block-list-item'>Введите свои данные</li>
                <li className='how-section__block-list-item'>Подтвердите почту</li>
                <li className='how-section__block-list-item'>Войдите в свой личный кабинет</li>
                <li className='how-section__block-list-item'>Выберите проект</li>
              </ul>
              <a
                href='#'
                className='btn main-btn how-section__block-main-btn'
                onClick={(e) => {
                  e.preventDefault();
                  showRegisterPopup();
                }}
              >
                Зарегистрироваться
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowSection;
