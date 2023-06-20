import React, {useEffect, useState} from "react";
import {TailSpin} from "react-loader-spinner";
import doc from "../../assets/docs/doc.pdf";

const ClientPage = ({currentlogin, userId, showPopup, getResponded}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/applications/${userId}`)
      .then((res) => {
        if (!res.ok) {
          setIsLoading(false);
          throw new Error("Ошибка при добавлении заявки");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError({text: "Ошибка при загрузке заявок", status: true});
        console.error("Ошибка при загрузке заявок", error);
      });
  }, []);

  const deleteApplication = (id) => {
    // setData(data.filter);
    setIsLoading(true);
    fetch(`http://localhost:3000/applications/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          setIsLoading(false);
          throw new Error("Ошибка при удалении заявки");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        setIsLoading(false);
        setError({text: "Ошибка при удалении заявки", status: true});
        console.error("Ошибка при удалении заявки", error);
      });
  };

  const sendApplication = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const headingInput = e.target.heading;
    const descrInput = e.target.description;
    const tagInput = e.target.tags;

    if (!headingInput.value || !descrInput.value || !tagInput.value) {
      setError({text: "Вы не заполнили поля", status: true});
      setIsLoading(false);
      return;
    }

    const applicationData = {
      title: headingInput.value,
      text: descrInput.value,
      createdBy: currentlogin,
      createdById: userId,
      tags: tagInput.value.trim().split(" "),
    };

    fetch("http://localhost:3000/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })
      .then((response) => {
        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Ошибка при добавлении заявки");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        e.target.reset();
        console.log(data); // Обработка успешного ответа от сервера
        window.location.reload();
      })
      .catch((error) => {
        setIsLoading(false);
        setError({text: "Ошибка при добавлении заявки", status: true});
        console.error("Ошибка при отправке заявки:", error);
      });
  };

  return (
    <>
      <h2 className='subheading'>Ваши заявки</h2>
      <div className='card-list'>
        {data &&
          data.map((card) => (
            <div
              className='card'
              key={card._id}
            >
              <h3 className='card__heading'>{card.title}</h3>
              <div className='card__tags'>
                {card.tags.map((tag) => {
                  return tag ? <span className='card__tag'>{tag}</span> : "";
                })}
              </div>
              <p className='card__descr'>{card.text}</p>
              <button
                className='card__btn'
                onClick={() => {
                  showPopup();
                  getResponded(card._id);
                }}
              >
                Подробнее
              </button>
              <button
                onClick={() => deleteApplication(card._id)}
                className='card__btn card__btn--danger'
              >
                Удалить
              </button>
            </div>
          ))}
      </div>
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
        <>
          <form
            className='card-form'
            onSubmit={sendApplication}
          >
            <h3 className='card-form__heading'>Добавить новую заявку</h3>
            <label>
              Заголовок заявки
              <input
                name='heading'
                placeholder='Введите заголовок заявки'
                type='text'
              />
            </label>
            <label>
              Краткое описание заявки
              <input
                type='text'
                name='description'
                placeholder='Введите краткое описание заявки'
              />
            </label>
            <label>
              Укажите через пробел ключевые слова к заявке
              <input
                type='text'
                name='tags'
                placeholder='Введите ключевые слова'
              />
            </label>
            <button className='card-form__btn'>Добавить заявку</button>
          </form>
          <a
            href={doc}
            className='doc-btn'
          >
            Получить договор
          </a>
        </>
      )}
      {error.status && <p className='error-text'>{error.text}</p>}
    </>
  );
};

export default ClientPage;
