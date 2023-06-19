import React, {useRef, useState} from "react";

import {TailSpin} from "react-loader-spinner";

const PopupRegisterWindow = ({registerPopupIsOpened, hidePopup, setIsAuth, setCurrentlogin, setRole, setUserId}) => {
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const nameInput = e.target.name;
    const loginInput = e.target.login;
    const emailInput = e.target.email;
    const passInput = e.target.pass;
    const repeatPassInput = e.target.repeatPass;
    const typeInput = Array.from(e.target.type).filter((input) => input.checked)[0];

    if (!nameInput.value || !loginInput.value || !emailInput.value || !passInput.value || !repeatPassInput.value) {
      setError({text: "Вы не до конца заполнили поля", status: true});
      setIsLoading(false);
      return;
    }

    if (passInput.value !== repeatPassInput.value) {
      setError({text: "Пароли не сходятся", status: true});
      setIsLoading(false);
      return;
    }
    setError({});

    const userData = {
      name: nameInput.value,
      email: emailInput.value,
      password: passInput.value,
      login: loginInput.value,
      role: typeInput.value,
    };

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Такой пользователь уже существует");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("currentLogin", nameInput.value);
        localStorage.setItem("role", typeInput.value);
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        setCurrentlogin(nameInput.value);
        setRole(typeInput.value);
        setIsLoading(false);
        setUserId(data.user._id);
        setError({});
      })
      .catch((error) => {
        setIsLoading(false);
        setError({text: error.message, status: true});
      });
  };

  return (
    <div className={registerPopupIsOpened ? "popup-window popup-window--active" : "popup-window"}>
      <div className='popup'>
        <button
          className='popup__close-btn'
          onClick={hidePopup}
        >
          Закрыть
        </button>
        <h2 className='popup__heading'>Регистрация</h2>
        {isLoading ? (
          <TailSpin
            height='80'
            width='80'
            color='#435deb'
            ariaLabel='tail-spin-loading'
            radius='1'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        ) : (
          <form
            className='form'
            onSubmit={register}
            id='register-form'
          >
            <label className='form__label'>
              Ваше имя
              <input
                id='name_input'
                name='name'
                type='text'
                placeholder='Введите ваше имя'
                className='form__input'
              />
            </label>
            <label className='form__label'>
              Введите логин
              <input
                id='login_input'
                type='text'
                name='login'
                placeholder='Введите ваш логин'
                className='form__input'
              />
            </label>
            <label className='form__label'>
              Email*
              <input
                name='email'
                id='email_input'
                type='text'
                placeholder='Введите ваш email'
                className='form__input'
              />
            </label>
            <label className='form__label'>
              Пароль
              <input
                name='pass'
                pattern='[A-Za-z0-9.,]+'
                type='password'
                placeholder='Введите пароль'
                className='form__input'
              />
            </label>
            <label className='form__label'>
              Подтвердите пароль
              <input
                name='repeatPass'
                pattern='[A-Za-z0-9.,]+'
                type='password'
                placeholder='Повторите пароль'
                className='form__input'
              />
            </label>
            <div className='form__radio-group'>
              <label className='form__radio-label'>
                Студент
                <input
                  type='radio'
                  name='type'
                  value={"student"}
                  className='form__radio-input'
                  checked
                />
              </label>
              <label className='form__radio-label'>
                Работодатель
                <input
                  type='radio'
                  name='type'
                  value={"client"}
                  className='form__radio-input'
                />
              </label>
            </div>
            <button className='form__btn btn main-btn'> Зарегистрироваться</button>
          </form>
        )}
        {error.status && <p className='popup__error'>{error.text}</p>}
      </div>
    </div>
  );
};

export default PopupRegisterWindow;
