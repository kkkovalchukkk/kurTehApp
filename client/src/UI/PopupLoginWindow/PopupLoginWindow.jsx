import React, {useState} from "react";
import {TailSpin} from "react-loader-spinner";

const PopupLoginWindow = ({loginPopupIsOpened, hideLoginPopup, setCurrentlogin, setRole, setIsAuth, setUserId}) => {
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const login = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loginInput = e.target.login;
    const passInput = e.target.pass;

    if (!loginInput.value || !passInput.value) {
      setError({text: "Вы не до конца заполнили поля", status: true});
      setIsLoading(false);
      return;
    }

    const userData = {
      login: loginInput.value,
      password: passInput.value,
    };

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          setIsLoading(false);
          setError({text: "Ошибка при входе", status: true});
          throw new Error("Не удалось выполнить вход");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("isAuth", true);
        localStorage.setItem("currentLogin", data.name);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.user._id);
        setIsAuth(true);
        setUserId(data.user._id);
        setCurrentlogin(data.name);
        setRole(data.role);
        setIsLoading(false);
        setError({});
      })
      .catch((error) => {
        setIsLoading(false);
        setError({text: "Ошибка при входе", status: true});
        loginInput.value = "";
        passInput.value = "";
      });
  };

  return (
    <div className={loginPopupIsOpened ? "popup-window popup-window--active" : "popup-window"}>
      <div className='popup'>
        <button
          className='popup__close-btn'
          onClick={hideLoginPopup}
        >
          закрыть
        </button>
        <h2 className='popup__heading'>Вход</h2>
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
            onSubmit={login}
            className='form'
            id='login-form'
          >
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
              Пароль
              <input
                type='password'
                name='pass'
                placeholder='Введите пароль'
                className='form__input'
              />
            </label>
            <button className='form__btn btn main-btn'> Войти</button>
          </form>
        )}
        {error.status && <p className='popup__error'>{error.text}</p>}
      </div>
    </div>
  );
};

export default PopupLoginWindow;
