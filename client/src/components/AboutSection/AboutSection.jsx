import React from "react";
import rowImg from "../../assets/img/about-img1.jpeg";

const AboutSection = () => {
  return (
    <section
      className='about-section'
      id='about-section'
    >
      <div className='wrapper about-section__wrapper'>
        <h2 className='subheading about-section__heading'>О нас</h2>
        <div className='about-section__row-list'>
          <div className='about-section__row'>
            <img
              src={rowImg}
              alt=''
              className='about-section__row-img'
            />
            <div className='about-section__row-body'>
              <h4 className='about-section__row-heading'>Платформа задач</h4>
              <p className='about-section__row-text'>Наша платформа работает с 2023 года. Мы — уникальный ресурс, который позволяет студентам обретать опыт в удобной онлайн-среде. Студенты изучают интересующие их направления профессии и развиваются в удобном темпе, подстраиваясь под свой график. Интерактивные проекты, задания и возможность общения с работодателями — все это делает нашу платформу идеальным выбором для связи специалистов и заказчиков.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
