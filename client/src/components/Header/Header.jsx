import React from "react";

const Header = ({showRegisterPopup, showLoginPopup}) => {
  const smoothScrollToSection = (e) => {
    e.preventDefault();
    const href = "#" + e.target.href.split("#")[1];
    document.querySelector(href).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header className='header'>
      <div className='wrapper header__wrapper'>
        <a
          href='/'
          className='header__logo-link'
        >
          КУРСКИЙ ТЕХНИКУМ СВЯЗИ
        </a>
        <nav className='header__nav'>
          <a
            href=''
            className='header__nav-link'
          >
            Предложить проект
          </a>
          <a
            href='#about-section'
            onClick={smoothScrollToSection}
            className='header__nav-link'
          >
            О нас
          </a>
          <a
            href='#footer'
            onClick={smoothScrollToSection}
            className='header__nav-link'
          >
            Контакты
          </a>
          <a
            href='#'
            className='header__nav-link'
            onClick={(e) => {
              e.preventDefault();
              showLoginPopup();
            }}
          >
            Вход
          </a>
          <a
            href='/'
            className='header__nav-link'
            onClick={(e) => {
              e.preventDefault();
              showRegisterPopup();
            }}
          >
            Регистрация
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
