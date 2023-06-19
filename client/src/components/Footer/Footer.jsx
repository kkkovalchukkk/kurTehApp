import React from "react";
import VK from "../../UI/VK";

const Footer = () => {
  return (
    <footer
      className='footer'
      id='footer'
    >
      <div className='wrapper footer__wrapper'>
        <div className='footer__social'>
          <a
            href='https://vk.com/ktskursk'
            className='footer__social-link'
            style={{filter: "invert(1)"}}
          >
            <VK />
          </a>
        </div>
        <h2 className='footer__heading'>Контакты</h2>
        <div className='footer__group'>
          <address className='footer__address'>г. Курскул. Софьи Перовской, д.16 305001</address>
          <div className='footer__tel'>
            Телефон:
            <a
              href='tel:+74712540922'
              className='footer__tel-link'
            >
              +7 (4712) 54-09-22
            </a>
          </div>
          <div className='footer__email'>
            Email:{" "}
            <a
              href='mailto:pu4kursk@mail.ru'
              className='footer__mail-link'
            >
              pu4kursk@mail.ru
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
