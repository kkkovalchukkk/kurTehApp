import React, {useEffect, useState} from "react";
import {TailSpin} from "react-loader-spinner";

const StudentPage = ({userId}) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [resPopupIsOpened, setResPopupIsOpened] = useState(false);
  const [activeApplicationId, setActiveApplicationId] = useState(null);

  const showResPopup = () => {
    window.addEventListener("keydown", closePopupByClickOnEsc);
    window.addEventListener("click", closePopupByClickOnOverlay);
    setResPopupIsOpened(true);
  };

  const closePopupByClickOnEsc = (e) => {
    if (e.key == "Escape") {
      hideResPopup();
    }
  };

  const closePopupByClickOnOverlay = (e) => {
    if (e.target.className == "popup-window popup-window--active") {
      hideResPopup();
    }
  };
  const hideResPopup = () => {
    setResPopupIsOpened(false);
  };
  const respond = (data) => {
    setIsLoading(true);
    fetch(`http://kurteh.na4u.ru/applications/${activeApplicationId}/respond`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          setIsLoading(false);
          setError();
          throw new Error("Ошибка при обновлении заявки");
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        setIsLoading(false);
        setError({text: "Ошибка при обновлении заявки", status: true});
      });
  };
  useEffect(() => {
    setIsLoading(true);
    fetch("http://kurteh.na4u.ru/applications")
      .then((response) => {
        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Ошибка при получении данных");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setCards(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setError({text: "Ошибка при получении данных", status: true});
      });
  }, []);

  return (
    <>
      <div className={resPopupIsOpened ? "popup-window popup-window--active" : "popup-window"}>
        <div className='popup'>
          <button
            className='popup__close-btn'
            onClick={hideResPopup}
          >
            Закрыть
          </button>
          <h2 className='popup__heading'>Оставить отклик</h2>
          <form
            className='response-form'
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);

              const fioInput = e.target.name;
              const emailInput = e.target.email;
              const telInput = e.target.tel;
              const textInput = e.target.text;

              if ([fioInput, emailInput, telInput, textInput].some((input) => !input.value)) {
                setIsLoading(false);
                setError({text: "Вы не заполнили все поля", status: true});
                return;
              }

              const data = {
                studentId: userId,
                fullName: fioInput.value,
                email: emailInput.value,
                phoneNumber: telInput.value,
                about: textInput.value,
              };

              respond(data);
            }}
          >
            <label>
              Введите ФИО
              <input
                type='text'
                name='name'
                placeholder='ФИО'
              />
            </label>
            <label>
              Введите Email
              <input
                type='email'
                name='email'
                placeholder='Введите email'
                id=''
              />
            </label>
            <label>
              Введите номер телефона
              <input
                type='tel'
                name='tel'
                placeholder='Введите номер телефона'
                id=''
              />
            </label>
            <label>
              Напиши о себе, ваши навыки, предложите решение...
              <textarea name='text'></textarea>
            </label>
            <button className='response-form__btn'>Отправить отклик</button>
          </form>
        </div>
      </div>
      <h2 className='subheading'>Доступные заявки</h2>
      {isLoading && (
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
      )}
      <div className='card-list'>
        {cards ? (
          cards.map((card) => (
            <div
              className='card'
              key={card._id}
            >
              <h3 className='card__heading'>{card.title}</h3>
              <div className='card__tags'>
                {card.tags.map((tag) => (
                  <span className='card__tag'>{tag}</span>
                ))}
              </div>
              <p className='card__descr'>{card.text}</p>
              <button
                className='card__btn'
                onClick={
                  card.responded.find((student) => student.studentId === userId)
                    ? () => console.log("Вы уже откликнулись")
                    : () => {
                        setActiveApplicationId(card._id);
                        showResPopup();
                      }
                }
              >
                {card.responded.find((student) => student.studentId === userId) ? "Вы уже откликнулись" : "Оставить отклик"}
              </button>
            </div>
          ))
        ) : (
          <h3>Доступных заявок нет</h3>
        )}
      </div>
    </>
  );
};

export default StudentPage;
