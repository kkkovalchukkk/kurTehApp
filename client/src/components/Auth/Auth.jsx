import React, {useState} from "react";
import StudentPage from "../StudentPage";
import ClientPage from "../ClientPage";
import avatar from "../../assets/icons/profile-icon.png";

const Auth = ({avatar, logOut}) => {
  const currentlogin = localStorage.getItem("currentLogin");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const [responded, setResponded] = useState([]);
  const [popupIsOpened, setPopupIsOpened] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");

  const closePopupByClickOnEsc = (e) => {
    if (e.key == "Escape") {
      hidePopup();
    }
  };

  const closePopupByClickOnOverlay = (e) => {
    if (e.target.className == "popup-window popup-window--active") {
      hidePopup();
    }
  };

  const showPopup = () => {
    window.addEventListener("keydown", closePopupByClickOnEsc);
    window.addEventListener("click", closePopupByClickOnOverlay);
    setPopupIsOpened(true);
  };

  const hidePopup = () => {
    setPopupIsOpened(false);
    window.removeEventListener("keydown", closePopupByClickOnEsc);
  };

  const getResponded = (id) => {
    console.log(id);
    fetch(`http://kurteh.na4u.ru/applications/r/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Возникла ошибки при получении откликов");
        }
        return res.json();
      })
      .then((data) => {
        setResponded(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
    // setName(data.name)
    // setEmail(data.email)
    // setTel(data.tel)
  };

  return (
    <div className='app'>
      <div className={popupIsOpened ? "popup-window popup-window--active" : "popup-window"}>
        <div className='popup'>
          <button
            className='popup__close-btn'
            onClick={hidePopup}
          >
            Закрыть
          </button>
          <h3 className='popup__heading'>Отклики</h3>
          {/* <h4 className='popup__subheading'>{responded && !responded.length && "Откликов на заявку нет"}</h4> */}
          <div className='popup__response-list'>
            {responded &&
              responded.map((student) => (
                <div
                  className='popup__response'
                  key={student.studentId}
                >
                  <img
                    src={avatar}
                    alt=''
                    className='popup__response-img'
                  />
                  <h4 className='popup__response-heading'>{student.fullName}</h4>
                  <ul className='popup__list'>
                    <li className='popup__list-item'>
                      Email: <a href={`mailto:${student.email}`}>{student.email}</a>
                    </li>
                    <li className='popup__list-item'>
                      Номер телефона: <a href={`tel:+${student.phoneNumber}`}>{student.phoneNumber}</a>
                    </li>
                    <li className='popup__list-item popup__list-item--text'>{student.about}</li>
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </div>
      <header className='header'>
        <div className='wrapper header__wrapper'>
          <a
            href='/'
            className='header__logo-link'
          >
            КУРСКИЙ ТЕХНИКУМ СВЯЗИ | ЗАЯВКИ
          </a>

          <div className='header__profile'>
            <img
              src={avatar}
              alt=''
              className='header__profile-img'
            />
            <div className='header__profile-body'>
              <span className='header__profile-name'>{currentlogin}</span>
              <span className='header__profile-role'>{role}</span>
            </div>
            <button
              className='header__profile-btn'
              onClick={logOut}
            >
              Выйти
            </button>
          </div>
        </div>
      </header>
      <main className='main'>
        <section className='catalog'>
          <div className='wrapper catalog__wrapper'>
            {role === "student" ? (
              <StudentPage userId={userId} />
            ) : (
              <ClientPage
                getResponded={getResponded}
                currentlogin={currentlogin}
                userId={userId}
                showPopup={showPopup}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Auth;
