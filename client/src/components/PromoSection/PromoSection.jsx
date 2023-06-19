import React from "react";

const PromoSection = ({showRegisterPopup}) => {
  const smoothScrollToSection = (e) => {
    e.preventDefault();
    const href = "#" + e.target.href.split("#")[1];
    document.querySelector(href).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className='promo-section'>
      <div className='wrapper promo-section__wrapper'>
        <h1 className='heading'>
          Платформа задач <br /> Курского Техникума Связи
        </h1>
        <p className='text promo-section__text'>Мы — платформа Курского техникума связи. Наши студенты под руководством наставников помогают компаниям решать задачи бизнеса, а муниципальным органам социальные проблемы.</p>
        <div className='promo-section__menu'>
          <a
            href='#'
            onClick={(e) => {
              e.preventDefault();
              showRegisterPopup();
            }}
            className='btn main-btn promo-section__main-btn'
          >
            Предложить проект
          </a>
          <a
            href='#about-section'
            onClick={(e) => smoothScrollToSection(e)}
            className='btn outline-btn promo-section__outline-btn'
          >
            О нас
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
