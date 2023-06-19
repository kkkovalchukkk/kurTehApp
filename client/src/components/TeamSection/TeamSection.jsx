import React from "react";
import memberImg from "../../assets/img/team-member.webp";

const TeamSection = ({showRegisterPopup}) => {
  return (
    <section className='team-section'>
      <div className='wrapper team-section__wrapper'>
        <h2 className='subheading'>Наша команда</h2>
        <p className='text team-section__text'>Наша команда поможет выбрать идеальный формат сотрудничества и проведет проект от идеи до реализации.</p>
        <div className='team-section__list'>
          <div className='team-section__list-item'>
            <img
              src={memberImg}
              alt=''
              className='team-section__list-item-img'
            />
            <div className='team-section__list-item-body'>
              <h4 className='team-section__list-item-heading'>Владислав Рыжков</h4>
              <p className='team-section__list-item-who'>АДМИНИСТРАТОР</p>
              <p className='team-section__list-item-text'>Тимлид нашей платформы, реализовал 50+ проектов с компаниями-партнерами.</p>
            </div>
          </div>
          <div className='team-section__list-item'>
            <img
              src={memberImg}
              alt=''
              className='team-section__list-item-img'
            />
            <div className='team-section__list-item-body'>
              <h4 className='team-section__list-item-heading'>Владислав Рыжков</h4>
              <p className='team-section__list-item-who'>АДМИНИСТРАТОР</p>
              <p className='team-section__list-item-text'>Тимлид нашей платформы, реализовал 50+ проектов с компаниями-партнерами.</p>
            </div>
          </div>
          <div className='team-section__list-item'>
            <img
              src={memberImg}
              alt=''
              className='team-section__list-item-img'
            />
            <div className='team-section__list-item-body'>
              <h4 className='team-section__list-item-heading'>Владислав Рыжков</h4>
              <p className='team-section__list-item-who'>АДМИНИСТРАТОР</p>
              <p className='team-section__list-item-text'>Тимлид нашей платформы, реализовал 50+ проектов с компаниями-партнерами.</p>
            </div>
          </div>
          <div className='team-section__list-item'>
            <img
              src={memberImg}
              alt=''
              className='team-section__list-item-img'
            />
            <div className='team-section__list-item-body'>
              <h4 className='team-section__list-item-heading'>Владислав Рыжков</h4>
              <p className='team-section__list-item-who'>АДМИНИСТРАТОР</p>
              <p className='team-section__list-item-text'>Тимлид нашей платформы, реализовал 50+ проектов с компаниями-партнерами.</p>
            </div>
          </div>
        </div>
        <h2 className='subheading team-section__heading'>Работайте с нами!</h2>
        <a
          href='#'
          className='btn main-btn team-section__main-btn'
          onClick={showRegisterPopup}
        >
          Зарегистрироваться
        </a>
      </div>
    </section>
  );
};

export default TeamSection;
