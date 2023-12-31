import React from "react";

const Cases = () => {
  return (
    <section
      className='cases'
      id='cases-section'
    >
      <div className='wrapper cases__wrapper'>
        <h2 className='subheading'>Наши кейсы</h2>
        <div className='case-list'>
          <div className='case'>
            <div className='case__header'>
              <h3 className='case__heading'>
                Для компании "Риан". <br /> Разработка сервиса для формирования здоровьесберегающего маршрута.
              </h3>
            </div>
            <div className='case__body'>
              <p className='case__body-text'>Задача: Компания "Риан" занимается проектировкой государственных и коммерческих офисов, центров, а также различных объектов в области образования, социально-бытовой и культурно-массовых сферах, производственных помещений. Задача - разработать сервис для формирования здоровьесберегающего маршрута.</p>
              <p className='case__body-text'>Решение: Предоставить сервис по созданию комплекса мер охраны и укрепления здоровья детей в образовательном учреждении.</p>
              <p className='case__body-text'>Результат: Разработан сервис для формирования здоровьесберегающего маршрута.</p>
            </div>
          </div>
          <div className='case'>
            <div className='case__header'>
              <h3 className='case__heading'>
                ПАО "Ростелеком". <br /> Монтаж сети для клиентов ПАО "Ростелеком"
              </h3>
            </div>
            <div className='case__body'>
              <p className='case__body-text'>Задача: Ростелеком предоставляет услуги широкополосного доступа в Интернет, интерактивного телевидения, сотовой связи, местной и дальней телефонной связи и др. Задача - монтаж сети для клиентов ПАО "Ростелеком".</p>
              <p className='case__body-text'>Решение: провести монтаж сети для клиентов ПАО "Ростелеком" на основе современных технологий и оборудования.</p>
              <p className='case__body-text'>Результат: создание надежной и функциональной сети для клиентов ПАО "Ростелеком", которая обеспечит высокую скорость передачи данных, стабильную работу и защиту от внешних угроз. Это позволит клиентам использовать интернет и другие сервисы ПАО "Ростелеком" с комфортом и безопасностью.</p>
            </div>
          </div>
          <div className='case'>
            <div className='case__header'>
              <h3 className='case__heading'>
                Компания "Лоцман". <br /> Макет для оформления офисов и витрин для компании
              </h3>
              <p className='case__subtext'>Компания "Лоцман" проводит комплексные мероприятия, производит и продает рекламную продукцию.</p>
            </div>
            <div className='case__body'>
              <p className='case__body-text'>Задача: Создать макет для оформления офисов и витрин для компании.</p>
              <p className='case__body-text'>Решение: Разработать концепцию оформления, учитывая особенности каждого офиса и витрины.</p>
              <p className='case__body-text'>Результат: Создание эстетически привлекательного и функционального оформления офисов и витрин для компании, которое соответствует ее бренду и ценностям. Это поможет привлечь новых клиентов и создать уютную атмосферу для сотрудников.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cases;
