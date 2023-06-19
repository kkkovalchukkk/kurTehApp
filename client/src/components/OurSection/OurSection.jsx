import React from "react";

import img1 from "../../assets/img/our-section-img1.jpeg";
import img2 from "../../assets/img/our-section-img2.jpeg";
import img3 from "../../assets/img/our-section-img3.jpeg";

const OurSection = () => {
  return (
    <section className='our-section'>
      <div className='wrapper our-section__wrapper'>
        <h2 className='subheading'>Почему именно мы</h2>
        <div className='our-section__row-list'>
          <div className='our-section__row'>
            <div className='our-section__row-body'>
              <h4 className='our-section__row-heading'>Мы работаем более чем с несколькими десятками работодателей</h4>
              <p className='our-section__row-text'>Мы предлагаем широкий выбор вакансий и возможностей для наших соискателей. Наше партнерство с таким множеством работодателей позволяет нам предоставлять разнообразные карьерные варианты в различных отраслях и сферах деятельности.</p>
            </div>
            <img
              src={img1}
              alt=''
              className='our-section__row-img'
            />
          </div>
          <div className='our-section__row'>
            <img
              src={img2}
              alt=''
              className='our-section__row-img'
            />
            <div className='our-section__row-body'>
              <h4 className='our-section__row-heading'>Мы работаем более чем с несколькими десятками работодателей</h4>
              <p className='our-section__row-text'>Мы предлагаем широкий выбор вакансий и возможностей для наших соискателей. Наше партнерство с таким множеством работодателей позволяет нам предоставлять разнообразные карьерные варианты в различных отраслях и сферах деятельности.</p>
            </div>
          </div>
          <div className='our-section__row'>
            <div className='our-section__row-body'>
              <h4 className='our-section__row-heading'>Мы работаем более чем с несколькими десятками работодателей</h4>
              <p className='our-section__row-text'>Мы предлагаем широкий выбор вакансий и возможностей для наших соискателей. Наше партнерство с таким множеством работодателей позволяет нам предоставлять разнообразные карьерные варианты в различных отраслях и сферах деятельности.</p>
            </div>
            <img
              src={img3}
              alt=''
              className='our-section__row-img'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSection;
