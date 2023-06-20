import React, {useEffect, useState} from "react";
import avatar from "../../assets/icons/profile-icon.png";

const AdminPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    setIsLoading(true);
    fetch(`http://kurteh.na4u.ru/applications`)
      .then((res) => {
        if (!res.ok) {
          setIsLoading(false);
          throw new Error("Ошибка при получении заявки");
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
    getUsers();
  }, []);

  const deleteApplication = (id) => {
    setIsLoading(true);
    fetch(`http://kurteh.na4u.ru/applications/${id}`, {
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
  const deleteUser = (id) => {
    setIsLoading(true);
    fetch(`http://kurteh.na4u.ru/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          setIsLoading(false);
          throw new Error("Ошибка при удалении юзера");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        localStorage.removeItem("currentLogin");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("isAuth");
        window.location.reload();
      })
      .catch((error) => {
        setIsLoading(false);
        setError({text: "Ошибка при удалении юзера", status: true});
        console.error("Ошибка при удалении юзера", error);
      });
  };

  const getUsers = () => {
    setIsLoading(true);
    fetch(`http://kurteh.na4u.ru/users`)
      .then((res) => {
        if (!res.ok) {
          setIsLoading(false);
          throw new Error("Ошибка при получении юзеров");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setUsers(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setError({text: "Ошибка при получении юзеров", status: true});
        console.error("Ошибка при получении юзеров", error);
      });
  };

  return (
    <div className='app'>
      <header className='header'>
        <div className='wrapper header__wrapper'>
          <a
            href='/'
            className='header__logo-link'
          >
            КУРСКИЙ ТЕХНИКУМ СВЯЗИ | ПАНЕЛЬ АДМИНИСТРАТОРА
          </a>
          <button
            className='header__btn'
            onClick={() => window.location.replace("/")}
          >
            Обратно
          </button>
        </div>
      </header>
      <main className='main'>
        <section className='admin-panel'>
          <div className='wrapper admin-panel__wrapper'>
            <h2 className='subheading'>Все заявки</h2>
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
                      onClick={() => deleteApplication(card._id)}
                      className='card__btn card__btn--danger'
                    >
                      Удалить
                    </button>
                  </div>
                ))}
            </div>
            <h2 className='subheading'>Все пользователи</h2>
            <div className='users-list'>
              {users &&
                users.map((user) => (
                  <div className='user'>
                    <img
                      src={avatar}
                      alt=''
                      className='user__img'
                    />
                    <h3 className='user__heading name'>name: {user.name}</h3>
                    <h3 className='user__heading login'>login: {user.login}</h3>
                    <h3 className='user__heading email'>email: {user.email}</h3>
                    <h3 className='user__heading pass'>pass: {user.password}</h3>
                    <h3 className='user__heading role'>role: {user.role}</h3>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className='card__btn card__btn--danger'
                    >
                      Удалить
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
